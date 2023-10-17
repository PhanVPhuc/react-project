import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  // - Tao form co cac truong như sau: name, email, password, phone, address, avatar, level
  //   (Va lay nhung value nay gui qua api, chu y phai gui đúng name, neu khong api se bao loi khong tim thay.)

  // Yeu cau:
  // - kiem tra va in ra loi theo object cac input neu khong nhap
  // - avatar:
  //    + kiem tra file upload lên có phải là hình ảnh k?
  //    + chi cho phep upload dưới 1mb,
  //    Do avatar upload lên trả về 1 array, nên gửi qua api k dc, vi vậy ta phải mã hoá bằng avatar 1
  //    chuỗi, dùng FileReader và khi đã má hoá rồi thi k thê dùng cái này để check nó là định dạng hình
  //    và check size dc, vì vậy ta se tao thêm 1 file luu all thông tin hình ảnh upload lên và dùng file này đê check.
  //    Như vậy khi upload lên thi mình tạo ra 2 biên:
  //      + 1 biên để luu hình anh mã hoà và gừi qua api. (đặt tên là avatar)
  //      + 1 biên luu thông tin hình ảnh để check image va size (dat tên la file) tham khảo code xư lý image bên
  //      phải (xem them thong tin phia tren cung` ben phai)
  // - level set truc tiep = 0

  const [name, getName] = useState("");
  const [email, getEmail] = useState("");
  const [pass, getPass] = useState(" ");
  const [phone, getPhone] = useState("");
  const [address, getAddess] = useState("");
  const [avatar, getAvatar] = useState({});
  const [file, setFile] = useState([]);

  function handleUserInputFile(e) {
    e.preventDefault();
    console.log("Oh No ");

    const file = e.target.file;

    //send file to api sever
    let reader = new FileReader();
    reader.onload = (e) => {
      //set avartar
      // set file
    };
  }

  function handdleInputs() {}
  function hahandleSubmit(e) {
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
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="btn btn-default">
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
