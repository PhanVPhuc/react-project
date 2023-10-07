function MyProduct() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="left-sidebar">
              <h2>Account</h2>
              <div className="panel-group category-products" id="accordian">
                {/*category-productsr*/}
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a href="#">account</a>
                    </h4>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a href="#">My product</a>
                    </h4>
                  </div>
                </div>
              </div>
              {/*/category-products*/}
            </div>
          </div>
          <div className="col-sm-9">
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cart_product">
                      <a href>
                        <img src="images/cart/one.png" alt="" />
                      </a>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <a href>Colorblock Scuba</a>
                      </h4>
                      <p>Web ID: 1089772</p>
                    </td>
                    <td className="cart_price">
                      <p>$59</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <a className="cart_quantity_up" href>
                          {" "}
                          +{" "}
                        </a>
                        <input
                          className="cart_quantity_input"
                          type="text"
                          name="quantity"
                          defaultValue={1}
                          autoComplete="off"
                          size={2}
                        />
                        <a className="cart_quantity_down" href>
                          {" "}
                          -{" "}
                        </a>
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price" />
                    </td>
                    <td className="cart_delete">
                      <a className="cart_quantity_delete" href>
                        <i className="fa fa-times" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="cart_product">
                      <a href>
                        <img src="images/cart/one.png" alt="" />
                      </a>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <a href>Colorblock Scuba</a>
                      </h4>
                      <p>Web ID: 1089772</p>
                    </td>
                    <td className="cart_price">
                      <p>$59</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <a className="cart_quantity_up" href>
                          {" "}
                          +{" "}
                        </a>
                        <input
                          className="cart_quantity_input"
                          type="text"
                          name="quantity"
                          defaultValue={1}
                          autoComplete="off"
                          size={2}
                        />
                        <a className="cart_quantity_down" href>
                          {" "}
                          -{" "}
                        </a>
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price" />
                    </td>
                    <td className="cart_delete">
                      <a className="cart_quantity_delete" href>
                        <i className="fa fa-times" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="cart_product">
                      <a href>
                        <img src="images/cart/one.png" alt="" />
                      </a>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <a href>Colorblock Scuba</a>
                      </h4>
                      <p>Web ID: 1089772</p>
                    </td>
                    <td className="cart_price">
                      <p>$59</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <a className="cart_quantity_up" href>
                          {" "}
                          +{" "}
                        </a>
                        <input
                          className="cart_quantity_input"
                          type="text"
                          name="quantity"
                          defaultValue={1}
                          autoComplete="off"
                          size={2}
                        />
                        <a className="cart_quantity_down" href>
                          {" "}
                          -{" "}
                        </a>
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price" />
                    </td>
                    <td className="cart_delete">
                      <a className="cart_quantity_delete" href>
                        <i className="fa fa-times" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProduct;
