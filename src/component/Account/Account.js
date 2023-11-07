import { useEffect } from "react";
import { useState } from "react";

function Account() {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    pass: "",
    avatar: "",
  });
  const image =
    "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
    user.avatar;
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("Userdata"));
    if (userData) {
      userData = userData.data.Auth;
      console.log(userData);
      console.log(image);

      setUser({
        username: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
        pass: userData.pass,
        avatar: userData.avatar,
      });
    }
  }, []);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    address: "",
  });
  function handleInput(e) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({
      ...state,
      [nameInput]: valueInput,
    }));
  }
  return (
    <>
      <div className="col-sm-4">
        {/* <Error error={error} /> */}
        <div className="signup-form">
          {/*sign up form*/}
          <h2>Change your information !</h2>
          <form
            enctype="multipart/form-data"
            //  onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={user.username} // value={} lấy dữ liệu để đưa ra màn hình
              // onChange={handleInput}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={user.email}
              readOnly
              // onChange={(isEmail, handleInput)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.pass}
              readOnly
              // onChange={handleInput}
            />
            <input
              type="phone"
              placeholder="phone"
              name="phone"
              value={user.phone}
              // onChange={handleInput}
            />
            <input
              type="address"
              placeholder="address"
              name="address"
              value={user.address}
              // onChange={handleInput}
            />
            <input
              type="file"
              // onChange={handleUserInputFile}
            />
            <img src={image} width={75} height={75} />
            <br />

            <button type="submit" className="btn btn-default">
              Change
            </button>
          </form>
        </div>
        {/*/sign up form*/}
      </div>
    </>
  );
}

export default Account;
