import React from "react";
import style from "../Pages/Login.module.css";
import { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Email and password should be filled");
      return;
    }

    setLoader(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.email === "admin@gmail.com") {
          if (password === "123456") {
            setLoader(false);
            navigate("/dashboard");
          } else {
            setLoader(false);
            navigate("/");
          }
        } else {
          setLoader(false);
          navigate("/");
        }
        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setLoader(false);
      });
  };
  return (
    <div className={style.formcontainer}>
      <div className={style.formouter}>
        <div className={style.sideimage}></div>
        <form className={style.sigin} onSubmit={handleSubmit}>
          <div className={style.input}>
            <div className={style.emailHeader}>
              <span>*Log in using Email</span>
            </div>
            <input
              value={email}
              className={style.emailInput}
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="otp">
            <div className={style.password}>
              <span>*Enter Password</span>
            </div>
            <input
              value={password}
              className={style.passwordInput}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button className={style.btnlogin} disabled={loader}>
            {loader ? "loading..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
