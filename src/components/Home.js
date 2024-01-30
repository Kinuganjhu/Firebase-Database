import React, { useState } from 'react';
import { push, ref } from 'firebase/database';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function Home() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [village, setVillage] = useState('');

  const pushData = () => {
    const userRef = ref(db, 'users');
    push(userRef, {
      name: name,
      number: number,
      village: village,
    })
      .then(() => {
        alert('Application submitted');
      })
      .catch((error) => {
        alert(error.name + ' ' + error.status);
      });
  };

  return (
    <>
      <h3>Enter your name</h3>
      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3>Enter your mobile number</h3>
      <input
        type='number'
        max={10}
        placeholder="Your Mobile Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <h3>Enter your Village</h3>
      <input
        placeholder="Your Village"
        value={village}
        onChange={(e) => setVillage(e.target.value)}
      />
      <button onClick={pushData}>Send</button>
      <Link to='/Details'>Go To Details</Link>
       <Link to='/Data'>Your Data</Link>
    </>
  );
}

export default Home;
