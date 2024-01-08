import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import HomeMenu from "../Components/Home/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Select } from "antd";
import { addHeroCategory, fetchHomeCollection,deleteHomeCategory} from "../Redux/homeReducer";
const { Option } = Select;
const HomeCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [categoriesName, setCategoriesName] = useState({});
  const [photo, setPhoto] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { category } = useSelector((state) => state.categoryreducer);
  const { categoryLoading, home, error } = useSelector(
    (state) => state.homereducer
  );
  useEffect(() => {
    dispatch(fetchHomeCollection());
  }, [dispatch]);
  console.log("{}{}", home);
  // function for creating category
  const handleCreate = () => {
    const categoryHome = {
      categoriesName,
      photo,
    };
    dispatch(addHeroCategory(categoryHome));
    setCategoriesName("");
    setPhoto("");
    setImagePreview("");
  };
  //  function for setting the photo
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        alert("plz chose a photo less than 2mb");
        return;
      } else {
        setPhoto(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };
  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-1 m-0 p-0">
            <Sidebar />
          </div>
          <div className="col-11">
            <div className="row">
              <div className="col-md-3">
                <HomeMenu />
              </div>
              <div className="col-md-9 mt-5">

                <div className="row mt-5 px-5">
                  <h1>Upload category images for home Section</h1>
                  <div className="row mt-2 w-75">
                    <Select
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setCategoriesName(JSON.parse(value));
                      }}
                    >
                      {category?.map((c) => (
                        <Option key={c.id} value={JSON.stringify(c)}>
                          {c.category}
                        </Option>
                      ))}
                    </Select>
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={handlePhoto}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo && (
                        <div className="text-center">
                          <img
                            src={imagePreview}
                            alt="product_photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <button
                        disabled={categoryLoading}
                        className="btn btn-primary"
                        onClick={handleCreate}
                      >
                        {categoryLoading ? "Loading..." : "Create Category"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row category-show">
                  {
                    home?.categories?.map((c)=>(
                      <div className="col-md-4 text-center mt-2 " key={c.id}>
                      <div className="row">
                        <img src={c.url}/>
                      </div>
                      <div className="row">
                        <h3>{c.category}</h3>
                      </div>
                      <div className="row mx-2">
                        <button className="btn btn-danger" onClick={()=>dispatch(deleteHomeCategory(c))}>Delete</button>
                      </div>
                    </div>
                    ))
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
