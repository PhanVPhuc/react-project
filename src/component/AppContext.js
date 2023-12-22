// import axios from "axios";
// import React, { createContext, useEffect, useState } from "react";

// export const AppContext = React.createContext();

// export const AppProvider = ({ children }) => {
//   const cart = JSON.parse(localStorage.getItem("cart"));
//   // console.log(cart);
//   // const [getCart, setCart] = useState([]);
//   const url = "http://localhost/laravel8/laravel8/public/api/product/cart";
//   const { getCart, setCart } = useState([]);
//   // function handleCart() {
//   // khi để function như này thì nó sẽ gọi mãi gọi liên tục => code 429
//   // nên dùng useEffect sẽ tốt hơn vì nó sẽ ngăn được việc gọi quá nhiều
//   // với [] ở cuối mảng
//   useEffect(() => {
//     axios
//       .post(url, cart)
//       .then((res) => {
//         // console.log(res.data.data);
//         if (res.data.response == "success") {
//           setCart(res.data.data);
//         }
//       })
//       .catch((error) => console.log(error));
//   }, []);
//   return (
//     <AppContext.Provider value={{ getCart }}>{children}</AppContext.Provider>
//   );
// };

import React from "react";

export const AppContext = React.createContext();
