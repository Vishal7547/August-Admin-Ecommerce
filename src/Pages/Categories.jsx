import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import CategoryForm from "../Components/Form/CategoryForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory } from "../Redux/categoryReducer";
import toast from "react-hot-toast";
const Categories = () => {
  const [name, setName] = useState("");
  const [update, setUpdate] = useState(null);
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categoryreducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(addCategory(name));
      toast("created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setName("");
    } catch (e) {
      toast.error("something went wrong");
    }
  };

  const handleUpdate = (c) => {
    setUpdate(c);
  };

  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-2 m-0 p-0">
            <Sidebar />
          </div>
          <div className="col-10 centerAtSmallDevice">
            <h1>Manage Category</h1>
            <div className="p-3 w-50 atSmallW100">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                setUpdate={setUpdate}
                update={update}
              />
            </div>
            <div className="w-75 atSmallW100">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((category) => (
                    <>
                      <tr>
                        <td key={category.id}>{category.category}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              handleUpdate(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              try {
                                dispatch(deleteCategory(category.id));
                                toast("deleted successfully!", {
                                  style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                  },
                                });
                              } catch (e) {
                                toast.error("something went wrong");
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
