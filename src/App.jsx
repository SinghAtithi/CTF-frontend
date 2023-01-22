import React, { useState } from "react";
import Signin from "./firebase/Signin";
import { auth, provider } from "./firebase/config";
import Team from "./firebase/Team";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({})
  
    const logout = () => {
      auth.signOut().then(() => {
        localStorage.removeItem("user");
      });
      setLogin(false)
    };
  return (
    <div>
      {login ? (
        <div>
          {console.log(data)}
          <Team data={ data} />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Signin setLogin={setLogin} setData={setData} />
      )}
    </div>
  );
}

export default App;
