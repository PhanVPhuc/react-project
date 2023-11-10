function Addproduct() {
  function handleSubmit() {}
  return (
    <>
      <div className="col-sm-4">
        <div className="signup-form">
          <h2>Create a product !</h2>
          <form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <label> Product name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              required
              // value={} lấy dữ liệu để đưa ra màn hình
              // và sẽ không nhập được dữ liệu nên xài placeholder
              //   onChange={handleInput}
            />
            <label>Product price</label>
            <input
              type="number"
              min="1"
              step="any"
              name="price"
              placeholder="How much is this product ?"
              required
            />
            <label> Category</label>
            <input
              type="text"
              placeholder="Please choose category"
              name="category"
              required
              //   onChange={handleInput}
            />
            <label> Product brand</label>
            <input
              type="text"
              placeholder="Please choose brand"
              name="brand"
              required
              //   onChange={handleInput}
            />
            <label> Sale</label>
            <input
              type="number"
              min="0"
              step="any"
              name="Sale"
              placeholder="sale of ? % "
            />
            <label> Company profile</label>
            <input
              type="text"
              placeholder="Company profile"
              name="company"
              required
              //   onChange={handleInput}
            />

            <label>product image</label>
            <input type="file" required />
            <label> Detail</label>
            <textarea placeholder="Add detail for this product" required />
            <br />
            <button type="submit" className="btn btn-default">
              Add product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addproduct;
