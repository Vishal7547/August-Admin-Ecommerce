import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import HomeMenu from "../Components/Home/HomeMenu";
import { useState } from "react";
import { addhero,addherovideo} from "../Redux/homeReducer";
import { useDispatch,useSelector } from "react-redux";

const Home = () => {
    const [photo, setPhoto] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [Video, setVideo] = useState("");
    const [VideoPreview, setVideoPreview] = useState("");
    const dispatch = useDispatch();
    const {home,loading,error} = useSelector((state)=>state.homereducer);
console.log("home data",home);
      // function for adding content to the home page
  const handleCreate = () => {
    const home = {
      photo,
    };
    dispatch(addhero(home));
    setPhoto("");
    setImagePreview("");
  };
    
      // function for adding content to the home page
      const handleHeroVideo = () => {
        const home = {
          Video,
        };
        dispatch(addherovideo(home));
        setVideo("");
        setVideoPreview("");
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
    // if (file) {
    //   if (file.size > 1024 * 1024 * 2) {
    //     alert("plz chose a video less than 2mb");
    //     return;
    //   } else {
    //     setPhoto(file);
    //     setImagePreview(URL.createObjectURL(file));
    //   }
    // }
    console.log("file",file);
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
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
                <div className="row mt-5 px-5 ">
                <div className="row">
                <div className="row">
                    <div className="col-md-6">
                      <div className="row img-upload">
                        <div className="mb-3">
                          <label className="btn btn-outline-secondary col-md-12">
                            {photo ?  photo.name  : "Upload Photo"}
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
                      </div>
                    </div>
                    <div className="col-md-6">
                      <button className="btn btn-primary" onClick={handleCreate} disabled={loading}>{loading?"uploading":"Submit"}</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row vid-upload">
                        <div className="mb-3">
                          <label className="btn btn-outline-secondary col-md-12">
                            {Video? Video.name : "Upload Video"}
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
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                      type="video/mp4"
                    />
                  </div>
                )}
              </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <button className="btn btn-primary" onClick={handleHeroVideo} disabled={loading}>{loading?"Uploading":"Submit"}</button>
                    </div>
                  </div>

                </div>
                 {Object.keys(home).length && <div className="row">
                    <div className="col-md-6">
                        <img alt="homevideo" height={200} width={200} src={home?.photo?.url}/>
                        <div className="row"><button className="btn btn-danger mt-3 w-75">Delete</button></div>
                    </div>
                    <div className="col-md-6">
                    <video  height={200} width={200} src={home?.video?.url}/>
                        <div className="row"><button className="btn btn-danger mt-2 w-75">Delete</button></div>
                    </div>
                  </div>} 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
