import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore';
import { auth, db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import './detail.css';

function Detail() {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });

      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='detail'>
      <div className='user'>
        <img src={user?.avatar || './avatar.png'} alt='avatar pic' />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className='info'>
        <div className='option'>
          <div className='title'>
            <span>Chat Settings</span>
            <img src='./arrowUp.png' alt='arrow pic' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Privacy & help</span>
            <img src='./arrowUp.png' alt='arrow pic' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared photos</span>
            <img src='./arrowDown.png' alt='arrow pic' />
          </div>
          <div className='photos'>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/1563524/pexels-photo-1563524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  alt=''
                />
                <span>photo_2024_2</span>
              </div>
              <img src='./download.png' alt='icon pic' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/1563524/pexels-photo-1563524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  alt=''
                />
                <span>photo_2024_2</span>
              </div>
              <img src='./download.png' alt='icon pic' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/1563524/pexels-photo-1563524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  alt=''
                />
                <span>photo_2024_2</span>
              </div>
              <img src='./download.png' alt='icon pic' className='icon' />
            </div>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img
                  src='https://images.pexels.com/photos/1563524/pexels-photo-1563524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  alt=''
                />
                <span>photo_2024_2</span>
              </div>
              <img src='./download.png' alt='icon pic' className='icon' />
            </div>
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <span>Shared Files</span>
            <img src='./arrowUp.png' alt='arrow pic' />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? 'You are Blocked!'
            : isReceiverBlocked
            ? 'User blocked'
            : 'Block User'}
        </button>
        <button className='logout' onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Detail;
