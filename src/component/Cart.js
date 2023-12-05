import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);
  const [getCart, setCart] = useState([]);
  const url = "http://localhost/laravel8/laravel8/public/api/product/cart";

  // function handleCart() {
  // khi để function như này thì nó sẽ gọi mãi gọi liên tục => code 429
  // nên dùng useEffect sẽ tốt hơn vì nó sẽ ngăn được việc gọi quá nhiều
  // với [] ở cuối mảng
  useEffect(() => {
    axios
      .post(url, cart)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.response == "success") {
          setCart(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(getCart);

  function handleCart() {
    if (getCart.length > 0) {
      return getCart.map((item, key) => {
        // quằn
        if (Object.keys.length > 0) {
          function changeQty(e) {
            // làm trên màn hình trước , lấy id về match coi có nó trong getCart chưa
            // có rồi thì cho nó qty++ để thay đổi số hàng hoá
            // ta làm gộp làm 1 được không nhỉ  hmmm
            const text = e.target.text;
            console.log(text);
            //  được được , đỡ tách :V
            if (text == "+") {
              const id = e.target.id;
              // console.log(id);
              if (id == getCart[key].id) {
                console.log("matched");
                let new_qty = getCart[key].quantity + 1;
                console.log(new_qty);
              } else {
                console.log("not matched");
                alert("wut ?");
              }
            } else if (text == "-") {
              const id = e.target.id;
              // console.log(id);
              if (id == getCart[key].id) {
                // console.log("matched");
                let new_qty = parseInt(getCart[key].quantity) - 1;
                console.log(new_qty);
              } else {
                console.log("not matched");
                alert("wut ?");
              }
            }
          }
          function total() {
            // tính tiền tổng cho mọi loại hàng hoá
            let total = 0;
            const qty = getCart[key].qty;
            const price = getCart[key].price;
            total = price * qty;
            return (
              <td className="cart_total">
                <p className="cart_total_price">${total}</p>
              </td>
            );
          }
          return (
            <tr>
              <td className="cart_product">
                <a href="#">
                  <img src="images/cart/one.png" alt="" />
                </a>
              </td>
              <td className="cart_description">
                <h4>
                  <a href="#">{getCart[key].name}</a>
                </h4>
                <p>Web ID: {getCart[key].id}</p>
              </td>
              <td className="cart_price">
                <p>${getCart[key].price}</p>
              </td>
              <td className="cart_quantity">
                <div className="cart_quantity_button">
                  <a
                    className="cart_quantity_up"
                    id={getCart[key].id}
                    onClick={changeQty}
                  >
                    +
                  </a>
                  <input
                    className="cart_quantity_input"
                    type="text"
                    name="quantity"
                    defaultValue={getCart[key].qty}
                    autoComplete="off"
                    size={2}
                  />
                  <a
                    className="cart_quantity_down"
                    id={getCart[key].id}
                    onClick={changeQty}
                  >
                    -
                  </a>
                </div>
              </td>
              {total()}
              <td className="cart_delete">
                <a className="cart_quantity_delete" href="#">
                  <i className="fa fa-times" />
                </a>
              </td>
            </tr>
          );
        }
      });
    }
  }

  return (
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">Shopping Cart</li>
          </ol>
        </div>
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description" />
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td />
              </tr>
            </thead>
            <tbody>{handleCart()}</tbody>
          </table>
        </div>
      </div>
    </section>
    //#cart_items
  );
}

export default Cart;
