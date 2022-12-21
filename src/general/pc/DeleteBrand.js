import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
const DeleteBrand = () => {

    const [brand,setBrand] = useState([]);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleDeleteBrand = async (item) => {
        dispatch(isLoading());
        try{
            const res = await axios.delete(`/api/brand/delete/${item}`,{
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

    useEffect(() => {
        let here = true;
        dispatch(isLoading());
        axios.get('/api/brand')
            .then(res => {
                if(!here){
                    return;
                }
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
  return (
    <>
        <span className='create-brand-title'>Xóa Brand</span>
        <ul className='brand-list'>
            {brand?.map(item => (
                <li key={item._id + "brand"}>{item.name}
                    <div className='delete-brand-list'>
                        <div onClick={() => handleDeleteBrand(item.slug)} className='delete-brand-container'>
                            Xóa
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </>
  )
}

export default DeleteBrand