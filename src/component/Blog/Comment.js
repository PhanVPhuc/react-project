import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Listcomment from "./Listcomment";

function Comment() {
  const navigate = useNavigate();
  let params = useParams();
  const [comment, setcomment] = useState("");
  const [inputs, setInputs] = useState({
    message: "",
  });
  const flag = JSON.parse(localStorage.getItem("Flag"));
  const userData = JSON.parse(localStorage.getItem("Userdata"));
  function handleInput(e) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  }

  function handleComment(e) {
    e.preventDefault();

    if (flag) {
      // xử lí comment tại đây
      // alert("Good to go");
      let accessToken = userData.data.token;
      // prettier-ignore
      let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };

      const formData = new FormData();
      formData.append("id_blog", params.id);
      formData.append("id_user", userData.data.Auth.id);
      formData.append("id_comment", 0);
      formData.append("comment", inputs.message);
      formData.append("image_user", userData.data.Auth.avatar);
      formData.append("name_user", userData.data.Auth.name);

      if (inputs.message === "") {
        alert(" You forgot to comment");
      } else {
        // xử lí comments tại đây
        // alert("okebae");

        axios
          .post(
            "http://localhost/laravel8/laravel8/public/api/blog/comment/" +
              params.id,
            //"http://localhost/laravel8/laravel8/public/api/blog/comment/" + id post url which include id we get on the url
            // USE THE + TO GET NOT THE , ( I DISSAPOINTED MY OWN KNOWLEGDE)
            formData,
            config
          )
          .then((res) => {
            // console.log(res.data.data.comment);
            console.log(res);
            setcomment(res.data.data);
          });
      }
    } else {
      alert("You need to login to post comment");
      navigate("/login");
    }
  }
  return (
    <>
      <form
        className="replay-box"
        enctype="multipart/form-data"
        onSubmit={handleComment}
      >
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                name="message"
                rows={11}
                defaultValue={""}
                onChange={handleInput}
              />
              <button className="btn btn-primary" href>
                post comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Comment;
