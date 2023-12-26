import React from "react";
import { useEffect } from "react";
import {editCategory} from "../../Redux/categoryReducer";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';


const CategoryForm = ({ handleSubmit, value, setValue,update,setUpdate}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(update){
      setValue(update.category);
    }
  },[update])
  
  const handleupdatecategory = (e)=>{
    e.preventDefault();
    try{
      const data = {category:value,id:update.id}
      dispatch(editCategory(data));
      setUpdate(null);
      setValue("");
    }catch(e){
   console.log(e);
    }

  }

  return (
    <>
      <form onSubmit={(e)=>{update?handleupdatecategory(e):handleSubmit(e)}}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {update?"Update":"Submit"}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
