import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
const UserInforCart = ({cart,update,setUpdate}) => {


   const [total,setTotal] = useState("0");
   const auth = useSelector(state => state.auth);
   const [trigger,SetTrigger] = useState(false);
   const dispatch = useDispatch();

   useEffect(() =>{
      let newArr = [];
      if(cart){
         cart.forEach(item => {
            if(item.user_cart?.reduce){
               newArr.push(item.user_cart?.reducePrice);
            }
            else{
               newArr.push(item.user_cart?.price);
            }
         })
      }
      if(newArr.length > 0){
         const count = newArr.reduce((number,item,index) => {
            number = number + item * 1 * cart[index].count;
            return number;
         },0);
         let str = '';
         let num = 0;
         for (let i = count.toString().length - 1; i >= 0; i--){
            if(num === 3){
               str = str + '.';
               num = 0;
            }
            str = str + count.toString().charAt(i);
            num++;
         }
         let str2 = '';
         for (let i = str.length - 1; i>=0 ;i--){
            str2 = str2 + str.charAt(i);
         }
         setTotal(str2);
      }
   },[cart]);


   const handleDeleteAll = async () => {
      dispatch(isLoading());
      try{
         const res = await axios.post('/api/user/deleteall',"",{
            headers:{
               token:`Bearer ${auth.user?.accessToken}`
            }
         })
         toast.success(res.data.msg);
         dispatch(isSuccess());
         setUpdate(!update);
      }
      catch(err){
         toast.error(err.response.data.msg);
         dispatch(isFailing());
      }
      SetTrigger(false);
   }

  return (
    <div className='user-infor-buy-cart'>
       {cart?.map(item => 
         <div key={item?.user_cart?._id + "adsd"} className='user-infor-buy-cart-detail'>
            <span className='user-infor-buy-cart-detail-title'>{item?.user_cart?.title}</span>
            <span className='user-number'>x {item?.count}</span>
            <span>{item?.user_cart?.reduce ? item?.user_cart?.reducePrice : item?.user_cart?.price}đ</span>
         </div>
      )}
       <div className='user-infor-total-price-container'>
          <span>Tổng</span>
          <span>{total} đ</span>
       </div>
       <div className='delete-all-cart'>
          <span onClick={() => SetTrigger(true)} style={{cursor:"pointer"}}>Xóa Tất Cả</span>
       </div>
      {trigger && 
      <div className='trigger-delete-cart'>
          <div className='trigger-delete-cart-container'>
               <div className='trigger-delete-times'>
                  <div onClick={() => SetTrigger(false)} className='trigger-delete-times-container'>
                     <FontAwesomeIcon icon={faTimes} />
                  </div>
               </div>
               <div className='trigger-delete-cart-all-container'>
                  <span>Bạn có thức sự muốn xóa tất cả sản phẩm trong rỏ hàng không?</span>
               </div>
               <div className='trigger-delete-cart-button'>
                  <button onClick={handleDeleteAll}>Xóa</button>
                  <button onClick={() => SetTrigger(false)}>Hủy</button>
               </div>
          </div>
       </div>
       }
    </div>
  )
}

export default UserInforCart