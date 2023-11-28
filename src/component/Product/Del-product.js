function Deleteproduct(props) {
  // xử lí delete product và truyền dữ liệu sang my product
  // kiểm tra là lấy được id của product khi click x chưa
  //  tương tự như bài comment , lấy id khi click vào . có điều nó ngược lại
  //  có khi ta sẽ lấy id ở file MyProduct và truyền sang file delete , sau đó file delete sẽ xử lí
  // ta PHẢI LẤY ID Ở MyProduct TRUYỀN SANG ĐÂY
  // XỬ LÍ BIẾN Ở ĐÂY . mô hình hoá
  //    MyProduct lấy id                                      MyProduct
  //        |  truyền id                                          ^
  //        v                                                     |  truyền dữ liệu còn lại
  //    Deleteproduct ----- xử lí delete product ------>     Deleteproduct trả phần còn lại về
  //
  // lấy id ở file List comment và truyền sang = props
  //  function replyId(e) {
  //    // lấy id ở nút reply tại mỗi cmt đã được xuất ra màn hình
  //    const repId = e.target.id;
  //    // console.log(repId);
  //    props.getidUser(repId);
  //  }
  //
  // nhận được id đã truyền từ Listcomment sau đó gửi nó sang state đc khai báo riêng
  // function getidUser(data) {
  //   // console.log(data);
  //   // ta dùng state const [idUser, getIduser] = useState(""); để đưa idcha ta lấy bên listcmt về để đưa vào idUser
  //   getIduser(data);
  // }
  // url = ....+ user/product/delete/id
  // return (
  //   <a className="cart_quantity_delete" onClick={delProduct}>
  //     <i className="fa fa-times" />
  //   </a>
  // );
}
