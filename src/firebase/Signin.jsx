import React from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Signin({setLogin,setData}) {
  const handleClick = () => {
        signInWithPopup(auth, provider).then(async (result) => {
          localStorage.setItem("user", result.user.uid);
      console.log(result);
      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                setData(docSnap.data())
            setLogin(true);
      } else {
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName,
          isTeam: false,
          teamId: "",
        });
      setData({
        name: result.user.displayName,
        isTeam: false,
        teamId: "",
      });
            setLogin(true)
      }
    });
  };

  const logout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
    });
  };

  return (
    <div>
      <button onClick={handleClick}>SignIn with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Signin;
