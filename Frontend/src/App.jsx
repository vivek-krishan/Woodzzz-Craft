import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Components/Genral purpose/Header";
import Footer from "./Components/Genral purpose/Footer";
import Home from "./Components/pages/Home/Home.index";
import AllProducts from "./Components/pages/AllProducts/AllProducts.index";
import Product from "./Components/pages/Product/Product.index";
import Cart from "./Components/pages/Cart/Cart.index";
import SearchPage from "./Components/pages/Search/Search.index";
import Authentication from "./Components/pages/Register and Login/Authentication.index";
import AdminLayout from "./Components/pages/Admin/AdminLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addProducts,
  clearProducts,
} from "./Components/Utils/Slices/ProductSlice";
import { addUser, clearUser } from "./Components/Utils/Slices/UserInfoSlice";
import { FetchData } from "./Components/Utils/fetchFromAPI";

function App() {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  async function getProducts() {
    try {
      const response = await FetchData("products/", "get");

      // Axios automatically parses the response, so no need to call .json()
      const products = response.data;

      Dispatch(clearProducts());
      Dispatch(addProducts(products.data));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  const ReLogin = async () => {
    try {
      const response = await FetchData("user/refresh-token", "get");

      // Storing the tokens into browser's local storage
      localStorage.setItem("AccessToken", response.data.data.AccessToken);
      localStorage.setItem("RefreshToken", response.data.data.RefreshToken);

      // Storing data inside redux store
      Dispatch(clearUser());
      Dispatch(addUser(response.data.data.User));

      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
    ReLogin();
  }, []);

  return (
    <div className="overflow-hidden w-full bg-Tan">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/product/:index" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search/:input" element={<SearchPage />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
