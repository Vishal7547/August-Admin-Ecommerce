import React from 'react';
import { useContext } from 'react';
import { userContext } from '../context/MyContext';
import {useNavigate} from "react-router-dom";
import Loading from '../Components/Loading';

const Adimroute = ({children}) => {
const {admin,onAuthStateChanged,authLoading} = useContext(userContext);
const navigate =useNavigate();

console.log("onAuthStateChanged",authLoading);

if(authLoading){
    return <Loading/>
}else{
    return children
}
// if(admin){
//    return children; 
// }else{
//     window.location.href = '/';
// }
}

export default Adimroute
