import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { FaEye } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
const Product = () => {
  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-2 m-0 p-0">
            <Sidebar />
          </div>
          <div className="col-10 centerAtSmallDeviceProduct">
            <h1>Product</h1>
            <div className="row mt-3">
              <div className="atSmallHide ">
                <table className="table">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Description</th>
                      <th scope="col">Shipping</th>
                      <th scope="col">Category</th>
                      <th scope="col">Quantitiy</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4]?.map((u, i) => {
                      return (
                        <tr>
                          <th scope="row">{u.name}</th>
                          <td>{u.email}</td>
                          <td>55</td>
                          <td>3</td>
                          <td>10,000</td>
                          <td>10,000</td>
                          <td>
                            <span>
                              <FaEye />
                            </span>
                            <span className="mx-2">
                              <MdEdit />
                            </span>
                            <span>
                              <AiFillDelete />
                            </span>
                          </td>
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
    </div>
  );
};

export default Product;
