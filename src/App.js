import logo from "./logo.svg";
import "./App.css";
import SignUp from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./containers/Dashboard.js/Dashboard";
import { AddProduct } from "./containers/Product/AddProduct";
import { RequireAuth } from "./utils/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        {/* <Route exact path="/products" element={<Products />} /> */}
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route path="/product/:productId" element={<AddProduct />} />
        <Route element={<RequireAuth />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
