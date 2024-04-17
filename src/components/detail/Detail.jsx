import './detail.css';

function Detail() {
  return (
    <div className='detail'>
      <div className='user'>
        <img src='./avatar.png' alt='avatar pic' />
        <h2>Anna Ch</h2>
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
        <button>Block User</button>
        <button className='logout'>Logout</button>
      </div>
    </div>
  );
}

export default Detail;
