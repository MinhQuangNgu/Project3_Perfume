import React, { useEffect, useState } from 'react'
import './CategaryMobile.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart,faBars,faTimes,faAngleDown,faAngleUp, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import CategaryMobileKind from './CategaryMobileKind';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { isFailing, isSuccess } from '../../redux/slice/authSlice';
import CategaryFindCart from './CategaryFindCart';
const CategaryMobile = ({cache}) => {

  const auth = useSelector(state => state.auth);
  const [productSearch,setProductSearch] = useState();
  const [productFind,setProductFind] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    <div className='categary-mobile-container'>
        <div className='row h_100'>
          <div className='col c-2 m-2'>
            <div className='categary-mobile-bars-container'>
              <label htmlFor='menu' className='categary-mobile-bars'>
                <FontAwesomeIcon style={{color:"white"}} icon={faBars} />
                <span className='categary-mobile-menu-word c-0'>MENU</span>
              </label>
            </div>
          </div>
          <div className='col c-8 m-8 h_100'>
            <div className='categary-mobile-brand'>
              <Link className='categary-mobile-brand-link' to='/'>
                <h1>SCO PERFUME</h1>
                <span>Bảo hành đến giọt cuối cùng</span>
              </Link>
            </div>
          </div>
          <div className='col c-2 m-2 h_100'>
              <div className='categary-mobile-cart-container'>
                <div className='categary-mobile-cart'>
                  <Link className='Link-mobile-cart' to={auth.user ? `/user/infor/${auth.user?.id}` : '/'}>
                    <FontAwesomeIcon icon={faShoppingCart} />  
                  </Link>
                </div>
              </div>
          </div>
        </div>
        <input type='checkbox' hidden id='menu' />
        <label className='categary-mobile-menu'>
          <div className='categary-mobile-menu-close-container'>
            <label htmlFor='menu' className='categary-mobile-menu-close'>
              <FontAwesomeIcon icon={faTimes} />
            </label>
          </div>
          <div className='categary-mobile-menu-search-container'>
            <div className='categary-mobile-menu-search'>
              <input onChange={(e) => setProductSearch(e.target.value)} type='text' placeholder='Tìm kiếm'/>
              <div className='categary-mobile-menu-search-icon'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
            {productFind.length > 0 && (
              <div className='categary-mobile-find-container'>
                <ul className='categary-mobile-find-ul'>
                  {productFind?.map(item => (
                    <CategaryFindCart item={item} key={item?._id + "asadsdnb"}/>
                  ))}
                </ul>
            </div>
            )}
          </div>
          <CategaryMobileKind cache={cache} />
        </label>
        <label htmlFor='menu' className='categary-mobile-menu-turn'></label>
    </div>
  )
}

export default CategaryMobile