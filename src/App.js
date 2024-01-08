import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories";
import CreateProduct from "./Pages/CreateProduct";
import Customers from "./Pages/Customers";
import Product from "./Pages/Product";
import { fetchCategory } from "./Redux/categoryReducer";
import { fetchProduct } from "./Redux/productReducer";
import { useDispatch } from "react-redux";
import { useEffect, useContext } from "react";
import { userContext } from "./context/MyContext";
import Adimroute from "./Route/Adimroute";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import HomeCategory from "./Pages/HomeCategory";
import HomeBanner from "./Pages/HomeBanner";
import HomeEveryMood from "./Pages/HomeEveryMood";
import HomeInFocus from "./Pages/HomeInFocus";

function App() {
  const name = useContext(userContext);
  console.log("name", name);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Adimroute>
                <Dashboard />
              </Adimroute>
            }
          />
          <Route
            path="/categories"
            element={
              <Adimroute>
                <Categories />
              </Adimroute>
            }
          />
          <Route
            path="/createproduct"
            element={
              <Adimroute>
                <CreateProduct />
              </Adimroute>
            }
          />
          <Route
            path="/customers"
            element={
              <Adimroute>
                <Customers />
              </Adimroute>
            }
          />
          <Route
            path="/product"
            element={
              <Adimroute>
                <Product />
              </Adimroute>
            }
          />
          <Route
            path="/home"
            element={
              <Adimroute>
                <Home />
              </Adimroute>
            }
          />
          <Route
            path="/home-category"
            element={
              <Adimroute>
                <HomeCategory />
              </Adimroute>
            }
          />
          <Route
            path="/home-banner"
            element={
              <Adimroute>
                <HomeBanner />
              </Adimroute>
            }
          />
                    <Route
            path="/home-your-every-mood"
            element={
              <Adimroute>
                <HomeEveryMood/>
              </Adimroute>
            }
          />
                              <Route
            path="/home-banner"
            element={
              <Adimroute>
                <HomeBanner/>
              </Adimroute>
            }
          />

<Route
            path="/in-focus"
            element={
              <Adimroute>
                <HomeInFocus/>
              </Adimroute>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
