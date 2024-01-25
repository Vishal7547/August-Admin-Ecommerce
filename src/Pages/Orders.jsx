import React, { useState, useEffect } from "react";
import Sidebar from '../Components/Sidebar/Sidebar';
import { Select } from "antd";
import { useContext } from "react";
import { orderContext } from "../context/MyContext";
const { Option } = Select;
const Orders = () => {
   const {orders,handleChange} = useContext(orderContext);

    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
      ]);
      const [changeStatus, setCHangeStatus] = useState("");

  return (
    <div>
            <div className="container-fluid ">
        <div className="row">
          <div className="col-2 m-0 p-0">
            <Sidebar />
          </div>
          <div className="col-md-10">
          <h1 className="text-center">All Orders</h1>
      
          {orders?.map((o, i) => {
            return (
              <div className="border shadow mt-5 " key={o.orderId}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o?.orderId, value)}
                          defaultValue={o?.orderStatus}
                        >
                          {status.map((s, i) => (
                            <Option  key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.defaultAdress?.Fullname}</td>
                      <td>{o?.orderCreatedAt}</td>
                      <td>Success</td>
                      <td>{o?.order?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.order?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p.id}>
                      <div className="col-md-4">
                        <img
                          src={p.photo.url}
                          className="card-img-top"
                          alt={p.name}
                          width="120px"
                          height="auto"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
