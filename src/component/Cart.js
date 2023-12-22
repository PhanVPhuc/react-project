import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";

function Cart() {
  // const { getCart, setCart, cart } = useContext(AppContext);
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
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
        // console.log(res.data.data);
        if (res.data.response == "success") {
          setCart(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  // console.log(getCart);
  let newData = [...getCart];
  // console.log(newData);

  function handleCart() {
    if (getCart.length > 0) {
      return getCart.map((item, key) => {
        // quằn
        if (Object.keys.length > 0) {
          function renderQty() {
            // làm trên màn hình trước , lấy id về match coi có nó trong getCart chưa
            // có rồi thì cho nó qty++ để thay đổi số hàng hoá
            // ta làm gộp làm 1 được không nhỉ  hmmm
            // const keyCart = Object.keys(cart);
            // console.log(keyCart);
            function changeQty(e) {
              const text = e.target.text;

              // console.log(text);
              const id = e.target.id;

              //  được được , đỡ tách :V
              // console.log();
              if (text == "+") {
                // console.log(id);
                if (id == getCart[key].id) {
                  // tạo 1 state mới để sao lưu dữ liệu
                  // cho dữ liệu mới đó ++ ở qty
                  // nếu ta làm thẳng vào getCart thì sẽ bị đơ web vì sử lí quá nhiều nên khi ta sao chép ra dữ liệu mới thì oke
                  // xoá ?
                  // console.log("matched");
                  return newData.map((item, key) => {
                    if (item.id == id) {
                      // ++ qty
                      newData[key].qty++;
                      // thay đổi giá trị qty trong local
                      cart[item.id] = item.qty;
                    }

                    // console.log(newData);
                    // set giá trị mới vào local
                    localStorage.setItem("cart", JSON.stringify(cart));
                    // set giá trị mới vào state
                    setCart(newData);
                  });
                } else {
                  console.log("not matched");
                  alert("wut ?");
                }
              } else if (text == "-") {
                // console.log(id);

                if (id == getCart[key].id) {
                  console.log("matched");
                  // console.log(newData);
                  // console.log(id);
                  if (getCart[key].qty == 0) {
                    // xoá key bên state trước và kiểm tra
                    delete getCart[key];
                    console.log(getCart);
                    // xoá tiếp bên localStorage để khi reload trang thì sẽ không lấy giá trị vừa xoá
                    delete cart[item.id];
                    console.log(cart);

                    // set giá trị mới vào local
                    localStorage.setItem("cart", JSON.stringify(cart));
                    // set giá trị mới vào state
                    setCart(newData);
                  } else {
                    return newData.map((item, key) => {
                      if (item.id == id) {
                        newData[key].qty -= 1;
                        cart[item.id] = item.qty;
                      }
                      // console.log(newData);
                      // set giá trị mới vào local
                      localStorage.setItem("cart", JSON.stringify(cart));
                      // set giá trị mới vào state
                      setCart(newData);
                    });
                  }
                } else {
                  console.log("not matched");
                  alert("wut ?");
                }
              }
            }
            return (
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
                  value={getCart[key].qty}
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
            );
          }

          function deleteProduct(e) {
            const id = e.target.id;
            console.log(id);
            if (id == getCart[key].id) {
              // xoá key bên state trước và kiểm tra
              delete getCart[key];
              console.log(getCart);
              // xoá tiếp bên localStorage để khi reload trang thì sẽ không lấy giá trị vừa xoá
              delete cart[item.id];
              console.log(cart);
              // set giá trị mới vào local
              localStorage.setItem("cart", JSON.stringify(cart));
              // set giá trị mới vào state
              setCart(newData);
              // reload when click page
              window.location.reload();
            }
          }

          function RenderImage() {
            const allImage = JSON.parse(item.image);
            // console.log(allImage);
            return allImage.map((item, key) => {
              if (key == 0) {
                const image =
                  "http://localhost/laravel8/laravel8/public/upload/product/" +
                  getCart[key].id_user +
                  "/" +
                  item;
                // console.log(image);
                return (
                  <img
                    src={image}
                    alt=""
                    style={{ height: "65px", width: "65px" }}
                  />
                );
              }
            });
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
                <a href="#">{RenderImage()}</a>
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
              <td className="cart_quantity">{renderQty()}</td>
              {total()}
              <td className="cart_delete">
                <a
                  className="cart_quantity_delete"
                  id={getCart[key].id}
                  onClick={deleteProduct}
                >
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
