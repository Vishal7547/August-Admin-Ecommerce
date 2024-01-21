import {userContext} from "./MyContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { useEffect, useState } from "react";
export const UserProvider = ({children})=>{
    const name = "mansi";
  const [admin,setAdmin] = useState(window.localStorage.getItem("admin")?JSON.parse(window.localStorage.getItem("admin")):null);
  const [authLoading,setauthLoading] = useState(false);
  
  useEffect(()=>{
    setauthLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setauthLoading(false);
        const uid = user.uid;
    
        window.localStorage.setItem("admin",JSON.stringify(user));
        setAdmin(user);
      } 
    })
  },[])

return (
    <userContext.Provider value={{name,admin,onAuthStateChanged,authLoading}}>
        {children}
    </userContext.Provider>
)
}

