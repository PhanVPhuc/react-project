function account() {
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update user</h2>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default account;
