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
import BGImage from "/wooden-bg.png";
import About from "./Components/pages/About/About.index";
import Fake_Error from "./Components/Genral purpose/Fake_Error";

function App() {
  const Dispatch = useDispatch();

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
    const RefreshToken = localStorage.getItem("RefreshToken");
    try {
      const response = await FetchData("user/refresh-token", "post", {
        RefreshToken,
      });

      console.log("at re-login:", response.data);

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
    ReLogin();
    getProducts();
  }, []);

  return (
    <div className="overflow-hidden w-full ">
      <Header />
      <div className="relative w-full overflow-scroll no-scrollbar">
        <img
          className="w-full h-screen fixed top-0 left-0 z-0 opacity-20"
          src={BGImage}
          alt=""
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search/:input" element={<SearchPage />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/error" element={<Fake_Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
