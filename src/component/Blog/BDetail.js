import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "./blog/blog-two.jpg";
import Listcomment from "./Listcomment";
import Blograting from "./Blograting";
import Comment from "./Comment";

function BlogDetail(props) {
  let params = useParams();
  const [data, setData] = useState([]);
  // tạo state cho comment
  const [comment, setComment] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id
      )
      .then((response) => {
        setData(response.data.data);
        setComment(response.data.data.comment);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // const [idRely, setIdRely] = useState("");
  // khai báo các đối tượng cần thiết để truyền dữ liệu về
  //  ta sẽ sử lí việc truyền api và lấy id để so với blog để đưa về blog detail cần thiết

  function renderBlogDetail() {
    // console.log(data);
    // if (data.length > 0) {
    if (Object.keys.length > 0) {
      const image =
        "http://localhost/laravel8/laravel8/public/upload/Blog/image/" +
        data.image;
      // console.log(image);
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

  // get cmt mới nhất về

  function getCmt(data) {
    const cmtData = data.data.data;
    // const newData = listCmt + cmtData;
    console.log(cmtData);
    if (comment.length > 0) {
      setComment(comment.map((data) => data.data.data).join(" "));
    }
    // setComment(comment + cmtData);
    // concat array
    // nối 2 mảng lại
  }

  // console.log("data" + data);
  // console.log("comment" + comment);
  return (
    <div className="col-sm-9">
      {/* xử lí ở đây  */}
      <div className="blog-post-area">{renderBlogDetail()}</div>
      {/*/blog-post-area*/}
      <div className="rating-area">
        <Blograting />
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
        <h2> RESPONSES</h2>
        <ul className="media-list">
          <Listcomment listCmt={comment} />
        </ul>
      </div>
      {/*/Response-area*/}
      <Comment getCmt={getCmt} />
      {/*/Repaly Box*/}
    </div>
  );
}

export default BlogDetail;

/* 


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
       
          */
