import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from './addUser/addUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userchats', currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promisses = items.map(async (item) => {
          const userDocRef = doc(db, 'users', item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promisses);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  // console.log(chats);

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
      {chats.map((chat) => (
        <div className='item' key={chat.chatId}>
          <img src='./avatar.png' alt='ava pic' />
          <div className='texts'>
            <span>Serge Ch</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {/* <div className='item'>
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
      </div> */}
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
