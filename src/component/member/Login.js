import { Link } from "react-router-dom";

function Login() {
  return (
    <section id="form">
      {/*form*/}
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
              {/*login form*/}
              <h2>Login to your account</h2>
              <form action="#">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email Address" />
                <span>
                  <input type="checkbox" className="checkbox" />
                  Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">
                  Login
                </button>
                <p>Dont have account ? Click the button below</p>
                <button type="click" className="btn btn-default">
                  <Link to="/Register"> Register</Link>
                </button>
              </form>
            </div>
            {/*/login form*/}
          </div>
        </div>
      </div>
    </section>
    //form
  );
}

export default Login;
