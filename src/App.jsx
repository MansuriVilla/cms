import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/products";
import productPage from "./components/productPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<productPage />} />
      </Routes>
    </Router>
  );
};

export default App;
