import { useState } from 'react';
import './chatList.css';
import AddUser from './addUser/addUser';

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src='/search.png' alt='search pic' />
          <input type='text' placeholder='Search' />
        </div>
        <img
          className='add'
          src={addMode ? './minus.png' : './plus.png'}
          alt='plus btn'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      <div className='item'>
        <img src='./avatar.png' alt='ava pic' />
        <div className='texts'>
          <span>Serge Ch</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.png' alt='ava pic' />
        <div className='texts'>
          <span>Serge Ch</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.png' alt='ava pic' />
        <div className='texts'>
          <span>Serge Ch</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.png' alt='ava pic' />
        <div className='texts'>
          <span>Serge Ch</span>
          <p>Hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
