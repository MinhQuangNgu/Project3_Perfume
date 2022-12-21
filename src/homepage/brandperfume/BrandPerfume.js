import React, { useEffect, useState } from 'react'
import BrandCard from './BrandCard'
import {useDispatch} from 'react-redux';
import axios from 'axios';
const BrandPerfume = ({cache}) => {

  const [brand,setBrand] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let here = true;
    const url = '/api/brand';
    if(cache.current[url]){
      return setBrand(cache.current[url]);
    }
    axios.get(url)
      .then(res => {
        if(!here){
          return;
        }
        cache.current[url] = res.brands;
        setBrand(res.data.brands);
      })
    return () => {
      here = false;
    }
  },[]);


  return (
    <div className='home-newperfume'>
        <div className='home-newperfume-container'>
            <b></b>
            <span>Thương Hiệu Nước Hoa</span>
            <b></b>
        </div>
        <div className='home-brand-card-container'>
            <div className='row'>
                {brand?.map(item => (
                  <BrandCard key={item?._id + "brandsz"} item={item}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BrandPerfume