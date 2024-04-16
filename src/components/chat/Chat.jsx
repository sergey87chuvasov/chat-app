import { useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleEmoji = (e) => {
    // console.log(e);
    setText((prev) => prev + e.emoji);
    setOpen(false);
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
        </div>
        <div className='message own'>
          <div className='texts'>
            <img
              src='https://images.pexels.com/photos/1427581/pexels-photo-1427581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='img pic'
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              qui.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <button className='sendButton'>Send</button>
      </div>
    </div>
  );
}

export default Chat;
