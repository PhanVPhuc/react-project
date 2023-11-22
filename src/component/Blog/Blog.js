import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogDetail from "./BDetail";

function Blog(props) {
  /* Giống bài 18 , lấy api về đưa vào useState rồi xuất ra blog bằng hàm renderDâta

        *làm thẳng vào file blog  ( lấy api phần nào , làm phần đó : lấy api file nào , làm file đó )

        Link Api : http://localhost/laravel8/laravel8/public/api/blog 
        nhớ bật Xampp trước , mở apache và sql
        
        ở return chính : 
        <div className="container">
        {renderData}
        </div>


        làm xong làm tiếp blogList
        */

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost/laravel8/laravel8/public/api/blog ")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function renderData() {
    // console.log(data);
    if (Object.keys(data).length > 0) {
      //run obj map

      const blogData = data.blog; // move to 1 obj layer
      // console.log(blogData.data); // check
      const dataArray = blogData.data; // move to data which contain what we need to display
      console.log(dataArray); // check

      return dataArray.map((value, key) => {
        const image =
          "http://localhost/laravel8/laravel8/public/upload/Blog/image/" +
          dataArray[key].image;
        console.log(image);
        // run array map
        return (
          <div key={key}>
            <h3> {value.title} </h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" /> {value.id}
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <a href="#">
              {/* <img src="http://localhost/public/upload/Blog/image/" alt="" /> */}
              <img alt="" src={image} />
            </a>
            <p>{value.content}</p>
            {/* to={"/blog/detail/"} + {value.id}   // will never run  and to={`/blog/detail/${value.id}`} this will get the id to make it out in url but never get the value.id to compare
              but 
               ===> to={"/blog/detail/" + value["id"]} this will run and get the id we need to get to show it on the url and use it ti compare to the id in the blog/detail api
              */}
            <Link
              className="btn btn-primary"
              to={"/blog/detail/" + value["id"]}
            >
              Read More
            </Link>
          </div>
        );
      });
    }
    // if (Object.keys(data).length > 0) {
    //   const blogData = data.blog;
    //   console.log(blogData.data);
    // }
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>

        <div className="single-blog-post">
          <h3>Girls Pink T Shirt arrived in store</h3>
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
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-half-o" />
            </span>
          </div>
          <a href="#">
            <img src="frontend/images/blog/blog-one.jpg" alt="" />
          </a>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <Link className="btn btn-primary" to="/blog-single ">
            Read More
          </Link>
        </div>
        <div className="single-blog-post">{renderData()} </div>
        <div className="pagination-area">
          <ul className="pagination">
            <li>
              <a href className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-angle-double-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Blog;
