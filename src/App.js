import { useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import AccountMenuLeft from "./component/Account/Account-menuleft";
import { AppContext, AppProvider } from "./component/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App(props) {
  let param1 = useLocation();

  function renderMenuLeft() {
    if (param1["pathname"].includes("account")) {
      return <AccountMenuLeft />;
    } else if (param1["pathname"].includes("cart")) {
      return null;
    } else {
      return <Sidebar />;
    }
  }

  const cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);
  const [getCart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const url = "http://localhost/laravel8/laravel8/public/api/product/cart";
  // const data = { name: "Phuc", age: 22 };
  // const [getCart, setCart] = useState(123);

  function getQty(data) {
    // console.log(data);
    // setCart(data);
    setTotal(data);
    console.log(total);
  }

  // khi để function như này thì nó sẽ gọi mãi gọi liên tục => code 429
  // nên dùng useEffect sẽ tốt hơn vì nó sẽ ngăn được việc gọi quá nhiều
  // với [] ở cuối mảng
  useEffect(() => {
    axios
      .post(url, cart)
      .then((res) => {
        // console.log(res.data.data);
        if (res.data.response == "success") {
          setCart(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const [wishlist, setWishlist] = useState([]);
  const userData = JSON.parse(localStorage.getItem("Userdata"));
  const userId = userData.data.Auth.id;
  // console.log(userId);
  const accessToken = userData.data.token;
  // console.log(accessToken);
  // prettier-ignore
  let config = {
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
  };
  const url2 = "http://localhost/laravel8/laravel8/public/api/product/wishlist";
  useEffect(() => {
    axios
      .get(url2, config)
      .then((res) => {
        if (res) {
          setWishlist(res.data.data);
        } else {
          alert("error");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  // console.log(Product);
  function getWishlist(dataWL) {
    console.log(dataWL);
  }

  // console.log(getCart);
  return (
    <div>
      <AppContext.Provider
        value={{
          total: total,
          getQty: getQty,
          getCart: getCart,
          wishlist,
          getWishlist,
        }}
      >
        <Header />
        <section>
          <div className="container">
            <div className="row">
              {/* <Sidebar /> */}
              {renderMenuLeft()}
              {/* {param1["pathname"].includes("account") ? (
              <AccountMenuLeft />
            ) : (
              <Sidebar />
            )} */}

              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
