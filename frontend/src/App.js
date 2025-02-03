import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      {data && (
        <div>
          <p>Source: {data.source}</p>
          <p>Data: {JSON.stringify(data.data)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
