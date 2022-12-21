import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import HomeCard from '../homegeneral/HomeCard'
import axios from 'axios';
import { isFailing, isLoading, isSuccess } from '../../redux/slice/authSlice';
import Paginating from '../../paginating/Paginating';
const Besselling = ({cache}) => {

  const [product,setProduct] = useState([]);
  const [trang,setTrang] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    let here = true;
    const url = `/api/product?bestsell=true&limit=15&page=${trang}`
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
  },[trang]);
  return (
    <div className='home-newperfume'>
        <div className='home-newperfume-container'>
            <b></b>
            <span>Nước Hoa Bán Chạy</span>
            <b></b>
        </div>
        <div className='home-perfume-card-container'>
            <div className='row'>
                {product?.product?.map(item => (
                  <HomeCard item={item} key={item._id + "Bestsell"}/>
                ))}
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                  <Paginating setTrang={setTrang} count={product?.count} limit={15}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Besselling