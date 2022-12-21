import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './GetPassword.css';
import axios from 'axios';
import {isFailing, isLoading, isSuccess} from '../redux/slice/authSlice';
import { toast } from 'react-toastify';
const GetPassword = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const emailRef = useRef("");

    const handleGetPassword = async () => {
        if(!emailRef.current.value){
            return toast.error("Vui Lòng Nhập Email.");
        }
        dispatch(isLoading());
        try{    
            const res = await axios.post('/api/user/get_password',{
                email:emailRef.current.value
            },{
                headers:{
                    token:`Bearer ${auth.user?.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(isSuccess());
            emailRef.current.value = "";
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
    }
  return (
    <div className='change-password-container'>
        <div className='grid wide'>
            <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                <div className='change-pasword'>
                    <div className='change-password-title'>
                        <span>Lấy Lại Mật Khẩu</span>
                    </div>
                    <div className='change-password-input-container'>
                        <label>Nhập Email Cần Lấy:</label>
                        <input defaultValue={emailRef.current.value} ref={emailRef} type='text' placeholder='Nhập Email'/>
                    </div>
                    <div className='change-password-button'>
                        <button onClick={handleGetPassword}>Xác Nhận</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GetPassword