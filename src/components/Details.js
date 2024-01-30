import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';

const Details = () => {
  const [userData, setUserData] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedNumber, setUpdatedNumber] = useState('');
  const [updatedVillage, setUpdatedVillage] = useState('');

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

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    // Set initial values for editing
    const userToEdit = userData.find((user) => user.id === userId);
    setUpdatedName(userToEdit.name);
    setUpdatedNumber(userToEdit.number);
    setUpdatedVillage(userToEdit.village);
  };

  const handleUpdate = (userId) => {
    const userRef = ref(db, `users/${userId}`);
    set(userRef, {
      name: updatedName,
      number: updatedNumber,
      village: updatedVillage,
    })
      .then(() => {
        alert('User data updated successfully');
        setEditingUserId(null);
        setUpdatedName('');
        setUpdatedNumber('');
        setUpdatedVillage('');
      })
      .catch((error) => {
        alert('Error updating user data: ' + error.message);
      });
  };

  return (
    <>
      <h1>User Data on Details Page</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            {editingUserId === user.id ? (
              <>
                <label>
                  Name:
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </label>
                <label>
                  Mobile Number:
                  <input
                    type="text"
                    value={updatedNumber}
                    onChange={(e) => setUpdatedNumber(e.target.value)}
                  />
                </label>
                <label>
                  Village:
                  <input
                    type="text"
                    value={updatedVillage}
                    onChange={(e) => setUpdatedVillage(e.target.value)}
                  />
                </label>
                <button onClick={() => handleUpdate(user.id)}>Update</button>
              </>
            ) : (
              <>
                <strong>Name:</strong> {user.name}, <strong>Number:</strong> {user.number},{' '}
                <strong>Village:</strong> {user.village}
                <button onClick={() => handleEdit(user.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Details;
