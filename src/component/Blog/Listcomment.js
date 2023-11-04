import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Listcomment(props) {
  // lấy dữ liệu từ BDetail sang , nếu get api ở đây là ta get 2 lần
  // khá là dư nên ta dùng props lấy và chuyển đổi dữ liệu để đăng cmt lên mà không cần reload trang

  const data = props.listCmt;
  // const data = props.listCmt;
  // console.log(data);
  function replyId(e) {
    // lấy id ở nút reply tại mỗi cmt đã được xuất ra màn hình 
    const repId = e.target.id;
    // console.log(repId);
    props.getidUser(repId);
  }

  if (data.length > 0) {
    // console.log(data);
    return data.map((value, key) => {
      // mảng sẽ trả về theo dạng array nên ta phải cho chạy hàm map sau khi đưa điều kiện chiều dài data > 0
      // return data.map((value, key) => { } )
      // sau đó cho xuất dữ liệu như dưới thoi <key={key} để kiểm tra key để khỏi trùng nhau >
      // còn lại đưa value.id value.user_img thì chắc chắc sẽ xuất ra kết quả
      const image =
        "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
        value.image_user;
      // console.log(image);
      if (value.id_comment == 0) {
        return (
          <>
            <li className="media" key={key}>
              <a className="pull-left" href="#">
                <img
                  // src="../../../public/frontend/images/blog/blog-two.jpg" // path gốc
                  src={image} // path user backend
                  className="media-object"
                  alt=""
                  width="65"
                  height="65"
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
                <button
                  id={value.id}
                  type="submit"
                  className="btn btn-primary"
                  onClick={replyId}
                  href
                >
                  <i className="fa fa-reply" />
                  Replay
                </button>
              </div>
            </li>
            {data.map((value2, key2) => {
              if (value.id == value2.id_comment) {
                return (
                  <>
                    <li className="media second-media" key={key2}>
                      <a className="pull-left" href="#">
                        <img
                          className="media-object"
                          src={image}
                          alt=""
                          width="65"
                          height="65"
                        />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li>
                            <i className="fa fa-user" />
                            {value2.name_user}
                          </li>
                          <li>
                            <i className="fa fa-clock-o" /> 1:33 pm
                          </li>
                          <li>
                            <i className="fa fa-calendar" /> DEC 5, 2013
                          </li>
                        </ul>
                        <p>{value2.comment}</p>
                        <a className="btn btn-primary" href>
                          <i className="fa fa-reply" />
                          Replay
                        </a>
                      </div>
                    </li>
                  </>
                );
              }
            })}
          </>
        );
      }
    });
  }
}

export default Listcomment;

// <li className="media second-media">
//   <a className="pull-left" href="#">
//     <img className="media-object" src="images/blog/man-three.jpg" alt="" />
//   </a>
//   <div className="media-body">
//     <ul className="sinlge-post-meta">
//       <li><i className="fa fa-user" />Janis Gallagher</li>
//       <li><i className="fa fa-clock-o" /> 1:33 pm</li>
//       <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
//     </ul>
//     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//     <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
//   </div>
// </li>
