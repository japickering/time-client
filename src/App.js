import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

const token = 'mysecrettoken';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [serverTime, setServerTime] = useState('00:00:00');
  const [clientTime, setClientTime] = useState('00:00:00');
  //   const [timeDiff, setTimeDiff] = useState('00:00:00');
  const [metrics, setMetrics] = useState('loading');

  useEffect(() => {
    fetch('http://localhost:4000/time', { method: 'GET', authorization: token })
      .then((response) => {
        return response.json;
      })
      .then((data) => {
        setLoading(false);
        const prev = moment(data.time).format('HH:mm:ss');
        setServerTime(prev);

        setInterval(() => {
          const now = moment(Date.now()).format('HH:mm:ss');

          // BUG: diff() not working despite Stack overflow posts
          //  http://stackoverflow.com/questions/53532750/ddg#53532951
          // const result = moment(now.diff(prev)).format('HH:mm:ss');
          // setTimeDiff(result);

          setClientTime(now);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });

    fetch('http://localhost:4000/metrics', { method: 'GET', authorization: token })
      .then((response) => {
        return response.json;
      })
      .then((data) => {
        console.log('data', data);
        setMetrics(data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Time Machine</h1>
      </header>
      <main>
        {loading && <div>loading...</div>}
        <div className='split left'>
          <p>
            Server Time: <code>{serverTime}</code>
          </p>
          <p>
            Local Time: <code>{clientTime}</code>
          </p>
          {/* <p>
            Diff Time: <code>{timeDiff}</code>
          </p> */}
        </div>
        <div className='split metrics'>{metrics}</div>
      </main>
    </div>
  );
}
