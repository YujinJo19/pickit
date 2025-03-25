import React, { useEffect, useState } from 'react';
import { getHelloMessage } from './services/api';

function App() {
  const [message, setMessage] = useState<string>('');
  console.log({message})
  useEffect(() => {
      const fetchMessage = async () => {
          const data = await getHelloMessage();
          setMessage(data);
      };

      fetchMessage();
  }, []);
  return (
    <div>
        <h1>{message}</h1>
    </div>
);
}

export default App;
