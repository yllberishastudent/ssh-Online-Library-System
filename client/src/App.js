import React, { useEffect, useState } from "react";
import UserLogin from "./component/user/UserLogin";
import "./component/user/UserLogin.css";


function App() {
  const [get, set] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       set(data);
  //     });
  // }, []);

  return( 
  <div>
  <UserLogin />
    {/* {(typeof get.test === 'undefined') ? (<p>Loading...</p>):(get.test.map((test,i) =>(
      <p key={i}>{test}</p>
    )))} */}
  </div>);
}

export default App;
