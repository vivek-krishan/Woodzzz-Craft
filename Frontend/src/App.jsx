import { Route, Routes } from "react-router-dom";
import Header from "./Components/Genral purpose/Header";
import Footer from "./Components/Genral purpose/Footer";
import Home from "./Components/pages/Home/Home.index";
import AllProducts from "./Components/pages/AllProducts/AllProducts.index";
import Product from "./Components/pages/Product/Product.index";
import Cart from "./Components/pages/Cart/Cart.index";
import SearchPage from "./Components/pages/Search/Search.index";
import Authentication from "./Components/pages/Register and Login/Authentication.index";
import { useEffect } from "react";
import { addProducts } from "./Components/Utils/Slices/ProductSlice";
import { useDispatch } from "react-redux";
// import Testing from "./Components/Testing";

function App() {
  const Dispatch = useDispatch();

  async function getProducts() {
    const url = "http://localhost:3000/api/v1/products/";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products = await response.json();
      console.log(products);
      return products;
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
        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
        <Route path="/search/:input" element={<SearchPage />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
