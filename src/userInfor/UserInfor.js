import React, { useEffect, useRef, useState } from 'react'
import './UserInfor.css';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsis,faImage} from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify';
import UserInforCart from './UserInforCart';
import UserMoneyCartContainer from './UserMoneyCartContainer';
import Paginating from '../paginating/Paginating';
const UserInfor = () => {

    const auth = useSelector(state => state.auth);
    const [trigger,settrigger] = useState(false);
    const [triggerEdit,settriggerEdit] = useState(false);
    const [update,setUpdate] = useState(false);
    const [changeAvatar,setChangeAvatar] = useState();
    const imageRef = useRef();
    const userName = useRef();
    const userAddress = useRef();
    const {id} = useParams();
    const [user,setUser] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        let here = true;
        const url = `/api/user/getone/${id}`;
        dispatch(isLoading());
        axios.get(url,{
            headers:{
                token:`Bearer ${auth.user?.accessToken}`
            }
        })
            .then(res => {{
                if(!here){
                    return;
                }
                setUser(res.data.user);
                dispatch(isSuccess());
            }})
            .catch(() => {
                dispatch(isFailing());
                toast.error("Xin lỗi bạn không thể truy cập vào đường dẫn này.");
                navigate('/');
            })
        return () => {
            here = false;
        }
    },[update,id]);

    const handleChange = async () => {
        if(!userName.current.value || !userAddress.current.value){
            return toast.error("Không được để trống ô.");
        }
        let avatar;
        const formData = new FormData();
        formData.append('file',imageRef.current.files[0]);
        formData.append("upload_preset","cloudcuachihuyen");
        dispatch(isLoading());
        try{
            const res = await axios.post("https://api.cloudinary.com/v1_1/cloudcuachihuyen/image/upload",formData);
            avatar = res.data.url;
            dispatch(isSuccess());
        }
        catch(err){
            dispatch(isFailing());
        }
        dispatch(isLoading());
        try{
            const res = await axios.put('/api/user/update',{
                image:avatar,
                name:userName.current.value,
                address:userAddress.current.value
            },{
                headers:{
                    token:`Bearer ${auth.user?.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(isSuccess());
            setUpdate(!update);
        }
        catch(err){
            toast.error(err.response.data.msg);
            dispatch(isFailing());
        }
        
        settrigger(false);
        settriggerEdit(false);

    }

    const handleChangeAvatar = (e) => {
        const url = URL.createObjectURL(e);
        setChangeAvatar(url);
    }

  return (
    <div className='grid wide'>
        <div className='user-infor-detail-container'>
            <div className='row'>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <div className='row'>
                        <div className='col c-12 m-12 l-6'>
                            <div className='user-infor-detail'>
                                <div className='user-infor-detail-img-container'>
                                    <img src={changeAvatar || user?.image} />
                                    {trigger && 
                                    <div className='user-infor-detail-change-avatar'>
                                        <input onChange={(e) => handleChangeAvatar(e.target.files[0])} ref={imageRef} id='change-avatar-user' hidden type='file' />
                                        <label className='change-avatar-label' htmlFor='change-avatar-user'>Chọn Ảnh
                                            <FontAwesomeIcon style={{marginLeft:"0.5rem"}} icon={faImage} />
                                        </label>
                                    </div>}
                                </div>
                                <div className='user-infor-detail-infor-container'>
                                    <span>{user?.name}</span>
                                    <span>Địa Chỉ: {user?.address}</span>
                                    <span>Email: {user?.email}</span>
                                </div>
                                {auth.user?.id === user?._id && 
                                <div onClick={() => settriggerEdit(!triggerEdit)} className='user-infor-detail-edit'>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>}
                                {triggerEdit && 
                                <div onClick={() => {
                                    settrigger(true);
                                    settriggerEdit(false);
                                }} className='user-infor-detail-edit-form'>
                                    Sửa
                                </div>}
                                {trigger && 
                                <div className='user-infor-detail-edit-container'>
                                    <div className='user-infor-detail-edit-name'>
                                        <label>Tên:</label>
                                        <input ref={userName} defaultValue={user?.name} type='text' placeholder='Nhập Tên Mới'/>
                                    </div>
                                    <div className='user-infor-detail-edit-adress'>
                                        <label>Địa Chỉ:</label>
                                        <input ref={userAddress} defaultValue={user?.address} type='text' placeholder='Nhập Địa Chỉ'/>
                                    </div>
                                    <div className='user-infor-detail-edit-button'>
                                        <button onClick={handleChange}>Đồng Ý</button>
                                        <button onClick={() => settrigger(false)}>Hủy</button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className='col c-10 c-o-1 m-10 m-o-1 l-6'>
                            <UserInforCart update={update} setUpdate={setUpdate} cart={user?.cart}/>
                        </div>
                        <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                            <UserMoneyCartContainer id={user?._id} update={update} setUpdate={setUpdate} cart={user?.cart}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
            <Paginating count = {user?.cart.length} limit={20}/>
        </div>
    </div>
  )
}

export default UserInfor