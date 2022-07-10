import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

export default function App() {
  const [loadingTimes, setloadingTimes] = useState(true);
  const [loadingMetrics, setloadingMetrics] = useState(true);
  const [serverTime, setServerTime] = useState('00:00:00');
  const [clientTime, setClientTime] = useState('00:00:00');
  // const [timeDiff, setTimeDiff] = useState('');

  const formatTime = (date) => {
    return moment(date).format('HH:mm:ss');
  };

  useEffect(() => {
    fetch('http://localhost:4000/time')
      .then((response) => {
        return response.json;
      })
      .then((data) => {
        setloadingTimes(false);
        setServerTime(formatTime(data));
        setClientTime(formatTime(Date.now()));

        setInterval(() => {
          setClientTime(formatTime(Date.now()));
        }, 1000);
      })
      .catch((err) => {
        setloadingTimes(false);
        console.log(err);
      });

    fetch('http://localhost:4000/metrics')
      .then((response) => {
        return response.json;
      })
      .then((data) => {
        console.log(data);
        setloadingMetrics(false);
      })
      .catch((err) => {
        setloadingMetrics(false);
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Time Machine</h1>
      </header>
      <main>
        <p>{loadingTimes ? <span>loading...</span> : <></>}</p>
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
        <div className='split metrics'>{loadingMetrics ? <h3>loading...</h3> : <h3>Metrics</h3>}</div>
      </main>
    </div>
  );
}
