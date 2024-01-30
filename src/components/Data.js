import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

const Data = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userRef = ref(db, 'users');

    const fetchData = () => {
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const userList = Object.keys(userData).map((userId) => ({
            id: userId,
            ...userData[userId],
          }));
          setUserData(userList);
        }
      });
    };

    fetchData();

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      // Unsubscribe from the 'onValue' listener
      // (optional but recommended to avoid memory leaks)
    };
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  return (
    <>
      <h1>USER DATA</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.name}, <strong>Number:</strong> {user.number},{' '}
            <strong>Village:</strong> {user.village}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Data;
