import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NONAME() {
  // Bắt đầu làm bài Add Product
  // Tạo form gồm các inputs lưu ở trong useState,bắt lỗi như bình thường.
  const [errors, setErrors] = useState({});
  const [getFile, setFile] = useState("");
  const [brandData, setBrand] = useState([]);
  const [categoryData, setCategory] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: 1,
    image: "",
    sale: 0,
    company: "",
    detail: "",
  });

  // Function xử lý input

  function handleInput(e) {
    // E.target.name : lấy name cua thẻ input de lam key
    const nameInput = e.target.name;
    // E.target.value : lây value của thẻ input de lam value
    const valueInput = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  }
  // Function xử lý file
  function handleFile(e) {
    const file = e.target.files;
    console.log(file);
    setFile(file);
  }

  // Hiển thị params brand và category thì lấy data từ api category-brand
  // sau khi get được data từ api về thì tạo biến và set vào trong useState
  // rồi tạo 2 function dùng hàm map để render ra thẻ input.
  useEffect(() => {
    axios
      .get("http://localhost/laravel8/laravel8/public/api/category-brand")
      .then((res) => {
        // console.log(res.data);
        setBrand(res.data.brand);
        setCategory(res.data.category);
      })
      .catch((error) => console.log(error));
  }, []);

  function Brand() {
    if (brandData.length > 0) {
      return brandData.map((key, index) => {
        return (
          <option key={index} value={key.id}>
            {key.brand}
          </option>
        );
      });
    }
  }
  function Category() {
    if (categoryData.length > 0) {
      return categoryData.map((key, index) => {
        return (
          <option key={index} value={key.id}>
            {key.category}
          </option>
        );
      });
    }
  }

  // Function xử lý form
  function handleSubmit(e) {
    e.preventDefault();
    let flag = true;
    let errorsSubmit = {};
    if (inputs.name == "") {
      errorsSubmit.name = "Vui lòng nhập tên sản phẩm";
      flag = false;
    }
    if (inputs.price == "") {
      errorsSubmit.price = "Vui lòng nhập giá sản phẩm";
      flag = false;
    }
    if (inputs.category == "") {
      errorsSubmit.category = "Vui lòng chọn loại sản phẩm";
      flag = false;
    }
    if (inputs.brand == "") {
      errorsSubmit.brand = "Vui lòng chọn hãng của sản phẩm";

      flag = false;
    }
    if (inputs.status == "0" && inputs.sale == "") {
      errorsSubmit.sale = "Vui lòng chọn mức sale của sản phẩm";
      flag = false;
    }
    if (inputs.company == "") {
      errorsSubmit.company = "Vui lòng nhập nguồn gốc sản phẩm";
      flag = false;
    }
    if (inputs.detail == "") {
      errorsSubmit.detail = "Vui lòng nhập mô tả sản phẩm";
      flag = false;
    }
    if (getFile == "") {
      errorsSubmit.file = "Vui lòng upload file";
      flag = false;
    } else {
      const sizeMax = 1024 * 1024;
      const typeName = ["png", "jpeg", "jpg"];
      const splitName = getFile[0].type.split("/");
      if (getFile[0].size > sizeMax) {
        errorsSubmit.file = "Ảnh có kích thước lớn";
        flag = false;
      } else if (!typeName.includes(splitName[1])) {
        errorsSubmit.file = "Ảnh không đúng định dạng";
        flag = false;
      }
    }

    if (flag == true) {
      // muốn post hay get mà có sử dụng TOKEN thì phải lấy data từ local về.
      const userData = JSON.parse(localStorage.getItem("Userdata"));
      console.log(userData);
      let url =
        "http://localhost/laravel8/laravel8/public/api/user/product/add";
      let accessToken = userData.data.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      // gừi các params sang API.
      const formData = new FormData();
      console.log(formData);
      formData.append("name", inputs.name);
      formData.append("price", inputs.price);
      formData.append("category", inputs.category);
      formData.append("brand", inputs.brand);
      formData.append("company", inputs.company);
      formData.append("detail", inputs.detail);
      formData.append("status", inputs.status);
      // toán tử ba ngôi(điều kiện rút gọn)
      // Cú pháp toán tử ba ngôi như sau :
      // variable_name = (condition) ? value1 : value2
      formData.append("sale", inputs.sale ? inputs.sale : 0);
      // Vì khi gửi file upload qua nó là mảng 2 chiều nên phải dùng map để gửi qua API.
      // Tiếp theo truyền toàn bộ file ảnh upload qua API.,không cần mã hóa
      // API luôn tự động lưu file upload hình ảnh dưới dạn JSON,lấy ra hiển thị dùng JSON.parse
      // Lấy biến useState dùng để lưu hình ảnh là (getFile) đưa tất cả vào array tên là file[]

      Object.keys(getFile).map((key, index) => {
        formData.append("file[]", getFile[key]);
      });
      // post có 3 cái (url , formData , config)
      axios
        .post(url, formData, config)
        .then((res) => {
          console.log(res);
          alert("Đăng ký sản phẩm thành công");
          setErrors("");
        })
        .catch((error) => console.log(error));
    } else {
      setErrors(errorsSubmit);
    }
  }
  // muốn hiển thị input sale cho người dùng nhập sale bao nhiêu % thì tạo một function để render
  // nếu status == 1 thì giữ nguyên,nếu status == 0 thì code như bên dưới.

  // Code Ví Dụ function renderSale(){
  //     lấy giá trị status == 0{
  //         return(
  //             <input type ="text " name="sale"/>
  //         )
  //     }
  // }

  // Ở dưới html thì code như sau :
  // <select name="status">
  //     <option value="1">new</option>
  //     <option value="0">Sale</option>
  // </select>

  function renderSale() {
    if (inputs.status == 0) {
      return (
        <div style={{ width: "200px" }}>
          <input
            style={{ width: "100px", float: "left" }}
            type="text"
            name="sale"
            onChange={handleInput}
            value={inputs.sale}
          />
          <span
            style={{
              width: "100px",
              height: "40px",
              float: "left",
              padding: "9px 2px 0px 5px",
            }}
          >
            {" "}
            %
          </span>
        </div>
      );
    }
  }

  function renderError() {
    // Khai báo biến errors

    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <li key={index}>{errors[key]}</li>;
      });
    }
  }
  return (
    <div className="col-sm-4">
      <div className="signup-form">
        {/*sign up form*/}
        <h2>Create Product!</h2>
        <ul className="error-form">{renderError()}</ul>
        <form
          style={{ width: "800px" }}
          action="#"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleInput}
            value={inputs.name}
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            onChange={handleInput}
            value={inputs.price}
          />
          <select name="category" onChange={handleInput}>
            <option value="">Please chose category</option>
            {Category()}
          </select>
          <select name="brand" onChange={handleInput}>
            <option value="">Please chose brand</option>
            {Brand()}
          </select>

          <select name="status" value={inputs.status} onChange={handleInput}>
            <option value="1">New</option>
            <option value="0">Sale</option>
          </select>
          {renderSale()}
          <input
            type="text"
            placeholder="Company profile"
            name="company"
            onChange={handleInput}
            value={inputs.company}
          />
          <input type="file" name="file" onChange={handleFile} multiple />
          <textarea
            placeholder="Detail"
            name="detail"
            onChange={handleInput}
            value={inputs.detail}
            rows={4}
            cols={40}
          />
          <button type="submit" className="btn btn-default">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default NONAME;
