import { useState } from 'react';
import './chatList.css';

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
    </div>
  );
}

export default ChatList;
