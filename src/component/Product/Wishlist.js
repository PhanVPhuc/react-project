import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

function Wishlist() {
  // tương tự trang myproduct và sẽ hiển thị những item mình bỏ vào wishlist
  // hiển thị qty nhớ tạo thêm 1 phần wish list và truyền vào App ( use context ) và đẩy sang header
  // header sẽ handler 2 dữ liệu : 1 là qty cart , 2 là qty Wishlist
  // ta lấy wishlist ở trang này rồi trích xuất dữ liệu ra là đc
  //

  const { getWishlist, wishlist } = useContext(AppContext);
  const userData = JSON.parse(localStorage.getItem("Userdata"));
  const userId = userData.data.Auth.id;
  // console.log(userId);
  const accessToken = userData.data.token;

  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  // function deleteWishlist(e) {
  //   // Khi bấm vào thì lấy ID của product , sau đó ta gửi sang file DeleteWishlist
  //   // xài e.target.id để lấy id của nó
  //   const proId = e.target.id;
  //   // console.log(proId);
  //   const url =
  //     "http://localhost/laravel8/laravel8/public/api/user/product/delete/" +
  //     proId;
  //   axios.get(url, config).then((res) => {
  //     console.log(res);
  //     getWishlist(res.data.data);
  //   });
  //   // console.log(url);
  // }

  console.log(wishlist);

  function Renderwishlist() {
    if (Object.keys.length > 0) {
      // kiểm tra obj có không
      return Object.keys(wishlist).map((key, index) => {
        // render ra với mảng Object với .map((key,index) => {
        //    key = {index}
        //  } )
        function HandlePI() {
          // ..../public/upload/product/2/ + hinhanh
          // get api ve no se render ra
          const imageSrc = JSON.parse(wishlist[key].image);
          // console.log(imageSrc);

          return imageSrc.map((value, key) => {
            // lấy hình đầu tiên của mảng array
            if (key === 0) {
              const image =
                "http://localhost/laravel8/laravel8/public/upload/product/" +
                userId +
                "/" +
                value;
              // console.log(image);
              // for (let i = 0; i < value.length; i++) {
              //   console.log(value, i);
              // }
              return (
                <td className="cart_product">
                  <a href="#">
                    <img src={image} alt="" width={65} height={65} />
                  </a>
                </td>
              );
            }
          });
        }

        return (
          <tr key={index}>
            {HandlePI()}
            <td className="cart_description">
              <h4>
                <a href="#">{wishlist[key].name}</a>
              </h4>
              <p>Web ID: {wishlist[key].id}</p>
            </td>
            <td className="cart_price">
              <p>{wishlist[key].price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a className="cart_quantity_up" value="+">
                  +
                </a>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  defaultValue={1}
                  autoComplete="off"
                  size={2}
                />
                <a className="cart_quantity_down" value="-">
                  -
                </a>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">{wishlist[key].price}</p>
            </td>
            <td className="cart_delete">
              <a
                id={wishlist[key].id}
                className="cart_quantity_delete"
                // onClick={deleteWishlist}
              >
                <i className="fa fa-times" />
              </a>
            </td>
            <td>
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    to={"/account/edit-product/" + wishlist[key].id}
                    data-toggle="collapse"
                    data-parent="#accordian"
                    href="#products"
                  >
                    <span className="badge pull-right">
                      Change
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </Link>
                </h4>
              </div>
            </td>
          </tr>
        );
      });
    }
  }
  return (
    <div className="col-sm-9">
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
          <tbody> {Renderwishlist()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Wishlist;
