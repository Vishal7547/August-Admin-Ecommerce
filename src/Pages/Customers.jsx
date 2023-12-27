import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { db } from "../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
const Customers = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setUser(data);
    });
  }, []);

  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-2 m-0 p-0">
            <Sidebar />
          </div>
          <div className="col-10">
            <h1>Customers</h1>
            <div className="row mt-3">
              <table className="table">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total Category</th>
                    <th scope="col">Total Product</th>
                    <th scope="col">Total Purchase</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((u, i) => {
                    return (
                      <tr>
                        <th scope="row">{u.name}</th>
                        <td>{u.email}</td>
                        <td>55</td>
                        <td>3</td>
                        <td>10,000</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
