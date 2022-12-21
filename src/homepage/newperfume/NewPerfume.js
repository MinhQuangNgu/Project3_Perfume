import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HomeCard from '../homegeneral/HomeCard';
import './NewPerfume.css';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { isFailing, isLoading, isSuccess } from '../../redux/slice/authSlice';
import Paginating from '../../paginating/Paginating';
const NewPerfume = ({cache}) => {

    const auth = useSelector(state => state.auth);
    const [product,setProduct] = useState([]);
    const dispatch = useDispatch();
    const [trang,setTrang] = useState(1);

    useEffect(() => {
        let here = true;
        const url = `/api/product?limit=15&page=${trang}`;
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
            <span>Nước Hoa Mới</span>
            <b></b>
        </div>
        <div className='home-perfume-card-container h_100'>
            <div className='row h_100'>
                {auth.user?.rule === 'admin' && (
                    <div className='col c-6 m-6 l-2-4'>
                        <div className='home-card-container-create'>
                            <Link to='/product/create' className='product-create-link'>
                                Tạo card nước hoa
                            </Link>
                        </div>
                    </div>
                )}
                {product?.product?.map(item => (
                    <HomeCard item={item} key={item._id + "Product"}/>
                ))}
                <div className='col c-10 c-o-1 m-o-1 m-10 l-12'>
                    <Paginating setTrang={setTrang} count={product?.count} limit={15}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewPerfume