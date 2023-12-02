import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddProduct() {
  // add product begin
  // khai báo các state mình sẽ sử dụng trong component này

  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({});
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [inputs, setInputs] = useState({
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

  // function xử lí inputs
  function handleInputs(e) {
    const nameInputs = e.target.name;
    //  e.target.name get name để làm key cho inputs
    const valueInputs = e.target.value;
    console.log(nameInputs);
    // e.target.value get value để làm value cho inputs
    setInputs((state) => ({ ...state, [nameInputs]: valueInputs }));
  }
  // function xử lí file
  function handleFile(e) {
    const getFile = e.target.files;
    // console.log(getFile);
    setFile(getFile);
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
        // console.log(res.data);
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
    if (inputs.status == 0) {
      return (
        <div style={{ width: "200px" }}>
          <input
            style={{ width: "100px", float: "left" }}
            type="text"
            name="sale"
            onChange={handleInputs}
            placeholder="ex : 10"
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

  // handle submit xử lí tại đây-----------------
  function handleSubmit(e) {
    console.log(inputs);
    e.preventDefault();
    let flag = true;
    let errorsSubmit = {};
    const maxSize = 1024 * 1024;
    const typeName = ["png", "jpeg", "jpg"];
    //  thử xài switch case thay vì if cơ bản
    // switch (inputs) {
    //   case 0(inputs.name == ""):
    //     errorsSubmit.name = "Please input product name";
    //     alert("error name");
    //     flag = false;
    //     break;
    //   case 1(inputs.price == ""):
    //     errorsSubmit.price = " Please input product price";
    //     alert("error price");
    //     flag = false;
    //     break;
    //   case 2(inputs.brand == ""):
    //     errorsSubmit.brand = " Please select product brand";
    //     flag = false;
    //     break;
    //   case 3(inputs.category == ""):
    //     errorsSubmit.category = " Please select product category";
    //     flag = false;
    //     break;
    //   default:
    // }
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
    if (inputs.company == "") {
      errorsSubmit.company = "Vui lòng chọn công ty phân phối của mặt hàng";
      flag = false;
    }
    if (inputs.detail == "") {
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
        "http://localhost/laravel8/laravel8/public/api/user/product/add";
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
      // gửi các param = api sang formData để xử lí
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("price", inputs.price);
      formData.append("category", inputs.category);
      formData.append("brand", inputs.brand);
      formData.append("company", inputs.company);
      formData.append("detail", inputs.detail);
      formData.append("status", inputs.status);

      formData.append("sale", inputs.sale);

      // khi  gửi qua api bằng formData là 1 mảng 2 chiều thì dùng map để gửi
      // tiếp đó ta truyền toàn bộ file ảnh upload qua api mà k cần mã hoá
      Object.keys(file).map((key, index) => {
        formData.append("file[]", file[key]);
      });
      axios
        .post(url, formData, config)
        .then((res) => {
          console.log(res);
          alert("Đăng ký sản phẩm thành công");
          setErrors("");
          // auto reload when add product success
          // window.location.reload();
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
            onChange={handleInputs}
            value={inputs.name}
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            onChange={handleInputs}
            value={inputs.price}
          />
          <select name="category" onChange={handleInputs}>
            <option value="">Please chose category</option>
            {renderCategory()}
          </select>
          <select name="brand" onChange={handleInputs}>
            <option value="">Please chose brand</option>
            {renderBrand()}
          </select>

          <select name="status" value={inputs.status} onChange={handleInputs}>
            <option value="1">New</option>
            <option value="0">Sale</option>
          </select>
          {renderSale()}
          <input
            type="text"
            placeholder="Company profile"
            name="company"
            onChange={handleInputs}
            value={inputs.company}
          />
          <input type="file" name="file" onChange={handleFile} multiple />
          <textarea
            placeholder="Detail"
            name="detail"
            onChange={handleInputs}
            value={inputs.detail}
            rows={4}
            cols={40}
          ></textarea>
          <button type="submit" className="btn btn-default">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
