import { useUserStore } from '../../../lib/userStore';
import './userInfo.css';

function UserInfo() {
  const { currentUser } = useUserStore();
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || './avatar.png'} alt='ava pic' />
        <h2>{currentUser.username}</h2>
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
