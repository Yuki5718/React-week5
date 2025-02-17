function ProductsList({products,handleAddCart}) {
  return (<>
    {products.map((product)=>(
      <div key={product.id} className="col-3">
        <div className="card h-100">
          <img className="card-img-top" src={product.imageUrl} alt="Card image cap" style={{height:300}} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold">{product.title}</h5>
            <p className="card-text">{product.content}</p>
            <div className="d-flex justify-content-between mt-auto">
              <a href="#" className="btn btn-primary w-100 me-2">查看細節</a>
              <a href="#" className="btn btn-primary w-100" onClick={(e)=>handleAddCart(e , product.id)}>點我下單</a>
            </div>
          </div>
        </div>
      </div>
    ))}</>
  )
}

export default ProductsList