import React,{useEffect,useState} from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { FaEye } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useSelector,useDispatch} from "react-redux";
import { deleteProduct } from "../Redux/productReducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
const Product = () => {
  const [category,categoryName] = useState();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productreducer);
  

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
                    {product?.map((u, i) => {
                      return (
                        <tr>
                          <th scope="row">{u.name}</th>
                          <td>{u.price}</td>
                          <td>{u.description}</td>
                          <td>{u.shipping}</td>
                          <td>{u.categoriesName.category}</td>
                          <td>{u.quantity}</td>
                     
                          <td>
                            <span>
                              <FaEye />
                            </span>
                            <span className="mx-2">
                              <MdEdit />
                            </span>
                            <span  onClick={()=>dispatch(deleteProduct(u))}>
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
