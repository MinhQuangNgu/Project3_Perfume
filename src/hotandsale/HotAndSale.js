import React, { useEffect, useState } from 'react'
import './HotAndSale.css';
import {Link, useLocation, useParams} from 'react-router-dom';
import HomeCard from '../homepage/homegeneral/HomeCard';
import { useDispatch } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import axios from 'axios';
import Paginating from '../paginating/Paginating';
import NavBar from '../kind/NavBar';
const HotAndSale = ({cache}) => {

    const {slug} = useParams();
    const {search} = useLocation();
    const [product,setProduct] = useState([]);
    const [trang,setTrang] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        let here = true;
        const url = slug === 'sale' ? `/api/product${search ? `${search}&reduce=true`: `?reduce=true`}`:`/api/product${search ? `${search}&hot=true`: `?hot=true`}`;
        if(cache.current[url]){
            return setProduct(cache.current[url]);
        }   
        dispatch(isLoading());
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                cache.current[url] = res.data;
                setProduct(res.data);
                dispatch(isSuccess());
            })
            .catch(() => {
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[slug]);
  return (
    <div className='hot-sale-container'>
        <div className='grid wide'>
            <div className='row'>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <div className='product-detail-title'>
                        <span>
                            <Link style={{marginRight:"1rem",color:"black"}} to='/' className='Link'>
                            Home
                            </Link>
                            <span style={{marginRight:"1rem"}}>/</span>
                            <Link style={{marginRight:"1rem",color:"black"}} to='/' className='Link'>
                            Thể Loại
                            </Link>
                            <span style={{marginRight:"1rem"}}>/</span>
                            {slug === 'sale' ? 'SALE' : 'HOT'}
                        </span>
                    </div>
                </div>
                <div className='col c-10 c-o-1 l-12 m-10 m-o-1'>
                    <NavBar trang={trang} cache={cache}/>
                </div>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <div className='hot-and-sale-card-container'>
                        <div className='row'>
                            {product?.product?.map(item => (
                                <HomeCard key={item?._id + "sale"} item={item}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <Paginating setTrang={setTrang} count={product?.count} limit={25}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HotAndSale