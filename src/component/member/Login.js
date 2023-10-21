import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";
import axios from "axios";

function Login() {
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  }
  const [inputs, setInputs] = useState({
    // name: "",
    email: "",
    pass: "",
    level: 0,
  });
  const [error, setError] = useState({});
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };
  function handleSubmit(e) {
    e.preventDefault();

    let errorSubmit = {};
    let flag = true;

    if (inputs.email == "") {
      // errorSubmit.email = " We need your email ";
      flag = false;
    }
    // if (inputs.name == "") {
    //   // errorSubmit.pass = " We need your name";
    //   flag = false;
    // }
    if (inputs.pass == "") {
      //   errorSubmit.pass = " We need your Password";
      flag = false;
    }

    if (!flag) {
      setError(errorSubmit);
    }
    setError({});

    console.log(inputs);
    axios
      .post("http://localhost/laravel8/laravel8/public/api/login", inputs)
      .then((res) => {
        console.log(res); // checking the inputed information has saved to api
      });
  }
  return (
    <section id="form">
      {/*form*/}
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
              {/*login form*/}
              <h2>Login to your account</h2>
              <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                {/* <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleInput}
                /> */}
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={(isEmail, handleInput)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="pass"
                  onChange={handleInput}
                />
                {/* <Error error={error} /> */}
                <span>
                  <input type="checkbox" className="checkbox" />
                  Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">
                  Login
                </button>
              </form>
              <p>Dont have account ? Click the button below</p>
              <button type="click" className="btn btn-default">
                <Link to="/Register"> Register</Link>
              </button>
            </div>
            {/*/login form*/}
          </div>
        </div>
      </div>
    </section>
    //form
  );
}

export default Login;
