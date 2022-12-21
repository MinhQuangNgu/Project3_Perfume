import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { isFailing, isLoading, isSuccess } from '../../redux/slice/authSlice';

const AddToCart = ({id}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleAddToCart = async () => {
        dispatch(isLoading());
        try{
            const res = await axios.put('/api/user/update/me',{
                cart:{
                    user_cart:id,
                    count:1
                }
            },{
                headers:{
                    token:`Bearer ${auth.user?.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(isSuccess());
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
    }
  return (
    <div onClick={handleAddToCart} className='button-add-cart'>
        <button>Thêm Vào Rỏ Hàng</button>
    </div>
  )
}

export default AddToCart