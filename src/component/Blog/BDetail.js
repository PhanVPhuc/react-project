import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "./blog/blog-two.jpg";
import Listcomment from "./Listcomment";

function BlogDetail(props) {
  let params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    message: "",
  });
  const [comment, setcomment] = useState("");
  function handleInput(e) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  }
  useEffect(() => {
    axios
      .get(
        "http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id
      )
      .then((response) => {
        setData(response.data.data);
        // setComment(response.data.data.comment);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // const [idRely, setIdRely] = useState("");
  // khai báo các đối tượng cần thiết để truyền dữ liệu về
  //  ta sẽ sử lí việc truyền api và lấy id để so với blog để đưa về blog detail cần thiết

  function handleComment(e) {
    e.preventDefault();
    const flag = JSON.parse(localStorage.getItem("Flag"));
    const accessToken = JSON.parse(localStorage.getItem("Token"));
    const userData = JSON.parse(localStorage.getItem("Auth"));
    if (flag) {
      // xử lí comment tại đây
      // alert("Good to go");

      // prettier-ignore
      let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };

      if (inputs.message === "") {
        alert(" You forgot to comment");
      } else {
        // xử lí comments tại đây
        // alert("okebae");
        const formData = new FormData();
        formData.append("id_blog", params.id);
        formData.append("id_user", userData.id);
        formData.append("id_comment", 0);
        formData.append("comment", inputs.message);
        formData.append("image_user", userData.avatar);
        formData.append("name_user", userData.name);

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

  function renderBlogDetail() {
    // console.log(data);
    // if (data.length > 0) {
    if (Object.keys.length > 0) {
      return (
        <>
          <h2 className="title text-center">Latest From our Blog</h2>
          <div className="single-blog-post">
            <h3>{data.title}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" /> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <span>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
              </span>
            </div>
            <a href>
              {/* <img src={image} alt="" /> */}
              <img alt=" wut  ? " src={image} />

              {/* cồng kềnh vl  */}
            </a>
            <p>{data.description}</p> <br />
            <p>{data.content}</p> <br />
            <div className="pager-area">
              <ul className="pager pull-right">
                <li>
                  <a href="#">Pre</a>
                </li>
                <li>
                  <a href="#">Next</a>
                </li>
              </ul>
            </div>
          </div>
        </>
      );
    }
  }

  // console.log("data" + data);
  // console.log("comment" + comment);
  return (
    <div className="col-sm-9">
      {/* xử lí ở đây  */}
      <div className="blog-post-area">{renderBlogDetail()}</div>
      {/*/blog-post-area*/}
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li>
            <i className="fa fa-star color" />
            <i className="fa fa-star color" />
            <i className="fa fa-star color" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
          </li>
          <li className="color">(6 votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <a className="color" href>
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href>
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href>
              Girls
            </a>
          </li>
        </ul>
      </div>
      {/*/rating-area*/}
      <div className="socials-share">
        <a href>
          <img src="frontend/images/blog/socials.png" alt="" />
        </a>
      </div>
      {/*/socials-share*/}
      <div class="media commnets">
        <a class="pull-left" href="#">
          <img
            class="media-object"
            src="frontend/images/blog/man-one.jpg"
            alt=""
          />
        </a>
        <div class="media-body">
          <h4 class="media-heading">Annie Davis</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div class="blog-socials">
            <ul>
              <li>
                <a href="">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fa fa-dribbble"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fa fa-google-plus"></i>
                </a>
              </li>
            </ul>
            <a class="btn btn-primary" href="">
              Other Posts
            </a>
          </div>
        </div>
      </div>
      {/*Comments*/}
      <div className="response-area">
        <h2>3 RESPONSES</h2>
        <ul className="media-list">
          <Listcomment data={comment} />

          <li className="media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-four.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="public/frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>

          {/* 


          
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-four.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li>
          <li className="media second-media">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="frontend/images/blog/man-three.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user" />
                  Janis Gallagher
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <a className="btn btn-primary" href>
                <i className="fa fa-reply" />
                Replay
              </a>
            </div>
          </li> */}
        </ul>
      </div>
      {/*/Response-area*/}
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
      {/*/Repaly Box*/}
    </div>
  );
}

export default BlogDetail;
