import React from 'react'
import style from "./Sidebar.module.css";
import {PiShoppingCartLight} from "react-icons/pi";
import {RxDashboard} from "react-icons/rx";
import {GiTwirlyFlower} from "react-icons/gi";
import {BsFillPeopleFill} from "react-icons/bs";
import {CiShoppingCart} from "react-icons/ci";
import {SlSettings} from "react-icons/sl";
import {RiFocus2Line} from "react-icons/ri";
import {IoIosLogOut} from "react-icons/io";
import {useNavigate} from 'react-router-dom';



const Sidebar = () => {
  const navigate =useNavigate();
  return (
    <div className={style.sidebarcontainer}>
        <div className={style.top}>
        <div className={style.icon}>
        <PiShoppingCartLight fontSize={30} color="#e0e0e0"/>
        </div>
        <div className={style.title}>
         <span className={style.logo}>August</span><br/>
        </div>
        </div>
        
        <div className={style.optiondashboard}>
            <div className={style.optionicon}>
            <RxDashboard fontSize={20}/>
            </div>
         
            <span className={style.optiontext} onClick={()=>navigate("/")}>Dashboard</span>

        </div>

        <div  className={style.optiondashboard}>
        <div className={style.optionicon}>
        <GiTwirlyFlower fontSize={20}/>
        </div>
        <span className={style.optiontext}  onClick={()=>navigate("/categories")}>Categories</span>
        </div>

        <div className={style.optiondashboard}>
            <div className={style.optionicon}>
            <RxDashboard fontSize={20}/>
            </div>
            <span className={style.optiontext} onClick={()=>navigate("/createproduct")}>CreateProduct</span>
        </div>

        <div className={style.optiondashboard}>
            <div className={style.optionicon}>
            <RxDashboard fontSize={20}/>
            </div>
            <span className={style.optiontext} onClick={()=>navigate("/product")}>Product</span>
        </div>

        <div className={style.optiondashboard}>
            <div className={style.optionicon}>
            <BsFillPeopleFill  fontSize={20}/>
            </div>
            <span className={style.optiontext} onClick={()=>navigate("/customers")}>Customers</span>
        </div>

        <div className={style.optiondashboard}>
        <div className={style.optionicon}>
            <CiShoppingCart fontSize={20}/>
            </div>
            <span className={style.optiontext}>Orders</span>
        </div>

        <div className={style.optiondashboard}>
        <div className={style.optionicon}>
            <SlSettings fontSize={20}/>
            </div>
            <span className={style.optiontext}>Settings</span>
        </div>

        <div className={style.optiondashboard}>
        <div className={style.optionicon}>
            <RiFocus2Line fontSize={20}/>
            </div>
            <span className={style.optiontext}>Online Store</span>
        </div>

      <div className={style.logout}>
      <div className={style.optionicon}>
       <IoIosLogOut fontSize={20}/>
      </div>
        <span className={style.logouttext}>Logout</span>
      </div>


    </div>

  )
}

export default Sidebar
