import { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './component/Cart';
import ProductsList from './component/ProductsList';
import OderForm from './component/OderForm';

const { VITE_BASE_URL , VITE_API_PAHT } = import.meta.env

function App() {
  // 取得產品資料
  const [ products , setProducts ] = useState([])
  const getProducts = async() => {
    try {
      const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/products/all`)
      setProducts(res.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  // 取得產品詳細資料
  const [ tempProduct , setTempProduct ] = useState({})

  
  // 取得購物車資料
  const [ cartData , setCartData ] = useState([])
  const getCartData = async() => {
    try {
      const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/cart`)
      const cartData = res.data.data
      setCartData(cartData)
    } catch (error) {
      console.log(error)
    }
  }
  
  // 加入購物車
  const addCart = async(id) => {
    const data = { 
      data : {
        "product_id": id,
        "qty": 1
      }
    }
    try {
      await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/cart`, data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddCart = async(e , id) => {
    e.preventDefault()
    await addCart(id)
    getCartData()
  }

  // 網頁初始化 init
  useEffect(()=>{
    getProducts();
  },[])

  return (
    <>
      { products.length === 0 ? (<></>) : (
        <>
          <div className="container mw-100 p-5 mt-5">
            <div className="row">
              <div className="col-8">
                <div className="row g-3">
                  <ProductsList 
                    products={products}
                    handleAddCart={handleAddCart}
                  />
                </div>
                
              </div>
              <div className="col-4">
                <Cart 
                  getCartData={getCartData}
                  cartData={cartData}
                />
                <hr />
                <div>
                  <h5 className="text-center fw-bold">填寫表單</h5>
                  <OderForm />
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
