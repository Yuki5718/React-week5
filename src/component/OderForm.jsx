import { useEffect } from 'react';
import { useForm , useWatch } from 'react-hook-form';
import axios from 'axios';

function OderForm({

}) {

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


  return (<>
    <form>
      <div className="row mb-3">
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
      <div className="text-center">
        <button type="submit" className="btn btn-primary">送出訂單</button>
      </div>
    </form>
  </>)
}

export default OderForm