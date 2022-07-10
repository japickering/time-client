import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

export default function App() {
  const [loading, setloading] = useState(true);
  const [serverTime, setServerTime] = useState('00:00:00');
  const [clientTime, setClientTime] = useState('00:00:00');
  // const [timeDifference, setTimeDifference] = useState('');

  const formatTime = (date) => {
    return moment(date).format('HH:mm:ss');
  };

  const fetchAPI = () => {
    fetch('http://localhost:4000/time')
      .then((response) => {
        return response.json;
      })
      .then((data) => {
        setloading(false);
        return data;
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  };

  // TODO: 
  useEffect(() => {
    const data = fetchAPI();
    setServerTime(formatTime(data));
    setClientTime(formatTime(Date.now()));

    setInterval(() => {
      setClientTime(formatTime(Date.now()));
    }, 1000);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Time Machine</h1>
      </header>
      <main>
        <p>{loading ? <span>loading...</span> : <></>}</p>
        <div className='split left'>
          <p>
            Server Time: <code>{serverTime}</code> (last fetched)
          </p>
          <p>
            Local Time: <code>{clientTime}</code>
          </p>
          {/* <p>
            Diff Time: <code>{timeDiff}</code>
          </p> */}
        </div>
        <div className='split metrics'>
          <h3>Metrics</h3>
        </div>
      </main>
    </div>
  );
}
