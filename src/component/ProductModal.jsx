import { useEffect, useRef, useState } from 'react'
import { Modal } from 'bootstrap'

function ProductModal({
  tempProduct,
  isModalOpen,
  setIsModalOpen,
  addCart,
  getCartData
}) {
  // Modal建立
  const productModalRef = useRef(null)

  useEffect(()=>{
    // 建立Modal實例
    new Modal(productModalRef.current , {
      backdrop: false, // 取消背景效果及預設點擊背景效果
      keyboard: false, // 取消使用鍵盤操控
    });
    // 取得Modal實例
    // Modal.getInstance(productModalRef.current)
  },[])

  // 寫入Modal資料
  const [ modalData , setModalDate ] = useState(tempProduct)
  useEffect(() => {
    setModalDate(tempProduct)
  },[tempProduct])

  // Modal開啟show
  useEffect(() => {
    if (isModalOpen) {
      Modal.getInstance(productModalRef.current).show()
    }
  },[isModalOpen])
  // Modal關閉hide
  const handleModalClose = () => {
    Modal.getInstance(productModalRef.current).hide()
    setIsModalOpen(false)
    qtyInit()
  }

  const handleAddCart = async(id, qty) => {
    await addCart(id, qty)
    await getCartData()
    qtyInit()
  }

  // 總價(小計)
  const [ totalPrice , setTotalPrice ] = useState(0)
  // 取得下拉選單Ref
  const selectQtyRef = useRef(null)
  // 處理計算總價(小計)
  const handleTotalPriceChange = () => {
    const newTotalPrice = selectQtyRef.current.value * modalData.price
    setTotalPrice(newTotalPrice)
  }

  // 數量資料初始化
  const qtyInit = () => {
    selectQtyRef.current.value = "---請選擇數量---"
    setTotalPrice(0)
  } 

  return (<>
    <div className="modal" ref={productModalRef} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body mb-2">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close" />
            </div>
            <div className="row">
              <div className="col-6">
                <img src={modalData.imageUrl} className="img-fluid" alt=""  />
              </div>
              <div className="col-6">
                <div className="d-flex flex-column h-100">
                  <h5 className="fw-bold d-flex">
                    {modalData.title}
                    <small className="ms-1">
                      <span className="badge bg-primary">{modalData.category}</span>
                    </small>
                  </h5>
                  <p>{modalData.description}</p>
                  <div>
                    <del>原價：${modalData.origin_price}</del>
                    <p className="fw-bold">特價：${modalData.price}</p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="qtySelect" className="form-label">數量：</label>
                    <select id="qtySelect" className="form-select" defaultValue="---請選擇數量---" ref={selectQtyRef}  onChange={handleTotalPriceChange}>
                      <option value="---請選擇數量---" disabled>---請選擇數量---</option>
                      {Array.from({length: 10}).map(( _ , index ) => (
                        <option key={index+1} value={index+1}>{index+1}</option>
                      ))}
                    </select>
                  </div>
                  {/* <hr /> */}
                  <div className="d-flex justify-content-between align-items-baseline fw-bold border-top pt-3">
                    <p className="mb-0">小計</p>
                    <p className="fs-3 mb-0">${totalPrice}</p>
                  </div>
                  <div className="mt-auto text-end">
                    <button type="button" className="btn btn-primary me-2" onClick={()=>{handleAddCart(modalData.id , selectQtyRef.current.value)}}>加入購物車</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>取消</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default ProductModal