import {userContext} from "./MyContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { useState } from "react";
export const UserProvider = ({children})=>{
    const name = "mansi";
  const [admin,setAdmin] = useState(window.localStorage.getItem("admin")?JSON.parse(window.localStorage.getItem("admin")):null);
  
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    window.localStorage.setItem("admin",JSON.stringify(user));
    setAdmin(user);
  } else {

}
});
return (
    <userContext.Provider value={{name,admin}}>
        {children}
    </userContext.Provider>
)
}

