import { orderContext } from "./MyContext";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot,doc, updateDoc } from "firebase/firestore"; 

export const OrderProvider = ({children})=>{

    const [orders, setOrders] = useState([]);

    const handleChange=async(id,v)=>{

        const washingtonRef = doc(db, "orders", id );
        await updateDoc(washingtonRef, {
            orderStatus:v
        });
    }

  useEffect(()=>{
   const fetchOrder=()=>{

    const querySnapshot = onSnapshot(collection(db, "orders"),(snap)=>{
           
    const data = snap.docs?.map((doc) => {
       return {
         ...doc.data(),
         orderId:doc.id,

       }
    });
    console.log(data);

    setOrders(data);
    });


   }
   fetchOrder();
  },[])

return (

    <orderContext.Provider value={{orders,handleChange}}>
        {children}
    </orderContext.Provider>
)
}

