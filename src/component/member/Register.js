import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";

function Register() {
  // làm giống bài 32 vì các trường giống nhau ở phần usestate NÊN

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  }

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    // avatar: "",
    // error 500 on run
    level: 0,
  });
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({
      ...state,
      [nameInput]: valueInput,
    }));
  };
  const [error, setError] = useState({});
  const [avatar, setAvatar] = useState({});
  const [getFile, setFile] = useState("");
  function handleUserInputFile(e) {
    e.preventDefault();
    const file = e.target.files;
    //e.target.files will always works BUT FILE ISNT

    //send file to api sever
    let reader = new FileReader();
    reader.onload = (e) => {
      //set avartar
      setAvatar(e.target.result);
      // set file for handle it in handleSubmit
      setFile(file);
    };
    reader.readAsDataURL(file[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    let maxSize = 1024 * 1024;

    if (inputs.name == "") {
      errorSubmit.name = " Vui long nhap ten cua ban";
      flag = false;
    }
    if (inputs.email == "") {
      errorSubmit.email = "vui long nhap email";
      flag = false;
    }
    if (inputs.password == "") {
      errorSubmit.password = "Vui long nhap password";
      flag = false;
    }
    if (inputs.phone == "") {
      errorSubmit.phone = "Vui long nhap so dien thoai";
      flag = false;
    }
    if (inputs.address == "") {
      errorSubmit.address = "Vui long nhap dia chi nha ";
      flag = false;
    }
    if (getFile == "") {
      alert("Vui long upload anh ? ");
    } else {
      console.log(getFile);

      let setSize = getFile[0].size;
      let setName = getFile[0].name;

      if (setSize > maxSize) {
        alert("File phai nho hon 1mb");
        flag = false;
      }

      // Kiểm tra định dạng file
      let validExtensions = ["png", "jpg", "jpeg"];
      let fileExtension = setName.split(".").pop().toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        alert("File ảnh không hợp lệ!");
        flag = false;
      }
    }

    if (!flag) {
      setError(errorSubmit);
    } else {
      setError({});
      inputs["avatar"] = avatar;
      console.log(inputs);
      axios
        .post("http://localhost/laravel8/laravel8/public/api/register", inputs)
        .then((res) => {
          console.log(res); // checking the inputed information has saved to api
          if (res.data.error) {
            setError(res.data.error);
          } else {
            alert("U GOOD TO GO ");
          }
        });
    }
  }
  return (
    <>
      <div className="col-sm-4">
        <Error error={error} />
        <div className="signup-form">
          {/*sign up form*/}
          <h2>New User Signup!</h2>
          <form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInput}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={(isEmail, handleInput)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
            />
            <input
              type="phone"
              placeholder="phone"
              name="phone"
              onChange={handleInput}
            />
            <input
              type="address"
              placeholder="address"
              name="address"
              onChange={handleInput}
            />
            <input type="file" onChange={handleUserInputFile} />
            {/* <input type="hidden" value={"0"} name="level"></input> */}
            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
          <p> Already have account ? </p>
          <button type="click" className="btn btn-default">
            <Link to="/login"> Login </Link>
          </button>
        </div>
        {/*/sign up form*/}
      </div>
    </>
  );
}
export default Register;
