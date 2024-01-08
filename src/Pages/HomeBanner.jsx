import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import HomeMenu from "../Components/Home/HomeMenu";
import { useState, useEffect } from "react";
import { addBanner, fetchHomeCollection } from "../Redux/homeReducer";
import { useDispatch, useSelector } from "react-redux";

const HomeBanner = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { home, bannerLoading, error } = useSelector(
    (state) => state.homereducer
  );
  console.log("home banner", home);

  useEffect(() => {
    dispatch(fetchHomeCollection());
  }, [dispatch]);
  // function for adding content to the home page
  const handleCreate = () => {
    if (name === "") {
      console.log("please write banner name");
      return;
    }
    dispatch(addBanner(name));
    setName("");
  };
  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-1 m-0 p-0">
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
                      <h6>ADD BANNER</h6>
                      <div className="col-md-6">
                        <div className="row img-upload">
                          <div className="mb-3">
                            <input
                              type="text"
                              value={name}
                              placeholder="Banner name.."
                              className="form-control"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <button
                          className="btn btn-primary"
                          onClick={handleCreate}
                          disabled={bannerLoading}
                        >
                          {bannerLoading ? "uploading" : "Submit"}
                        </button>
                      </div>
                    </div>
                    <div className="row banner">
                      <h1>{home.bannerName}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;