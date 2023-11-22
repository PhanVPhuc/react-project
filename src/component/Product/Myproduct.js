import axios from "axios";
import { useEffect, useState } from "react";

function MyProduct() {
  const [Product, getProduct] = useState([]);
  const userData = JSON.parse(localStorage.getItem("Userdata"));
  const userId = userData.data.Auth.id;
  console.log(userId);
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
  const url = "http://localhost/laravel8/laravel8/public/api/user/my-product";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        if (res) {
          getProduct(res.data.data);
        } else {
          alert("error");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  // console.log(Product);

  function Renderproduct() {
    if (Object.keys.length > 0) {
      // kiểm tra obj có không
      return Object.keys(Product).map((key, index) => {
        // render ra với mảng Object với .map((key,index) => {
        //    key = {index}
        //  } )
        function HandlePI() {
          // ..../public/upload/product/2/ + hinhanh
          // get api ve no se render ra
          const imageSrc = JSON.parse(Product[key].image);
          // console.log(imageSrc);

          return imageSrc.map((value, key) => {
            if (key === 0) {
              const image =
                "http://localhost/laravel8/laravel8/public/upload/product/" +
                userId +
                "/" +
                value;
              console.log(image);
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

        // lấy hình đầu tiên của mảng array
        return (
          <tr key={index}>
            {HandlePI()}
            <td className="cart_description">
              <h4>
                <a href="#">{Product[key].name}</a>
              </h4>
              <p>Web ID: {Product[key].id}</p>
            </td>
            <td className="cart_price">
              <p>{Product[key].price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a className="cart_quantity_up" href="#">
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
                <a className="cart_quantity_down" href="#">
                  -
                </a>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price" />
            </td>
            <td className="cart_delete">
              <a className="cart_quantity_delete" href="#">
                <i className="fa fa-times" />
              </a>
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
          <tbody> {Renderproduct()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default MyProduct;
