import Dashboard from "./Pages/Dashboard";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Categories from "./Pages/Categories";
import CreateProduct from "./Pages/CreateProduct";
import Customers from "./Pages/Customers";
import Product from "./Pages/Product";
import { fetchCategory } from "./Redux/categoryReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
 const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCategory());
  },[dispatch])
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/createproduct" element={<CreateProduct/>}/>
      <Route path="/customers" element={<Customers/>}/>
      <Route path="/product" element={<Product/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;


