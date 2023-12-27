import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-2 m-0 p-0">
            <Sidebar />
          </div>
          <div className="col-10">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
