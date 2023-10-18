import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState(" ");
  const [phone, setPhone] = useState("");
  const [address, setAddess] = useState("");
  const [avatar, setAvatar] = useState({});
  const [file, setFile] = useState([]);

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  }
  function handleUserInputFile(e) {
    e.preventDefault();
    const file = e.target.file;

    //send file to api sever
    let reader = new FileReader();
    reader.onload = (e) => {
      //set avartar
      setAvatar(e.target.result);
      // set file
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }

  function handdleChanges(e) {
    setName(e.target.value);
    setEmail(e.target.value);
    setPass(e.target.value);
    setPhone(e.target.value);
    setAddess(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      pass: pass,
      phone: phone,
      address: address,
    };
    axios.post("http://localhost/public/api/login", data).then((res) => {
      console.log(res);
    });
  }
  return (
    <>
      <div className="col-sm-4">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>New User Signup!</h2>
          <form action="#">
            <input type="text" placeholder="Name" name="name" />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={isEmail}
            />
            <input type="password" placeholder="Password" name="password" />
            <input type="phone" placeholder="phone" name="phone" />
            <input type="address" placeholder="address" name="address" />
            <input type="file" onChange={handleUserInputFile} />
            <button
              type="submit"
              className="btn btn-default"
              onClick={handleSubmit}
            >
              Signup
            </button>
            <p> Already have account ? </p>
            <button type="click" className="btn btn-default">
              <Link to="/login"> Login </Link>
            </button>
          </form>
        </div>
        {/*/sign up form*/}
      </div>
    </>
  );
}
export default Register;
