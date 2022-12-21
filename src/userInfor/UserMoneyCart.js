import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
const UserMoneyCart = ({item,update,setUpdate,count,id}) => {

  const [trigger,setTrigger] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();


  const handleDeleteCart = async () => {
    dispatch(isLoading());
    try{
      const res = await axios.post(`/api/user/replace/${item?._id}`,"",{
        headers:{
          token:`Bearer ${auth.user?.accessToken}`
        }
      });
      dispatch(isSuccess());
      toast.success(res.data.msg);
      setTrigger(false);
      setUpdate(!update);
    }
    catch(err){
      toast.error(err.response.data.msg);
      dispatch(isFailing());
    }
  }
 
  const handleChange = async (e) => {
    dispatch(isLoading());
    try{
      await axios.post(`/api/user/addcount/${item?._id}`,{
        count:e
      },{
        headers:{
          token:`Bearer ${auth.user?.accessToken}`
        }
      });
      dispatch(isSuccess());
      setUpdate(!update);
    }
    catch(err){
      toast.error(err.response.data.msg);
      dispatch(isFailing());
    }
  }
  
  const [stringPrice,setStringPrice] = useState("0");
  const [reducePrice,setReducePrice] = useState("0");

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

  return (
    <div className='col c-10 c-o-1 m-10 m-o-1 l-6'>
        <div className='user-infor-cart'>
            <div className='user-infor-buy-image'>
                <img src={item?.image} />
            </div>
            <div className='user-infor-buy-detail'>
                <span className='user-infor-buy-detail-title'>{item?.title}</span>
                <div className='user-infor-buy-detail-status'>
                  {item?.hot && (
                    <div className='user-infor-buy-detail-status-number'>
                        HOT
                    </div>
                  )}
                  {item?.bestsell && (
                    <div className='user-infor-buy-detail-status-number'>
                        BÁN CHẠY
                    </div>
                  )}
                  {item?.sale && (
                    <div className='user-infor-buy-detail-status-number'>
                        SALE
                    </div>
                  )}
                  <div className='user-infor-buy-detail-status-number'>
                        MỚI
                  </div>
                </div>
                <div className='user-infor-buy-detail-kind'>
                  <span>Loại: {item?.categary === 'nuoc-hoa-nam' ? "Nước Hoa Nam" : 
                  item?.categary === 'nuoc-hoa-nu' ? "Nước Hoa Nữ" :
                  item?.categary === 'nuoc-hoa-unisex' && 'Nước Hoa Unisex'}</span>
                  <span>Xuất Xứ: {item?.origin}</span>
                  <span>Thể Tích: {item?.volume}</span>
                </div>
                <div className='user-infor-buy-detail-kind-1'>
                  <span>Số Lượng: {item?.sold} chai</span>
                  <span>Mùi Hương: {item?.fragrant}</span>
                </div>
                <div className='user-infor-buy-detail-kind'>
                  <span>Hãng Sản Xuất: {item?.brand}</span>
                </div>
                {item?.reduce ? (
                  <div className='user-infor-buy-detail-price'>
                    <span className='foot-price'>{stringPrice} đ</span>
                    <span className='reduce-price'>{reducePrice} đ</span>
                    <div className='percent-price'>
                      -{item?.percent} %
                    </div>
                </div>
                ):
                <div className='user-infor-detail-price-old-price'>
                    {stringPrice} đ
                </div>}
                <div className='user-infor-buy-detail-price-number'>
                  Số Lượng:
                  <select onChange={(e) => handleChange(e.target.value)} className='user-infor-buy-detail-select'>
                    {[...Array(item?.sold)].map((i,_i) => (
                      <option selected={_i + 1 === count ? 'checked' : ''} key={_i + "za"} value={_i + 1}>{ _i + 1}</option>
                    ))}
                  </select>
                </div>
                {auth.user?.id.toString() === id?.toString() && 
                <div className='user-infor-cancel-detail'>
                  <FontAwesomeIcon onClick={() => setTrigger(true)} icon={faTimes} />
                </div> }
                {trigger && (
                  <div className='user-delete-cart'>
                    <div className='user-delete-container'>
                        <div className='user-delete-icon'>
                            <div onClick={() => setTrigger(false)} className='user-infor-delete-cancel'>
                              <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                        <div className='user-delete-confir-ask'>
                          <span>Bạn có thức sự muốn xóa {item?.title} không?</span>
                        </div>
                        <div className='user-delete-confir-button'>
                          <button onClick={handleDeleteCart}>Xóa</button>
                          <button onClick={() => setTrigger(false)}>Hủy</button>
                        </div>
                    </div>
                  </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default UserMoneyCart