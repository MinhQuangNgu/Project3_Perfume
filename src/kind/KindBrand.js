import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import HomeCard from '../homepage/homegeneral/HomeCard';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import './KindBrand.css';
import Paginating from '../paginating/Paginating';
import NavBar from './NavBar';
const KindBrand = ({cache}) => {

    const {slug} = useParams();
    const {search} = useLocation();
    const [trang,setTrang] = useState(1);
    const [product,setProduct] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let here = true;
        const url = slug === 'all' ? `/api/product${search}`:`/api/product${search ? `${search}&categary=${slug}` : `?categary=${slug}`}`;
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
    },[slug,search]);
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
                            {slug === 'all' ? 'Nước Hoa' : slug ==='nuoc-hoa-nam' ? "Nước Hoa Nam": slug ==='nuoc-hoa-nu' ? 'Nước Hoa Nữ' : slug ==='nuoc-hoa-unisex' && 'Nước Hoa Unisex'}
                            </Link>
                        </span>
                    </div>
                </div>
                <div className='col c-10 c-o-1 l-12 m-10 m-o-1'>
                    <NavBar trang={trang} cache={cache}/>
                </div>
                <div className='col c-10 c-o-1 m-o-1 m-10 l-12'>
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

export default KindBrand