import { useEffect, useState } from 'react';
import { useForm , useWatch } from 'react-hook-form';
import axios from 'axios';

const { VITE_BASE_URL , VITE_API_PAHT } = import.meta.env

function OderForm({

}) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name:"",
      email:"",
      tel:"",
      address:"",
      message:""
    },
    mode: "onTouched"
  })

  const watchForm = useWatch({
    control
  })

  useEffect(()=> {
    console.log(watchForm)
  },[watchForm])

  const defaultOderData = {
    "data": {
      "user": {
        "name": "test",
        "email": "test@gmail.com",
        "tel": "0912346768",
        "address": "kaohsiung"
      },
      "message": "這是留言"
    }
  }

  const onSubmit = ({name, tel, email, address, message}) => {
    const oderData = {
      ...defaultOderData,
      "data": {
        "user": {
          name,
          email,
          tel,
          address
        },
        message
      }
    }
    handleOder(oderData)
  }

  const handleOder = async(data) => {
    try {
      const res = await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/order`, data)
      console.log(res.data.orderId)
      setOderId(res.data.orderId)
    } catch (error) {
      console.log(error)
    }
  }

  const [ oderId , setOderId ] = useState(null)

  const handlePay = async(oderId) => {
    try {
      const res = await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PAHT}/pay/${oderId}`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="name" className="form-label">購買人</label>
          <input type="text" id="name" className={`form-control ${errors.name && "is-invalid"}`} 
          {...register("name", {
            required: {
              value: true,
              message: "*必填欄位"
            }
          })} />
          {errors.name && (<div className="invalid-feedback">{errors?.name?.message}</div>)}
        </div>
        <div className="col-6">
          <label htmlFor="tel" className="form-label">連絡電話</label>
          <input type="tel" id="tel" className={`form-control ${errors.tel && "is-invalid"}`} 
          {...register("tel", {
            required: {
              value: true,
              message: "*必填欄位"
            },
            minLength: {
              value: /^(0[2-8]\d{7}|09\d{8})$/,
              message: "電話不得少於8碼"
            },
          })} />
          {errors.tel && (<div className="invalid-feedback">{errors?.tel?.message}</div>)}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" id="email" className={`form-control ${errors.email && "is-invalid"}`} 
        {...register("email", {
          required: {
            value: true,
            message: "*必填欄位"
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email 格式錯誤"
          }
        })} />
        {errors.email && (<div className="invalid-feedback">{errors?.email?.message}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">地址</label>
        <input type="text" id="address" className={`form-control ${errors.address && "is-invalid"}`} 
        {...register("address", {
          required: {
            value: true,
            message: "*必填欄位"
          }
        })} />
        {errors.address && (<div className="invalid-feedback">{errors?.address?.message}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">留言</label>
        <textarea name="message" id="message" className="form-control" rows={3} {...register("message")} />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">送出訂單</button>
      </div>
    </form>
    <div className="text-center mt-3">
      <a href="#" className="btn btn-success" onClick={()=>handlePay(oderId)}>點擊付款</a>
    </div>
  </>)
}

export default OderForm