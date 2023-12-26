import Dashboard from "./Pages/Dashboard";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Categories from "./Pages/Categories";
import CreateProduct from "./Pages/CreateProduct";
import Customers from "./Pages/Customers";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/createproduct" element={<CreateProduct/>}/>
      <Route path="/customers" element={<Customers/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;


