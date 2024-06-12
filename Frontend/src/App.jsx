import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Genral purpose/Header";
import Footer from "./Components/Genral purpose/Footer";
import Home from "./Components/pages/Home/Home.index";
import AllProducts from "./Components/pages/AllProducts/AllProducts.index";
import Product from "./Components/pages/Product/Product.index";
import Cart from "./Components/pages/Cart/Cart.index";
import SearchPage from "./Components/pages/Search/Search.index";
// import Testing from "./Components/Testing";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/product/:index" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search/:input" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
