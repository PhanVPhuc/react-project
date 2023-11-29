import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Account() {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    avatar: "",
    id: "",
  });
  //lỗi 500 ( backend ) gửi qua api không đọc được password vì khai báo nó là pass nên sai
  // gửi password = "" thì backend sẽ xử lí . khi ta gán giá trị từ local thì nó sẽ mã hoá thì = undefied
  const image =
    "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
    user.avatar;
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("Userdata"));
    let userData = data.data;
    if (userData) {
      userData = userData.Auth;
      console.log(userData);
      console.log(image);

      setUser({
        name: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
        password: "",
        // gọi ra gán "" không thì password = undefied sẽ ra code 500
        avatar: userData.avatar,
        id: userData.id,
      });
      // làm ở trong  , cho chạy if ở ngoài sẽ bị lỗi re-render
    }
  }, []);

  function handleInput(e) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setUser((state) => ({
      ...state,
      [nameInput]: valueInput,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (user.name == "") {
      //user.username) {
      errorSubmit.name = " Vui long nhap ten cua ban";
      flag = false;
    }
    if (user.phone == "") {
      // user.phone) {
      errorSubmit.phone = "Vui long nhap so dien thoai";
      flag = false;
    }
    if (user.address == "") {
      // user.address) {
      errorSubmit.address = "Vui long nhap dia chi nha ";
      flag = false;
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});

      let token = JSON.parse(localStorage.getItem("Userdata"));
      let accessToken = token.token;
      // prettier-ignore
      let config = {
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
      };

      // console.log(user);
      const url =
        "http://localhost/laravel8/laravel8/public/api/user/update/" + user.id;
      axios.post(url, user, config).then((res) => {
        console.log(res);

        // JSON.stringify(localStorage.setItem("Userdata", res));
        localStorage.setItem("Userdata", JSON.stringify(res.data));
        // checking the inputed information has saved to api
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          alert("Changed successfully ");
        }
      });
    }
  }

  return (
    <>
      <div className="col-sm-4">
        <div className="signup-form">
          <h2>Change your information !</h2>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={user.username}
              name="name"
              // value={} lấy dữ liệu để đưa ra màn hình
              // và sẽ không nhập được dữ liệu nên xài placeholder
              onChange={handleInput}
            />
            <input
              type="email"
              // placeholder={user.email}
              name="email"
              value={user.email}
              readOnly
              onChange={handleInput}
            />
            <input
              type="password"
              value=""
              name="password"
              readOnly
              onChange={handleInput}
            />
            <input
              type="phone"
              placeholder={user.phone}
              name="phone"
              onChange={handleInput}
            />
            <input
              type="address"
              placeholder={user.address}
              name="address"
              onChange={handleInput}
            />
            <br />

            <button type="submit" className="btn btn-default">
              Change
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Account;
