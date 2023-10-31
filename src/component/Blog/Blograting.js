import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

function Blograting(props) {
  const navigate = useNavigate();
  const flag = JSON.parse(localStorage.getItem("Flag"));
  const userData = JSON.parse(localStorage.getItem("Userdata"));
  const [rating, setRating] = useState(0);
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        "http://localhost/laravel8/laravel8/public/api/blog/rate/" + params.id
      )
      .then((response) => {
        // setRating(response.data);
        console.log(response.data.data);
        // handle logic
        // trung bình + = a+b+c+..+n / tổng số lượng rate hiện có .

        // ta có sum =0 thì sau đó phải đưa điều kiện chạy mảng Object.keys(response.data.data).length > 0
        // tiếp đến chạy hàm map cho object như dưới khai báo key,index để đưa phép tính sum = sum + số điểm rate và nó sẽ chạy = hàm map ( tương tự hàm for)
        // xong xuôi thì ghé xuống dưới tính tbc = sum / số lượng rate (Object.keys(response.data.data).length)
        // gán setRating(sum) để setRating đưa giá trị lên và đưa vào rating để xuất ra màn hình

        let sum = 0;
        if (Object.keys(response.data.data).length > 0) {
          Object.keys(response.data.data).map((key, index) => {
            sum = sum + response.data.data[key]["rate"];
          });
          sum = sum / Object.keys(response.data.data).length;
        }
        console.log(sum);
        setRating(sum);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function changeRating(newRating, name) {
    setRating(newRating);

    let accessToken = userData.data.token;

    // prettier-ignore
    let config = {
      // làm việc với config token
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        " Accept": "application/json",
      },
    };

    // khai báo formData để khi đưa dữ liệu vào 1 form cho be xử lí
    const formData = new FormData();
    formData.append("user_id", userData.data.Auth.id);
    formData.append("blog_id", params.id);
    formData.append("rate", newRating);

    //  handle api
    // post api để xử lí
    // phải post cả url , formData , config
    axios
      .post(
        "http://localhost/laravel8/laravel8/public/api/blog/rate/" + params.id,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        // setRating(res.data);
      });
    if (flag) {
      console.log("GUD");
      console.log(rating);
      console.log(accessToken);
    } else {
      alert("LOGIN FIRST then RATE ME ");
      navigate("/login");
    }
  }

  return (
    <StarRatings
      rating={rating}
      starRatedColor="blue"
      changeRating={changeRating}
      numberOfStars={6}
      name="rating"
    />
  );
}

export default Blograting;
