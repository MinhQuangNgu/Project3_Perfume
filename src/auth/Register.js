import React, { useRef } from 'react'
import './auth.css';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import axios from 'axios';
const Register = () => {

  const email = useRef();
  const name = useRef();
  const password = useRef();
  const re_password = useRef();
  const address = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleRegister = async () => {
    if(!email.current.value || !name.current.value 
      || !address.current.value || !password.current.value
      || !re_password.current.value){
      return toast.error("Vui lòng điền đủ thông tin.");
    }
    if(!validateEmail(email.current.value)){
      return toast.error("Email không chính xác.");
    }
    if(password.current.value < 6){
      return toast.error("Mật khẩu cần dài hơn 6 kí tự.");
    }
    if(password.current.value !== re_password.current.value){
      return toast.error("Mật khẩu không khớp nhau.");
    }
    if(name.current.value.length > 15){
      return toast.error("Tên quá dài.");
    }
    dispatch(isLoading());
    try{
      const res = await axios.post('/api/user/register',{
        email:email.current.value,
        name:name.current.value,
        password:password.current.value,
        address:address.current.value
      })
      toast.success(res.data.msg);
      dispatch(isSuccess());
      navigate('/login');
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
                      <span className='auth_title'>Đăng Ký</span>
                      <div className='auth_input'>
                        <input ref={email} type='text' placeholder='Email'/>
                      </div>
                      <div className='auth_input'>
                        <input ref={name} type='text' placeholder='Tên Tài Khoản'/>
                      </div>
                      <div className='auth_input'>
                        <input ref={address} type='text' placeholder='Địa Chỉ'/>
                      </div>
                      <div className='auth_input'>
                        <input ref={password} type='password' placeholder='Mật Khẩu'/>
                      </div>
                      <div className='auth_input'>
                        <input ref={re_password} type='password' placeholder='Nhập Lại Mật Khẩu'/>
                      </div>
                      <div className='auth_button'>
                        <button onClick={handleRegister}>Đăng Ký</button>
                      </div>
                  </div>
              </div>
              <div className='col c-10 c-o-1 m-10 m-o-1 l-6'>
                <div className='auth_auth-register'>
                    <span className='auth-auth-rule'>Các đặc quyền khi đăng ký tài khoản</span>
                    <ol className='auth-auth-role-list'>
                        <li>Nhận quyền truy cập độc quyền vào các giao dịch và sự kiện.</li>
                        <li>Lưu các mục yêu thích vào danh sách yêu thích của bạn.</li>
                        <li>Lưu các đơn đặt hàng và số theo dõi đơn hàng của bạn.</li>
                    </ol>
                    <span className='auth-auth-service'>Dịch Vụ Khách Hàng</span>
                    <p className='auth-auth-detail'>Bạn cần giúp đỡ? Xin hãy liên hệ<a href="/" target="_blank">: Me</a></p>
                    <span className='auth_auth-register-title'>Bạn đã có tài khoản rồi?</span>
                    <div className='auth_auth-navigate'>
                      <Link className='link-auth' to='/login'>
                          Đăng Nhập
                      </Link>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Register