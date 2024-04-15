import './userInfo.css';

function UserInfo() {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src='./avatar.png' alt='ava pic' />
        <h2>Serge Ch</h2>
      </div>
      <div className='icons'>
        <img src='./more.png' alt='icon pic' />
        <img src='./video.png' alt='icon pic' />
        <img src='./edit.png' alt='icon pic' />
      </div>
    </div>
  );
}

export default UserInfo;
