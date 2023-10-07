import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Content from "./component/MainContent";
import Checkout from "./component/Checkout";
import Cart from "./component/Cart";
import Login from "./component/Login";
import Blog from "./component/Blog";
import Error404 from "./component/404";
import ContactUs from "./component/Contact-us";
import MyProduct from "./component/Myproduct";
import ProductDetail from "./component/Productfetail";
import BlogDetail from "./component/Blog/BDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route exact path="/" element={<Content />} />
          <Route path="/check-out" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog-single" element={<BlogDetail />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/shop" element={<MyProduct />} />
          <Route path="/product-details" element={<ProductDetail />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
