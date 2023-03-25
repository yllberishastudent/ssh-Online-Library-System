import React, { useEffect, useState } from "react";

function App() {
  const [get, set] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        set(data);
      });
  }, []);

  return( <div>

    {(typeof get.test === 'undefined') ? (<p>Loading...</p>):(get.test.map((test,i) =>(
      <p key={i}>{test}</p>
    )))}
  </div>);
}

export default App;
