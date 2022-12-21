import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsis, faTimes} from '@fortawesome/free-solid-svg-icons';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
const UserManagerCard = ({item,loadingAgain,setLoadingAgain}) => {

    const auth = useSelector(state => state.auth);

    const [trigger,setTrigger] = useState(false);
    const [triggerdelete,setTriggerDelete] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteUser = async () => {
        dispatch(isLoading());
        try{
            const res = await axios.delete(`/api/user/delete/${item?._id}`,{
                headers:{
                    token:`Bearer ${auth.user?.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(isSuccess());
            setLoadingAgain(!loadingAgain);
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
    }

  return (
    <div className='col c-10 c-o-1 m-10 m-o-1 l-6'>
            <div className='user-manager-container'>
                <Link className='user-manager-container-link' to={`/user/infor/${item?._id}`}>
                    <div className='user-manager-image'>
                        <img src={item?.image} />
                    </div>
                    <div className='user-manager-infor'>
                        <span className='user-manager-name'>{item?.name} {auth.user?.id === item?._id && '( Bạn )'} {item?.rule === 'admin' && '( Admin )'}</span>
                        <span className='user-manager-email'>Email: {item?.email}</span>
                        <span className='user-manager-address'>Địa Chỉ: {item?.address}</span>
                    </div>
                </Link>
                {auth.user?.id !== item?._id &&
                <div onClick={() => setTrigger(!trigger)} className='user-manager-delete'>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>}
                {trigger && 
                <div onClick={() => {
                    setTriggerDelete(true);
                    setTrigger(!trigger);
                }} className='user-container-delete-form'>
                    Xóa
                </div>}
                {triggerdelete && 
                <div className='user-container-delete-confir'>
                    <div className='user-container-delete-confir-container'>
                        <div className='user-container-delete-confir-icon'>
                            <div onClick={() => {
                                setTriggerDelete(false);
                            }} className='user-container-delete-confir-icon-container'>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                        <div className='user-container-delete-confir-title'>
                            <span>Bạn có thực sự muốn xóa {item?.name} hay không ?</span>
                        </div>
                        <div className='user-container-delete-confir-button'>
                            <button onClick={handleDeleteUser}>Xóa</button>
                            <button onClick={() => setTriggerDelete(false)}>Hủy</button>
                        </div>
                    </div>
                </div>}
            </div>
    </div>
  )
}

export default UserManagerCard