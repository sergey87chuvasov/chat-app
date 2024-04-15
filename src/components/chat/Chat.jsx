import './chat.css';

function Chat() {
  return (
    <div className='chat'>
      <div className='top'>
        <div className='user'>
          <img src='./avatar.png' alt='ava pic' />
          <div className='texts'>
            <span>Serge Ch</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className='icons'>
          <img src='./phone.png' alt='icaon pic' />
          <img src='./video.png' alt='icaon pic' />
          <img src='./info.png' alt='icaon pic' />
        </div>
      </div>
      <div className='center'></div>
      <div className='bottom'></div>
    </div>
  );
}

export default Chat;
