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

function Chat() {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

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

  const handleSend = async () => {
    if (text === '') return;

    try {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
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
          <div className='message own' key={message?.createAt}>
            <div className='texts'>
              {message.img && <img src={message.img} alt='img pic' />}
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className='bottom'>
        <div className='icons'>
          <img src='./img.png' alt='icons pic' />
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
