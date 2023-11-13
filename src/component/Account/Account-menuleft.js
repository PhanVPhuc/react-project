import { Link, useNavigate } from "react-router-dom";
import Addproduct from "../Product/Add-product";

function AccountMenuLeft() {
  const flag = JSON.parse(localStorage.getItem("Flag"));
  const navigate = useNavigate();
  if (flag) {
    return (
      <>
        <div className="col-sm-3">
          <div className="left-sidebar">
            <h2>Account</h2>
            <div className="panel-group category-products" id="accordian">
              {/*category-productsr*/}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordian"
                      href="#update"
                    >
                      <span className="badge pull-right">
                        <i className="fa fa-plus" />
                      </span>
                      Account Update
                    </a>
                  </h4>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordian"
                      href="#products"
                    >
                      <span className="badge pull-right">
                        <i className="fa fa-plus" />
                      </span>
                      My products
                    </a>
                  </h4>
                </div>
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <Link
                      to="/account/add-product"
                      data-toggle="collapse"
                      data-parent="#accordian"
                      href="#products"
                    >
                      <span className="badge pull-right">
                        <i className="fa fa-chevron-right"></i>
                      </span>
                      Add products
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
            {/*/Account*/}
          </div>
        </div>
      </>
    );
  } else {
    alert("Login first");
    navigate("/login");
  }
}

export default AccountMenuLeft;
