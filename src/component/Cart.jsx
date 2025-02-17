import axios from 'axios';
import { useEffect, useState } from 'react';
const { VITE_BASE_URL , VITE_API_PAHT } = import.meta.env

function Cart({
  getCartData,
  cartData,
}) {
  useEffect(() => {
    getCartData();
  },[])
  
  const [ carts , setCarts ] = useState([])
  useEffect(()=>{
    setCarts(cartData.carts)
  },[cartData])

  // 變更數量
  const changeQty = async(clickType, itemId , qty) => {
    let newQty = qty
    switch (clickType) {
      case "plusQty":
        newQty = qty + 1
        break;

      case "minusQty":
        newQty = qty - 1
        break;
    
      default:
        break;
    }

    if ( newQty < 1 ) {
      console.log("不能更少了")
      return
    }

    const data = {
      "data": {
        "product_id": itemId,
        "qty": newQty
      }
    }
    try {
      const res = await axios.put(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/cart/${itemId}`, data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  // 刪除購物車(單一)
  const deleteCartItem = async(itemId) => {
    try {
      const res = await axios.delete(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/cart/${itemId}`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // 刪除購物車(全部)
  const deleteCartAll = async() => {
    try {
      const res = await axios.delete(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/carts`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  } 

  // 處理購物車更新
  const handleUpdateCart = async(e , clickType , id , qty) => {
    e.preventDefault()

    switch (clickType) {
      case "deleteItem":
        await deleteCartItem(id)
        break;

      case "deleteAll":
        await deleteCartAll()
        break;

      case "plusQty":
      case "minusQty":
        await changeQty(clickType , id , qty)
        break;
    
      default:
        break;
    }

    getCartData()
  }

  return (
    <div>
      <h5 className="text-center fw-bold">購物車</h5>
      {carts !== undefined && (
        carts.length < 1 ? (
          <p className="text-center text-primary fw-bold">Oops！購物車裡沒有東西～</p>
      ) : (
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col" className="w-25">產品圖片</th>
              <th scope="col">產品名稱</th>
              <th scope="col">單價</th>
              <th scope="col" className="text-center">數量</th>
              <th scope="col" className="text-end">小計</th>
              <th className="text-end">{carts.length > 1 && (<button type="button" className="btn btn-warning" onClick={(e)=>handleUpdateCart(e , "deleteAll")}>全部刪除</button>)}</th>
            </tr>
          </thead>
          <tbody>
            {carts.length !== 0 && carts.map(({id,qty,total,product})=>(
              <tr key={id}>
                <td>
                  <img src={product.imageUrl} className="img-fluid" style={{height:100}} alt={product.title} />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary py-0 px-1" onClick={(e)=>handleUpdateCart(e , "plusQty" , id , qty)}><i className="bi bi-plus" /></button>
                      {qty}
                    <button className="btn btn-secondary py-0 px-1" onClick={(e)=>handleUpdateCart(e , "minusQty" , id , qty)}><i className="bi bi-dash" /></button>
                  </div>
                </td>
                <td className="text-end">${total}</td>
                <td className="text-end"><button type="button" className="btn btn-danger" onClick={(e)=>handleUpdateCart(e , "deleteItem" , id)}>刪除</button></td>
              </tr>
            ))}
          </tbody>
        </table>))}
    </div>
  )
}

export default Cart