import { Route, Routes } from "react-router-dom";
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
import axios from "axios";
import { addProducts, clearProducts } from "./Components/Utils/Slices/ProductSlice";

function App() {
  const Dispatch = useDispatch();

  async function getProducts() {
    const url = "http://localhost:3000/api/v1/products/";

    try {
      const response = await axios.get(url);

      // Axios automatically parses the response, so no need to call .json()
      const products = response.data;

      console.log(products);
      Dispatch(clearProducts())
      Dispatch(addProducts(products.data));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  useEffect(async () => {
    await getProducts();
  }, []);

  return (
    <div className="overflow-x-hidden bg-Tan">
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
