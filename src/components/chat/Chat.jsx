import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';

function Chat() {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState({
    file: null,
    url: '',
  });

  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // console.log(chat);

  const handleEmoji = (e) => {
    // console.log(e);
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === '') return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, 'userchats', id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    setImg({
      file: null,
      url: '',
    });

    setText('');
  };

  // console.log(text);
  return (
    <div className='chat'>
      <div className='top'>
        <div className='user'>
          <img src='./avatar.png' alt='ava pic' />
          <div className='texts'>
            <span>Anna Ch</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className='icons'>
          <img src='./phone.png' alt='icaon pic' />
          <img src='./video.png' alt='icaon pic' />
          <img src='./info.png' alt='icaon pic' />
        </div>
      </div>
      <div className='center'>
        {/* <div className='message'>
          <img src='./avatar.png' alt='ava pic' />
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              qui.
            </p>
            <span>1 min ago</span>
          </div>
        </div> */}
        {/* <div className='message own'>
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              qui.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <img src='./avatar.png' alt='ava pic' />
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              qui.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              qui.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <img src='./avatar.png' alt='ava pic' />
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              qui.
            </p>
            <span>1 min ago</span>
          </div>
        </div> */}
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? 'message own' : 'message'
            }
            key={message?.createAt}
          >
            <div className='texts'>
              {message.img && <img src={message.img} alt='img pic' />}
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}

        {img.url && (
          <div className='message own '>
            <div className='rexts'>
              <img src={img.url} alt='img pic' />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>
      <div className='bottom'>
        <div className='icons'>
          <label htmlFor='file'>
            <img src='./img.png' alt='icon pic' />
          </label>
          <input
            type='file'
            id='file'
            style={{ display: 'none' }}
            onChange={handleImg}
          />
          <img src='./camera.png' alt='icons pic' />
          <img src='./mic.png' alt='icons pic' />
        </div>
        <input
          type='text'
          placeholder='Type a message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className='emoji'>
          <img
            src='./emoji.png'
            alt='emojies pic'
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className='picker'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='sendButton' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
