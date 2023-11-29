import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
  // Edit product begin
  // khai báo các state mình sẽ sử dụng trong component này
  // tương tự như add
  // ý tưởng ban đầu là sẽ lấy api của my product về và chọn sản phẩm để edit
  // và từ đó sẽ in ra các param như update user ( set vào placeholder hoặc value (50/50) để thay đổi giá trị )
  // làm phần avatar checkbox đã
  // xuất hình ra 1 dãy rồi chọn cái nào để xoá
  // sau đó đưa qua api update product

  let params = useParams();
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({});
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: 1,
    sale: 0,
    image: "",
    company: "",
    detail: "",
  });
  const userData = JSON.parse(localStorage.getItem("Userdata"));
  const userId = userData.data.Auth.id;
  // console.log(userId);
  const accessToken = userData.data.token;

  // get item data
  // prettier-ignore
  let config = {
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
  };
  const url =
    "http://localhost/laravel8/laravel8/public/api/user/product/" + params.id;

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        if (res) {
          // setData(res.data.data);
          if (res.data.data) {
            setProduct({
              // gán giá trị vào data để đưa nó vào value
              name: res.data.data.name,
              price: res.data.data.price,
              category: res.data.data.id_category,
              brand: res.data.data.id_brand,
              status: res.data.data.status,
              sale: res.data.data.sale,
              company: res.data.data.company_profile,
              detail: res.data.data.detail,
              image: res.data.data.image,
            });
          }
        } else {
          alert("error");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(product);

  // function xử lí input
  function handleInputs(e) {
    const nameInputs = e.target.name;
    //  e.target.name get name để làm key cho inputs
    const valueInputs = e.target.value;
    console.log(nameInputs);
    // e.target.value get value để làm value cho inputs
    setProduct((state) => ({ ...state, [nameInputs]: valueInputs }));
  }
  // ------------get brand and category-----------

  //  lấy data từ api category-brand
  // sau khi get được data từ api về
  //  thì tạo function và set vào xử lí
  // dùng hàm map để render ra thẻ input.

  useEffect(() => {
    axios
      .get("http://localhost/laravel8/laravel8/public/api/category-brand")
      .then((res) => {
        setBrand(res.data.brand);
        setCategory(res.data.category);
      })
      .catch((error) => console.log(error));
  }, []);

  function renderBrand() {
    if (brand.length > 0) {
      return brand.map((key, value) => {
        return (
          <option key={value} value={key.id}>
            {key.brand}
          </option>
        );
      });
    }
  }
  function renderCategory() {
    if (category.length > 0) {
      return category.map((key, value) => {
        return (
          <option key={value} value={key.id}>
            {key.category}
          </option>
        );
      });
    }
  }
  // -------------end get brand and category------

  // render sale -----------------------------
  function renderSale() {
    if (product.status == 0) {
      return (
        <div style={{ width: "200px" }}>
          <input
            style={{ width: "100px", float: "left" }}
            type="text"
            name="sale"
            onChange={handleInputs}
            placeholder="ex : 10"
            value={product.sale}
          />
          <span
            style={{
              width: "100px",
              height: "40px",
              float: "left",
              padding: "9px 2px 0px 5px",
            }}
          >
            %
          </span>
        </div>
      );
    }
  }
  // end render sale----------------------

  // render error begin --------------------

  function renderError() {
    // Khai báo biến errors

    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <li key={index}>{errors[key]}</li>;
      });
    }
  }
  // render error end------------------------

  // render all here =================================
  function RenderProduct() {
    if (Object.keys.length > 0) {
      return (
        <form
          style={{ width: "800px" }}
          action="#"
          encType="multipart/form-data"
          // onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder={product.name}
            onChange={handleInputs}
            value={product.name}
          />
          <input
            type="text"
            name="price"
            placeholder={product.price}
            onChange={handleInputs}
            value={product.price}
          />
          <select name="category" onChange={handleInputs}>
            <option value="">Please chose category</option>
            {renderCategory()}
          </select>
          <select name="brand" onChange={handleInputs}>
            <option value="">Please chose brand</option>
            {renderBrand()}
          </select>

          <select
            name={product.status}
            value={product.status}
            onChange={handleInputs}
          >
            <option value="1">New</option>
            <option value="0">Sale</option>
          </select>
          {renderSale()}
          <input
            type="text"
            placeholder={product.company}
            name="company"
            onChange={handleInputs}
            value={product.company}
          />
          <textarea
            placeholder={product.detail}
            name="detail"
            onChange={handleInputs}
            value={product.detail}
            rows={4}
            cols={40}
          ></textarea>
          <button type="submit" className="btn btn-default">
            Create
          </button>
        </form>
      );
    }
  }
  // end render what we need

  // handle submit xử lí tại đây-----------------
  function handleSubmit(e) {
    console.log(product);
    e.preventDefault();
    let flag = true;
    let errorsSubmit = {};
    const maxSize = 1024 * 1024;
    if (product.name == "") {
      errorsSubmit.name = "Vui lòng nhập tên sản phẩm";
      flag = false;
    }
    if (product.price == "") {
      errorsSubmit.price = "Vui lòng nhập giá sản phẩm";
      flag = false;
    }
    if (product.category == "") {
      errorsSubmit.category = "Vui lòng chọn loại sản phẩm";
      flag = false;
    }
    if (product.brand == "") {
      errorsSubmit.brand = "Vui lòng chọn hãng của sản phẩm";
      flag = false;
    }
    if (product.company == "") {
      errorsSubmit.company = "Vui lòng chọn công ty phân phối của mặt hàng";
      flag = false;
    }
    if (product.detail == "") {
      errorsSubmit.detail = "Vui long nhập mô tả sản phẩm";
      flag = false;
    }
    if (file == "") {
      errorsSubmit.file = "Vui long upload anh ? ";
    } else {
      console.log(file);

      let setSize = file[0].size;
      let setName = file[0].name;

      if (setSize > maxSize) {
        errorsSubmit.file = "File phai nho hon 1mb";
        flag = false;
      }

      // Kiểm tra định dạng file
      let validExtensions = ["png", "jpg", "jpeg"];
      let fileExtension = setName.split(".").pop().toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        errorsSubmit.file = "File ảnh không hợp lệ!";
        flag = false;
      }
    }
    if (flag == true) {
      // lấy token từ local về để xác minh danh tính và làm config
      const userData = JSON.parse(localStorage.getItem("Userdata"));
      // console.log(userData);

      let url =
        "http://localhost/laravel8/laravel8/public/api/user/product/update/" +
        params.id;
      let accessToken = userData.data.token;
      // console.log(accessToken);
      // prettier-ignore
      let config = {
          headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
           " Accept": "application/json",
          },
        };

      axios
        .post(url, product, config)
        .then((res) => {
          console.log(res);
          alert("Sửa sản phẩm thành công");
          setErrors("");
          // auto reload when add product success
          window.location.reload();
        })
        .catch((error) => console.log(error));
    } else {
      setErrors(errorsSubmit);
    }
  }
  // end handle submit------------------------

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        {/*sign up form*/}
        <h2>Edit Product!</h2>
        <ul className="error-form">{renderError()}</ul>
        {RenderProduct()}
      </div>
    </div>
  );
}

export default EditProduct;

{
  /* <input type="file" name="file" onChange={handleFile} multiple /> */
}
