import React, { useRef } from 'react'
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import axios from 'axios';
import { isFailing, isLoading, isLogin } from '../redux/slice/authSlice';
const Login = () => {

  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async () => {
    if(!email.current.value || !password.current.value){
      return toast.error("Vui lòng điền đủ thông tin.");
    }
    if(password.current.value.length < 6){
      return toast.error("Mật khẩu sai.");
    }
    dispatch(isLoading());
    try{
      const res = await axios.post('/api/user/login',{
        email:email.current.value,
        password:password.current.value
      });
      toast.success(res.data.msg);
      dispatch(isLogin(res.data));
      navigate('/');
    }
    catch(err){
      toast.error(err.response.data.msg);
      dispatch(isFailing());
    }
  }
  return (
    <div className='grid wide'>
        <div className='auth-container'>
            <div className='row'>
              <div className='col c-10 c-o-1 m-10 m-o-1 l-6'>
                  <div className='auth'>
                      <span className='auth_title'>Đăng Nhập</span>
                      <div className='auth_input'>
                        <input ref={email} type='text' placeholder='Email'/>
                      </div>
                      <div className='auth_input'>
                        <input ref={password} type='password' placeholder='Mật Khẩu'/>
                      </div>
                      <div className='auth_button'>
                        <button onClick={handlelogin}>Đăng Nhập</button>
                      </div>
                  </div>
              </div>
              <div className='col c-10 c-o-1 m-10 m-o-1 l-6'>
                <div className='auth_auth'>
                    <span className='auth-auth-title'>Bạn Là Khách Hàng Mới ?</span>
                    <p className='auth_auth-commit'>Bằng cách tạo tài khoản với SCO PERFUME, bạn sẽ có thể di chuyển qua quy trình<b> thanh toán nhanh hơn, lưu trữ nhiều địa chỉ giao hàng,</b> xem và theo dõi đơn hàng của bạn trong tài khoản của bạn và hơn thế nữa.</p>
                    <div className='auth_auth-navigate'>
                      <Link className='link-auth' to='/register'>
                          Đăng Ký
                      </Link>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login