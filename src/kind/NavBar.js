import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {isLoading,isSuccess,isFailing} from '.././redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
const NavBar = ({cache,trang}) => {

    const [product,setProduct] = useState();
    const dispatch = useDispatch();
    const [brand,setBrand] = useState();
    const navigate = useNavigate();


    const yearRef = useRef();
    const priceRef = useRef();
    const newRef = useRef();
    const brandRef = useRef();
    const concentrationRef = useRef();
    const fragrantRef = useRef();
    const volumneRef = useRef();

    useEffect(() => {
        let here = true;
        const url = '/api/product/detail';
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
    },[]);

    useEffect(() => {
        let here = true;
        const url = '/api/brand';
        if(cache.current[url]){
            return setBrand(cache.current[url]);
        }
        dispatch(isLoading());
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                cache.current[url] = res.data.brands;
                setBrand(res.data.brands);
                dispatch(isSuccess());
            })
            .catch(() => {
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[]);


    const handleNavBar = () => {
        const url = {
            born:yearRef.current.value || '',
            sort:priceRef.current.value ? priceRef.current.value:newRef.current.value || '',
            brand:brandRef.current.value || '',
            concentration:concentrationRef.current.value || '',
            volume:volumneRef.current.value || '',
            fragrant:fragrantRef.current.value || '',
            page:trang || 1,
            limit:25
        };
        const exclueFields = ['born','sort','brand','concentration','volume','fragrant','page'];
        exclueFields.forEach(item => {
            if(!url[item]){
                delete(url[item]);
            }
        })
        const newUrl = new URLSearchParams(url);
        navigate(`?${newUrl}`);
    }

  return (
    <div className='hot-and-sale-navbar'>
        <select ref={yearRef} className='hot-and-sale-navbar-number'>
            <option value=''>Năm Phát Hành</option>
            {product?.born.map(item => (
                <option key={item + "born"} value={item}>{item}</option>
            ))}
        </select>
        <select ref={priceRef} className='hot-and-sale-navbar-number-2'>
            <option value=''>Giá</option>
            <option value='-price'>Cao Nhất</option>
            <option value='price'>Thấp Nhất</option>
        </select>
        <select ref={newRef} className='hot-and-sale-navbar-number-3'>
            <option value='-createdAt'>Mới Nhất</option>
            <option value='craetedAt'>Cũ Nhất</option>
        </select>
        <select ref={brandRef} className='hot-and-sale-navbar-number'>
            <option value=''>Thương Hiệu</option>
            {brand?.map(item => (
                <option key={item?.name + "zada"} value={item?.name}>{item?.name}</option> 
            ))}
        </select>
        <select ref={concentrationRef} className='hot-and-sale-navbar-number-3'>
            <option value=''>Nồng Độ</option>
            {product?.concentration.map(item => (
                <option value={item} key={item + "concentration"}>{item}</option>
            ))}
        </select>
        <select ref={fragrantRef} className='hot-and-sale-navbar-number-4'>
            <option value=''>Nhóm Hương</option>
            {product?.fragrant.map(item => (
                <option key={item + "fragrant"} value={item}>{item}</option>
            ))}
        </select>
        <select ref={volumneRef} className='hot-and-sale-navbar-number-3'>
            <option value=''>Thể Tích</option>
            {product?.volume.map(item => (
                <option value={item} key={item + "volumne"}>{item}</option>
            ))}
        </select>
        <button onClick={handleNavBar} className='hot-and-sale-navbar-button'>Chọn</button>
</div>
  )
}

export default NavBar