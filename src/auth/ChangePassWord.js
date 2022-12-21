import React, { useRef } from 'react'
import './ChangePassword.css';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import axios from 'axios';
const ChangePassWord = () => {

    const oldpassword = useRef("");
    const password = useRef("");
    const re_password = useRef("");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    const handleChangePassword = async () => {
        if(!oldpassword.current.value || !password.current.value || !re_password.current.value){
            return toast.error("Vui lòng điền tất cả các ô.");
        }
        if(password.current.value !== re_password.current.value){
            return toast.error("Mật Khẩu Không Trùng Khớp.");
        }
        if(password.current.value.length < 6){
            return toast.error("Mật Khẩu Cần Dài Hơn 6 Kí Tự.");
        }

        dispatch(isLoading());
        try{
            const res = await axios.post('/api/user/change_password',{
                oldpassword:oldpassword.current.value,
                password:password.current.value
            },{
                headers:{
                    token:`Bearer ${auth.user?.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(isSuccess());
            oldpassword.current.value = "";
            password.current.value = "";
            re_password.current.value = "";
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
                        <span>Đổi Mật Khẩu</span>
                    </div>
                    <div className='change-password-input-container'>
                        <label>Nhập Mật Khẩu Cũ:</label>
                        <input defaultValue={oldpassword.current.value} ref={oldpassword} type='password' placeholder='Nhập Mật Khẩu Cũ'/>
                    </div>
                    <div className='change-password-input-container'>
                        <label>Nhập Mật Khẩu Mới:</label>
                        <input defaultValue={password.current.value} ref={password} type='password' placeholder='Nhập Mật Khẩu Mới'/>
                    </div>
                    <div className='change-password-input-container'>
                        <label>Nhập Lại Mật Khẩu:</label>
                        <input defaultValue={re_password.current.value} ref={re_password} type='password' placeholder='Nhập Lại Mật Khẩu Mới'/>
                    </div>
                    <div className='change-password-button'>
                        <button onClick={handleChangePassword}>Xác Nhận</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePassWord