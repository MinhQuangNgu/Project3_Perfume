import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { isFailing, isLoading, isLogout } from '../../redux/slice/authSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
import PerfumeBrandMobile from './PefumeBrandMobile';
const CategaryMobileKind = ({cache}) => {

    const auth = useSelector(state => state.auth);

    const [authtrigger,setAuthTrigger] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(isLoading());
        try{
            const res = await axios.post('/api/user/logout',"");
            toast.success(res.data.msg);
            dispatch(isLogout());
            navigate('/login');
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
    }

    const handleChange = () =>{
      navigate(`/user/infor/${auth.user?.id}`);
    }

    const handleChangePassowrd = () => {
      navigate('/user/change_password');
    }

  return (
    <ul className='categary-mobile-menu-kind-container'>
            {auth.user ?
            (<>
            <li onClick={() => setAuthTrigger(!authtrigger)} id='categary-mobile-menu-user-infor'>
                {auth.user.name}
                <img src={auth.user.image} />
                <FontAwesomeIcon className='categary-mobile-menu-kind-hover' icon={!authtrigger ? faAngleDown:faAngleUp} />
            </li>
            {authtrigger && <>
              {auth.user?.rule === 'admin' && <>
            <li>
            <Link style={{fontSize:"800"}} className='categary-mobile-menu-kind' to='/mananger/user/password'>
                Lấy Mật Khẩu
            </Link>
            </li>
            <li>
            <Link style={{fontSize:"800"}} className='categary-mobile-menu-kind' to='/manager/user'>
                Quản Lí Người Dùng
            </Link>
            </li>
            </>}
            <li onClick={handleChange} className='categary-mobile-menu-user-infor'>
                Thông Tin
            </li>
            <li onClick={handleChangePassowrd} className='categary-mobile-menu-user-infor'>
                Đổi Mật Khẩu
            </li>
            <li onClick={handleLogout} className='categary-mobile-menu-user-infor'>
                Đăng Xuất
            </li>
            </>}
            </>):
            <>
            <li>
                <Link className='categary-mobile-menu-kind' to='/login'>
                    Đăng Nhập
                </Link>
            </li>
            <li>
            <Link className='categary-mobile-menu-kind' to='/register'>
                Đăng Ký
            </Link>
            </li>
            </>}
            <PerfumeBrandMobile infor={'Thương Hiệu'} cache={cache}/>
            <PerfumeBrandMobile infor={'Nước Hoa Nam'} kind={'nuoc-hoa-nam'} cache={cache}/>
            <PerfumeBrandMobile infor={'Nước Hoa Nữ'} kind={'nuoc-hoa-nu'} cache={cache}/>

            <li>
              <Link className='categary-mobile-menu-kind' to='/nuoc-hoa-unisex'>
                   Nước Hoa UNISEX
              </Link>
            </li>
            <li>
              <Link className='categary-mobile-menu-kind' to='/nuoc-hoa/top'>
                   TOP {new Date().getFullYear()}
                <div className='categary-mobile-menu-kind-top'>
                    TOP
                </div>
              </Link>
            </li>
            <li>
              <Link className='categary-mobile-menu-kind' to='/nuoc-hoa/sale'>
                  SALE
                <div className='categary-mobile-menu-kind-sale'>
                    SALE
                </div>
              </Link>
            </li>
          </ul>
  )
}

export default CategaryMobileKind