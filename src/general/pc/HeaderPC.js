import React, { useEffect, useRef, useState } from 'react'
import './HeaderPC.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faShoppingCart, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { isFailing, isLoading, isLogout, isSuccess } from '../../redux/slice/authSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
import CreateBrand from './CreateBrand';
import DeleteBrand from './DeleteBrand';
import ProductSearch from '../../productSearching/ProductSearch';
const HeaderPC = () => {

    const [createbrand,setCreateBrand] = useState(false);
    const [deletebrand,setDeleteBrand] = useState(false);
    const [productSearch,setProductSearch] = useState();

    const [productFind,setProductFind] = useState([]);
    const auth = useSelector(stat => stat.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nameRef = useRef("");


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

    useEffect(() => {
        let here = true;
        if(!productSearch){
            return setProductFind([]);
        }
        if(productSearch){
            const url = `/api/product${productSearch && `?search=${productSearch}`}`;
            axios.get(url)
                .then(res => {
                    if(!here){
                        return;
                    }
                    setProductFind(res.data.product);
                    dispatch(isSuccess());
                })
                .catch(err => {
                    dispatch(isFailing());
                })
        }
        return () => {
            here = false;
        }
    },[productSearch]);



  return (
    <div className='header-pc-container'>
        <div className='row'>
            <div className='col l-3'>
                <div className='header-pc-container-search'>
                    <div className='header-pc-container-search-container'>
                        <input defaultValue={nameRef.current} onChange={(e) => setProductSearch(e.target.value)} type='text' placeholder='Tìm kiếm'/>
                        <div className='header-pc-container-search-container-icon-search'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        {productFind.length > 0 && (
                            <div className='header-pc-find-product'>
                                <ul className='header-pc-find-product-container'>
                                    {productFind?.map(item => (
                                        <ProductSearch setProductFind={setProductFind} key={item?._id + "asdds"} item={item} />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='col l-6'>
                <div className='header-pc-container-slogan'>
                    <p>CAM KẾT CHÍNH HÃNG - HOÀN TIỀN 500% GIÁ TRỊ SẢN PHẨM NẾU PHÁT HIỆN HÀNG FAKE</p>
                </div>
            </div>
            <div className='col l-3'>
                <div className='header-pc-container-auth-cart'>
                    {auth.user ? (
                    <ul className='header-pc-container-auth-cart-ul header-pc-container-auth-hover'>
                        <li className='header-pc-auth_user-infor header-pc-container-auth-cart-ul-li'>
                            <img src={auth.user.image} />
                            {auth.user.name}
                        </li>
                    <li className='header-pc-container-auth-cart-ul-li'>
                        <Link to={`/user/infor/${auth.user?.id}`} className='header-pc-container-link'>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Link>
                    </li>
                    </ul>):
                    <ul className='header-pc-container-auth-cart-ul'>
                        <li className='header-pc-container-auth-cart-ul-li'>
                            <Link to='/register' className='header-pc-container-link'>
                                Đăng Ký
                            </Link>
                        </li>
                        <li className='header-pc-container-auth-cart-ul-li'>
                            <Link to='/login' className='header-pc-container-link'>
                                Đăng Nhập
                            </Link>
                        </li>
                        <li className='header-pc-container-auth-cart-ul-li'>
                            <Link to='/' className='header-pc-container-link'>
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Link>
                        </li>
                    </ul>}
                    {auth.user && 
                    <ul className='header-pc-user-infor-more'>
                        {auth.user?.rule === 'admin' && 
                        <>
                        <li style={{fontSize:"1.3rem",fontWeight:"800"}}  onClick={() => setCreateBrand(true)} className='create-brand-detail'>
                        Tạo Brand
                        </li>
                        <li style={{fontSize:"1.3rem",fontWeight:"800"}}  onClick={() => setDeleteBrand(true)} className='create-brand-detail'>
                        Xóa Brand
                        </li>
                        <li style={{margin:"0"}} className=''>
                            <Link style={{fontSize:"1.3rem",fontWeight:"800"}} className='header-pc-user-link-infor' to='/manager/user'>
                                Quản Lí Người Dùng
                            </Link>
                        </li>
                        <li style={{margin:"0"}} className=''>
                            <Link style={{fontSize:"1.3rem",fontWeight:"800"}} className='header-pc-user-link-infor' to='/mananger/user/password'>
                                Lấy Mật Khẩu
                            </Link>
                        </li>
                        </>}
                        <li style={{margin:"0"}} className=''>
                            <Link className='header-pc-user-link-infor' to={`/user/infor/${auth.user?.id}`}>
                                Thông Tin
                            </Link>
                        </li>
                        <li style={{margin:"0"}} className=''>
                            <Link className='header-pc-user-link-infor' to='/user/change_password'>
                                Đổi Mật Khẩu
                            </Link>
                        </li>
                        <li onClick={handleLogout} style={{margin:"0",fontSize:"1.5rem"}} className=''>
                            Đăng Xuất
                        </li>
                    </ul>}
                </div>
            </div>
        </div>
        {createbrand && (
            <div className='create-brand'>
            <div className='create-brand-container'>
                <div className='create-brand-cancel'>
                    <div onClick={() => setCreateBrand(false)} className='create-brand-cancel-container'>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <CreateBrand />
            </div>
        </div>
        )}
        {deletebrand && (
            <div className='create-brand'>
            <div className='create-brand-container'>
                <div className='create-brand-cancel'>
                    <div onClick={() => setDeleteBrand(false)} className='create-brand-cancel-container'>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <DeleteBrand />
                </div>
            </div>
        )}
    </div>
  )
}

export default HeaderPC