import React, { useEffect, useState } from 'react'
import './Brand.css';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import axios from 'axios';
import HomeCard from '../homepage/homegeneral/HomeCard';
import Paginating from '../paginating/Paginating';
import NavBar from '.././kind/NavBar';
const Brand = ({cache}) => {

    const {slug} = useParams();
    const [brands,setBrands] = useState();
    const [product,setProduct] = useState();
    const dispatch = useDispatch();
    const [trang,setTrang] = useState();
    const {search} = useLocation();

    const brand = new URLSearchParams(search).get("brand");

    useEffect(() => {
        let here = true;
        const url = `/api/brand/getone/${slug}`;
        if(cache.current[url]){
            return setBrands(cache.current[url]);
        }
        dispatch(isLoading());
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                cache.current[url] = res.data.brand;
                setBrands(res.data.brand);
                dispatch(isSuccess());
            })
            .catch(() => {
                dispatch(isFailing());
            })
        
        return () => {
            here = false;
        }

    },[slug]);

    useEffect(() => {
        let here = true;
        if(brands){
            const url = `/api/product${search ? `${search}$brand=${brands?.name}`:`?brand=${brands?.name}&limit=25`}`;
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
                .catch(err => {
                    dispatch(isFailing());
                })
        }
        return () => {
            if(brands){
                here = false;
            }
        }
    },[slug,brands,search]);

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
                            <span>Brand</span>
                            <span style={{margin:"0 1rem"}}>/</span>
                            <span>{brand || brands?.name}</span>
                        </span>
                    </div>
                </div>
                <div className='col c-10 c-o-1 l-12 m-10 m-o-1'>
                    <NavBar  trang={trang} cache={cache}/>
                </div>
                <div className='col c-12 m-12 l-12'>
                    <div className='hot-and-sale-card-container'>
                        <div className='row'>
                            {product?.product?.map(item => (
                                <HomeCard key={item?._id + "sale"} item={item}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <Paginating count={product?.count} limit={25}/>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Brand