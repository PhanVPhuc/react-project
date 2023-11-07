function AccountMenuLeft() {
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
                    Account
                  </a>
                </h4>
              </div>
              <div id="update" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul>
                    <li>
                      <a href>Update </a>
                    </li>
                  </ul>
                </div>
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
              <div id="mens" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul>
                    <li>
                      <a href>Product list </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/*/Account*/}
        </div>
      </div>
    </>
  );
}

export default AccountMenuLeft;
