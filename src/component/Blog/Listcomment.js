import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Listcomment() {
  const params = useParams();
  const url =
    "http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data.data.comment);
        // setComment(response.data.data.comment);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  if (data.length > 0) {
    console.log(data);
    return data.map((value, key) => {
      // mảng sẽ trả về theo dạng array nên ta phải cho chạy hàm map sau khi đưa điều kiện chiều dài data > 0
      // return data.map((value, key) => { } )
      // sau đó cho xuất dữ liệu như dưới thoi <key={key} để kiểm tra key để khỏi trùng nhau >
      // còn lại đưa value.id value.user_img thì chắc chắc sẽ xuất ra kết quả
      const image =
        "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
        value.image_user;
      console.log(image);
      return (
        <li className="media" key={key}>
          <a className="pull-left" href="#">
            <img
              // src="../../../public/frontend/images/blog/blog-two.jpg" // path gốc
              src={image} // path user backend
              className="media-object"
              alt=""
            />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li>
                <i className="fa fa-user" />
                {value.name_user}
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
            <p> {value.comment} </p>
            <button type="submit" className="btn btn-primary" href>
              <i className="fa fa-reply" />
              Replay
            </button>
          </div>
        </li>
      );
    });
  }
}

export default Listcomment;
