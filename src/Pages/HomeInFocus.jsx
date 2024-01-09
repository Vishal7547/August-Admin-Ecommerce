import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import HomeMenu from "../Components/Home/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Select } from "antd";
import {fetchHomeCollection,addInFocusImage,deletehomeInFocusImage,addInFocusVideo,deletehomeInFocusVideo} from "../Redux/homeReducer";
const { Option } = Select;
const HomeInFocus = () => {
    const dispatch = useDispatch();
    const [categoriesName, setCategoriesName] = useState({});
    const [CategoryVideo,setCategoryVideo] = useState("");
    const [photo, setPhoto] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [Video, setVideo] = useState("");
    const [VideoPreview, setVideoPreview] = useState("");
    const { category } = useSelector((state) => state.categoryreducer);
    const {everyMoodLoading, home, error,everyMoodDeleteLoading,inFocusLoader,inFocusVideoLoader} = useSelector(
      (state) => state.homereducer
    );
    useEffect(() => {
      dispatch(fetchHomeCollection());
    }, [dispatch]);
    console.log("{}{}", home);

    // function for creating category
    const handleCreate = () => {
        if(photo === ""){
            console.log("plz upload a photo");
            return;
          }
          dispatch(deletehomeInFocusImage(home.inFocusPhoto.imgId));
      const categoryHome = {
        ...categoriesName,
        photo,
      };
      console.log("c",categoryHome);
      dispatch(addInFocusImage(categoryHome));
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
  // function for uploading the video
  const handleVideo = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

const handleVideoUpload =()=>{
   if(Video === ""){
     console.log("plz upload a video");
     return;
   }
   dispatch(deletehomeInFocusVideo(home.inFocusVideo.imgId));
    const categoryHome = {
        ...CategoryVideo,
        Video,
      };
      dispatch(addInFocusVideo(categoryHome));
      setCategoryVideo("");
      setVideo("");
      setVideoPreview("");
}

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
                <h1>Upload pictures/video for Focus video</h1>
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
                      disabled={inFocusLoader}
                      className="btn btn-primary"
                      onClick={handleCreate}
                    >
                      {inFocusLoader ? "Loading..." : "Upload Image"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-5 px-5">
                <div className="row mt-2 w-75">
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategoryVideo(JSON.parse(value));
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
                      {Video ? Video.name : "Upload Video"}
                      <input
                        type="file"
                        name="video"
                        accept="video/*"
                        onChange={handleVideo}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {Video && (
                      <div className="text-center">
                        <video
                          src={VideoPreview}
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <button
                      disabled={inFocusVideoLoader}
                      className="btn btn-primary"
                      onClick={handleVideoUpload}
                    >
                      {inFocusVideoLoader ? "Loading..." : "Upload Video"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-4 mb-5">
                <div className="col-md-6">
                  <img height={500} width={500} src={home?.inFocusPhoto?.url} alt={home?.inFocusPhoto?.category} />
                  <p>{home?.inFocusPhoto?.category}</p>
                </div>
                <div className="col-md-6">
                 <video height={500} width={500} src={home?.inFocusVideo?.url}></video>
                 <p>{home?.inFocusVideo?.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeInFocus
