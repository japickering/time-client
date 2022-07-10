import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

export default function App() {
  const [serverTime, setServerTime] = useState('HH:mm:ss');

  const formatTime = (date) => {
    return moment(date).format('HH:mm:ss');
  };

  useEffect(() => {
    const data = fetchServerTime();
    console.log(formatTime(data));
    setServerTime(formatTime(data));
  }, []);

  const fetchServerTime = async () => {
    fetch('http://localhost:4000/time/')
      .then((response) => {
        return response.json;
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>
      <header className='App-header'>Server Time (HH:mm:ss): {serverTime}</header>
    </div>
  );
}
