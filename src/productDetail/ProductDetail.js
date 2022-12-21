import React, { useEffect, useRef, useState } from 'react'
import './ProductDetail.css';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import CardDetail from './CardDetail';
import CardMoreDetail from './CardMoreDetail';
import CommentForm from './CommentForm';
import io from 'socket.io-client';
import {url} from '../url/Url';
const ProductDetail = ({cache}) => {

    const {slug} = useParams();
    const auth = useSelector(state => state.auth);
    const [product,setProduct] = useState();
    const [socket,setSocket] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(url);
        setSocket(socket);
        return () => {
            socket.close();
        }
    },[]);

    useEffect(() =>{
        if(socket){
            socket.emit("joinRoom",{
                room:slug,
                username:auth.user?.name,
                userid:auth.user?.id
            });
        }
    },[socket,slug]);

    useEffect(() => {
        let here = true;
        const url = `/api/product/getone/${slug}`;
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
            .catch(err => {
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[slug]);


  return (
    <div className='product-detail-container'>
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
                            {product?.categary}
                            </Link>
                            <span style={{marginRight:"1rem"}}>/</span>
                            {product?.title}
                        </span>
                    </div>
                </div>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <CardDetail product={product}/>
                </div>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <CardMoreDetail product={product}/>
                </div>
                <div className='col c-12 m-12 l-12'>
                    <CommentForm socket={socket}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail