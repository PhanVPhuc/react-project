import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

function Addproduct() {
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    company: "",
    detail: "",
    status: "",
    sale: "",
    item: "",
  });
  const [avatar, setAvatar] = useState({});
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let userdata = JSON.parse(localStorage.getItem("Userdata"));

  // ---------------- get brand---------------
  const [categorybrand, setCategorybrand] = useState([]);
  const brandUrl =
    "http://localhost/laravel8/laravel8/public/api/category-brand";
  useEffect(() => {
    axios
      .get(brandUrl)
      .then((res) => {
        setCategorybrand(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const brand = categorybrand.brand;
  const category = categorybrand.category;
  // ------------------------------------
  // ------------- brand and category options

  function brandOption() {
    if (!categorybrand || !categorybrand.brand) {
      // kiểm tra đã có dữ liệu hay chưa
      console.log("Khong co du lieu");
      return null;
      // Return null or a fallback element if brand is undefined
    }

    return categorybrand.brand.map((value, key) => {
      return (
        <option key={key} value={value.id}>
          {value.brand}
        </option>
      );
    });
  }

  function categoryOption() {
    if (!categorybrand || !categorybrand.category) {
      // kiểm tra đã có dữ liệu hay chưa
      console.log("Khong co du lieu");
      return null;
      // Return null or a fallback element if brand is undefined
    }
    return category.map((value, key) => {
      return (
        <option key={key} value={value.id}>
          {value.category}
        </option>
      );
    });
  }

  // ------------------------------------

  // ------------------new or sale status---------
  function isStatus(e) {
    return (
      <>
        <label> Status</label>
        <select name="status" onChange={handleInput}>
          <option value="0">New</option>
          <option value="1">Sale</option>
        </select>
      </>
    );
  }

  function isSale(e) {
    // if () {
    return (
      <>
        <label> Sale</label>
        <input
          type="number"
          min="0"
          step="any"
          name="Sale"
          placeholder="sale of ? % "
          onChange={handleInput}
        />
      </>
    );
    // }
  }

  // ---------------------------------------------------
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInput((state) => ({
      ...state,
      [nameInput]: valueInput,
    }));
  };
  let accessToken = userdata.token;
  // prettier-ignore
  let config = {
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
      };
  let formData = new FormData();
  formData.append("name", input.name);
  formData.append("price", input.price);
  formData.append("category", input.category);
  formData.append("brand", input.brand);
  formData.append("company", input.company);
  formData.append("detail", input.detail);
  formData.append("status", input.status);
  formData.append("sale", input.sale);

  // Object.keys(avatar).map((item, i) => {
  //   formData.append("file[]", avatar[item]);
  // });

  useEffect(() => {
    axios
      .post(
        "http://localhost/laravel8/laravel8/public/api/user/product/add ",
        config
      )
      .then((res) => {
        setInput(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(categorybrand);
  console.log(category);
  console.log(brand);
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input);
  }
  return (
    <>
      <div className="col-sm-4">
        <div className="signup-form">
          <h2>Create a product !</h2>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label> Product name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              // required
              // value={} lấy dữ liệu để đưa ra màn hình
              // và sẽ không nhập được dữ liệu nên xài placeholder
              onChange={handleInput}
            />
            <label>Product price</label>
            <input
              type="number"
              min="1"
              step="any"
              name="price"
              placeholder="How much is this product ?"
              onChange={handleInput}
              // required
            />
            {isStatus()}
            {isSale()}
            <label> Category</label>
            <select name="category" onChange={handleInput}>
              <option value="" id="">
                Please choose brand
              </option>
              {categoryOption()}
            </select>
            <label> Product brand</label>
            <select name="brand" onChange={handleInput}>
              <option value="" id="">
                Please choose brand
              </option>
              {brandOption()}
            </select>

            <label> Company profile</label>
            <input
              type="text"
              placeholder="Company profile"
              name="company"
              // required
              onChange={handleInput}
            />

            <label htmlFor="files" onChange={handleInput}>
              Select product image:
            </label>
            {/* <input type="file" id="files" name="files" multiple required /> */}
            <label> Detail</label>
            {/* <textarea placeholder="Add detail for this product" required /> */}
            <br />
            <button type="submit" className="btn btn-default">
              Add product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addproduct;
