import React, { useEffect, useRef, useState } from 'react'
import './HomeCard.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { isFailing, isLoading, isLogin, isSuccess } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddToCart from './AddToCart';
const HomeCard = ({item}) => {

    const [deleteform,setDeleteForm] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [stringPrice,setStringPrice] = useState("0");
    const [reducePrice,setReducePrice] = useState("0");

    const imageRef = useRef();

    const handleDelete = async () => {
        dispatch(isLoading());
        try{
            const res = await axios.delete(`/api/product/delete/${item?.slug}`,{
                headers:{
                    token:`Bearer ${auth.user.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(isSuccess());
            setDeleteForm(false);
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
    }

    useEffect(() => {
        if(item){
            let str = "";
            let num = 0;
            for (let i = item?.price.toString().length - 1; i >= 0; i--){
                if(num === 3){
                   str = str + '.';
                   num = 0;
                }
                str = str + item?.price.toString().charAt(i);
                num++;
             }
             let str2 = '';
             for (let i = str.length - 1; i>=0 ;i--){
                str2 = str2 + str.charAt(i);
             }
             setStringPrice(str2);
        }
    },[item]);

    useEffect(() => {
        if(item && item?.reduce){
            let str = "";
            let num = 0;
            for (let i = item?.reducePrice.toString().length - 1; i >= 0; i--){
                if(num === 3){
                   str = str + '.';
                   num = 0;
                }
                str = str + item?.reducePrice.toString().charAt(i);
                num++;
             }
             let str2 = '';
             for (let i = str.length - 1; i>=0 ;i--){
                str2 = str2 + str.charAt(i);
             }
             setReducePrice(str2);
        }
    },[item]);


    useEffect(() => {
        const img = imageRef.current;

        const obr = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                img.setAttribute('src',img.alt);
                img.classList.add('activeimg');
            }
        })
        if(img){
            obr.observe(img);
        }

        return () => {
            if(img){
                obr.unobserve(img);
            }
        }
    },[]);
  return (
    <div className='col c-4 m-4 l-2-4'>
        <div className='home-card-container'>
            <Link to={`/san-pham/${item?.slug}`} className='Link'>
            <img className='image-card' alt={item?.image} ref={imageRef}  />
            <div className='home-card-detail'>
                <div className='home-card-name'>
                    <span>{item?.title || 'Nước Hoa CAROLINA HERRAN'}A</span>
                </div>
                <div className='home-card-e-name'>
                    <span style={{color:"black"}}>{item?.smallcontent}</span>
                </div>
                <div className='home-card-watch'>
                    <span>{item?.watch} lượt xem</span>
                    <span style={{color:"green"}}>Còn {item?.sold} chai</span>
                </div>
                <div className='home-card-categary'>
                    <span>{item?.categary === 'nuoc-hoa-nam' ? 'Nước Hoa Nam':
                        item?.categary === 'nuoc-hoa-nu' ? 'Nước Hoa Nữ' :
                        item?.categary === 'nuoc-hoa-unisex' && 'Nước Hoa Unisex'}</span>
                </div>
                <div className='home-card-detail-more'>
                    <div className='hot-container'>
                        {item?.hot && 'HOT' || 'Mới'}
                    </div>
                    {item?.bestsell && 
                    <div className='bestsell-container'>
                        Bán Chạy
                    </div>}
                </div>
                {item?.reduce ? 
                <div className='home-card-money-type'>
                    <span className='goc'>{stringPrice}đ</span>
                    <span className='sau'>{reducePrice}đ</span>
                </div>:
                <div className='home-card-money-type-no-reduce'>
                <span className='goc-no-sau'>{stringPrice}đ</span>
            </div>}
            </div>
            {item?.reduce &&
             <div className='home-card-reduce_price'>
                -{item?.percent} %
            </div>}
            </Link>
            {auth.user?.rule === 'admin' && (
                <div className='home-cart-admin'>
                    <button onClick={() => setDeleteForm(true)} className='home-cart-delete'>
                        Xóa
                    </button>
                    <button  className='home-cart-watch'>
                        <Link to={`/san-pham/${item.slug}`} className='home-cart-watch-link'>
                            Xem
                        </Link>
                    </button>
                    <button  className='home-cart-edit'>
                        <Link to={`/product/edit/${item.slug}`} className='home-cart-watch-edit'>
                            Sửa
                        </Link>
                    </button>
                </div>
            )}
            
            <AddToCart id={item?._id}/>

        </div>
        {auth.user?.rule === 'admin' && 
            deleteform && (
            <div className='delete_confir'>
                <div className='confir_form'>
                    <h1>Bạn có thực sự muốn xóa {item?.title} ?</h1>
                    <div className='button_confir'>
                        <button onClick={() => setDeleteForm(false)} className='cancel_btn-confir'>Hủy</button>
                        <button onClick={handleDelete} className='delete_btn-confir'>Xóa</button>
                    </div>
                </div>
            </div>
            )
        }
    </div>
  )
}

export default HomeCard