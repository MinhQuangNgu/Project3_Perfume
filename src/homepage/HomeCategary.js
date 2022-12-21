import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import ImageCategary from './ImageCategary';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
const HomeCategary = ({cache}) => {

  const [product,setProduct] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let here = true;
    const url = '/api/product?bestsell=true&limit=8'
    if(cache.current[url]){
      return setProduct(cache.current[url]);
    }
    dispatch(isLoading());
    axios.get(url)
      .then(res => {
        if(!here){
          return;
        }
        cache.current[url] = res.data.product;
        setProduct(res.data.product);
        dispatch(isSuccess());
      })
      .catch(() => {
        dispatch(isFailing());
      })
    return () => {
      here = false;
    }
  },[]);
  return (<Swiper
    modules={[Navigation, Pagination,Autoplay]}
        navigation
        loop={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false
        }}
        pagination={{ clickable: true }}
  >
    {product.map(item => (
        <SwiperSlide key={item?._id + "z"}>
        <ImageCategary slug={item?.slug} image={item?.image}/>
      </SwiperSlide>
    ))}
  </Swiper>
  )
}

export default HomeCategary