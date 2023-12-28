import React from 'react'
import style from "../Pages/Login.module.css";
const Login = () => {
  return (
   <div className={style.formcontainer}>
    <div className={style.formouter}>
 
     <div className={style.sideimage}>

   
     </div>
      <form className={style.sigin}>
     <div className={style.input}>
       <div className={style.emailHeader}>
         <span>*Log in using Email</span>
       </div>
       <input
         value=""
         className={style.emailInput}
         type='text'
         placeholder='Enter Email'
        //  onChange={(e) => setEmail(e.target.value)}
       />
     </div>
     <div className="otp">
       <div className={style.password}>
         <span>*Enter Password</span>
       </div>
       <input
         value=""
         className={style.passwordInput}
         type='password'
         placeholder='Enter Password'
        //  onChange={(e) => setPassword(e.target.value)}
         autoComplete='off'
       />
     </div>
     <button className={style.btnlogin}>
       Login
     </button>
     </form>

    </div> 
    </div>
  )
}

export default Login





