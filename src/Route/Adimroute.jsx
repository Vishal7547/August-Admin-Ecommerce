import React from 'react';
import { useContext } from 'react';
import { userContext } from '../context/MyContext';
import {useNavigate} from "react-router-dom";
const Adimroute = ({children}) => {
const {admin} = useContext(userContext);
const navigate =useNavigate();
if(admin){
   return children; 
}else{

    window.location.href = '/'

}
}

export default Adimroute
