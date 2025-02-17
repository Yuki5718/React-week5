import { useEffect, useState } from 'react';
import { useForm , useWatch } from 'react-hook-form';
import axios from 'axios';

const { VITE_BASE_URL , VITE_API_PAHT } = import.meta.env

function App() {

  const [ products , setProducts ] = useState([])
  const [ cartData , setCartData ] = useState([])
  const [ tempProduct , setTempProduct ] = useState({})

  const getProducts = async() => {
    try {
      const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/products/all`)
      setProducts(res.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( ()=> {
    getProducts();
  },[])

  const {
    register,
    handleSubmit,
    control,
  } = useForm()

  const watchForm = useWatch({
    control
  })

  useEffect(()=> {
    console.log(watchForm)
  },[watchForm])

  const handleInputCart = async(e , product) => {
    e.preventDefault()
    const data = { 
      data : {
        "product_id": product.id,
        "qty": 1
      }
    }
    try {
      const res = await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/cart`, data)
      getCartData()
    } catch (error) {
      console.log(error)
    }
  }

  const getCartData = async() => {
    const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/cart`)
    const cartData = res.data.data
    setCartData(cartData)
  }

  useEffect(() => {
    getCartData()
  },[])

  // console.log(useForm())

  return (
    <>
      { products.length === 0 ? (<></>) : (
        <>
          <div className="container mw-100 p-5 mt-5">
            <div className="row">
              <div className="col-8">
                <div className="row g-3">
                  {products.map((product)=>(
                    <div key={product.id} className="col-3">
                      <div className="card h-100">
                        <img className="card-img-top" src={product.imageUrl} alt="Card image cap" style={{height:300}} />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title fw-bold">{product.title}</h5>
                          <p className="card-text">{product.content}</p>
                          <div className="d-flex justify-content-between mt-auto">
                            <a href="#" className="btn btn-primary w-100 me-2">查看細節</a>
                            <a href="#" className="btn btn-primary w-100" onClick={(e)=>handleInputCart(e , product)}>點我下單</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
              <div className="col-4">
                <div>
                  <h5 className="text-center fw-bold">購物車</h5>
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th scope="col" className="w-25">產品圖片</th>
                        <th scope="col">產品名稱</th>
                        <th scope="col">單價</th>
                        <th scope="col" className="text-center">數量</th>
                        <th scope="col" className="text-end">小計</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData.carts.map((cart)=>(
                        <tr key={cart.id}>
                          <td>
                            <img src={cart.product.imageUrl} className="img-fluid" style={{height:100}} alt="" />
                          </td>
                          <td>{cart.product.title}</td>
                          <td>${cart.product.price}</td>
                          <td>
                            <div className="d-flex justify-content-between">
                              <button className="btn btn-secondary py-0 px-1"><i className="bi bi-plus" /></button>
                                {cart.qty}
                              <button className="btn btn-secondary py-0 px-1"><i className="bi bi-dash" /></button>
                            </div>
                          </td>
                          <td className="text-end">${cart.total}</td>
                          <td className="text-end"><button type="button" className="btn btn-danger">刪除</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr />
                <div>
                  <h5 className="text-center fw-bold">填寫表單</h5>
                  <form>
                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="username" className="form-label">購買人</label>
                        <input type="text" id="username" className="form-control" {...register("username")} />
                      </div>
                      <div className="col-6">
                        <label htmlFor="tel" className="form-label">連絡電話</label>
                        <input type="tel" id="tel" className="form-control" {...register("tel")} />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" id="email" className="form-control" {...register("email")} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">地址</label>
                      <input type="text" id="address" className="form-control" {...register("address")} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">留言</label>
                      <textarea name="message" id="message" className="form-control" rows={3} {...register("message")} />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary">送出</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default App
