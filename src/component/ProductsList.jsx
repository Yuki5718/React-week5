function ProductsList({
  products,
  handleAddCart,
  setTempProduct,
  setIsModalOpen,
  isCartLoading,
  oderId
}) {
  return (<>
    {products.map((product)=>(
      <div key={product.id} className="col-3">
        <div className="card h-100">
          <img className="card-img-top" src={product.imageUrl} alt="Card image cap" style={{height:300}} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold">{product.title}</h5>
            <p className="card-text">{product.content}</p>
            <div className="d-flex justify-content-between mt-auto">
              <button className={`btn btn-primary w-100 me-2 ${isCartLoading && ("disabled")}`}
                onClick={() => {
                  setTempProduct(product)
                  setIsModalOpen(true)
                }} disabled={oderId !== null}>查看細節</button>
              <button className={`btn btn-primary w-100 ${isCartLoading && ("disabled")}`} onClick={() => handleAddCart(product.id)} disabled={oderId !== null}>點我下單</button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>)
}

export default ProductsList