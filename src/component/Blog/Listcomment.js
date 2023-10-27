function Listcomment(props) {
  //   console.log(props.data);
  const commentData = props.data;
  console.log(commentData);
  if (Object.keys.length > 0) {
    return (
      <li className="media">
        <a className="pull-left" href="#">
          {/* <img className="media-object" src={commentData.image_user} alt="" />
           */}

          <img
            // src="../../../public/frontend/images/blog/blog-two.jpg"
            src={commentData.image_user}
            className="media-object"
            alt=""
          />
        </a>
        <div className="media-body">
          <ul className="sinlge-post-meta">
            <li>
              <i className="fa fa-user" />
              {commentData.name_user}
            </li>
            <li>
              <i className="fa fa-clock-o" /> 1:33 pm
            </li>
            <li>
              <i className="fa fa-calendar" /> DEC 5, 2013
            </li>
          </ul>
          <p> {commentData.comment} </p>
          <a className="btn btn-primary" href>
            <i className="fa fa-reply" />
            Replay
          </a>
        </div>
      </li>
    );
  }
}

export default Listcomment;
