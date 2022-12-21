import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { isFailing, isLoading, isSuccess } from '../../redux/slice/authSlice';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
const CreateBrand = () => {

    const name = useRef("");
    const kindman = useRef();
    const kindwoman = useRef();
    const kindboth = useRef();
    const dispatch = useDispatch();
    const [image,setImage] = useState("https://res.cloudinary.com/dqbrxkux1/image/upload/v1650375524/Avatar/slmwykpmqerrgu6pl8kc.webp");
    const Image = useRef();
    const auth = useSelector(state => state.auth);


    const handleCreateBrand = async () => {
        if(!name.current.value || !Image.current.files[0]){
            return toast.error("Vui lòng điền đầy đủ thông tin.");
        }
        const reply = [];
        if(kindman.current.checked){
            reply.push('nuoc-hoa-nam');
        }
        if(kindwoman.current.checked){
            reply.push('nuoc-hoa-nu');
        }
        if(kindboth.current.checked){
            reply.push('nuoc-hoa-unisex');
        }
        const formData = new FormData();
        formData.append('file',Image.current.files[0]);
        formData.append('upload_preset','cloudcuachihuyen');
        let Ima;
        dispatch(isLoading());
        try{
            const res = await axios.post('https://api.cloudinary.com/v1_1/cloudcuachihuyen/image/upload',formData);
            Ima = res.data.url;
            dispatch(isSuccess());
        }
        catch(err){
            dispatch(isFailing());
        }
        dispatch(isLoading());
        try{
            const res = await axios.post('/api/brand/create',{
                name:name.current.value,
                reply,
                image:Ima
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
        name.current.value = "";
    }

    const handleChange = (e) => {
        const ul = URL.createObjectURL(e);
        setImage(ul);
    }

  return (
    <>
    <span className='create-brand-title'>Tạo Brand</span>
    <div className='create-brand-image'>
        <div className='image-container-brand'>
        <img src={image} />
            <div className='create-brand-edit'>
                <label htmlFor='brand-image'>
                    Ảnh <FontAwesomeIcon style={{marginLeft:"0.5rem"}} icon={faImage} />
                </label>
                <input onChange={(e) => handleChange(e.target.files[0])} ref={Image} id='brand-image' hidden type='file' />
            </div>
        </div>
    </div>
    <div className='create-brand-name'>
        <input defaultValue={name.current.value} ref={name} type='text' placeholder='Tên Brand'/>
    </div>
    <div className='create-brand-reply'>
        <div className='create-brand-reply-number'>
            <label>Nước Hoa Nam</label>
            <input ref={kindman} type='checkbox' />
        </div>
        <div className='create-brand-reply-number'>
            <label>Nước Hoa Nữ</label>
            <input ref={kindwoman} type='checkbox' />
        </div>
        <div className='create-brand-reply-number'>
            <label>Nước Hoa Unisex</label>
            <input ref={kindboth} type='checkbox' />
        </div>
    </div>
    <div className='create-brand-button'>
        <button onClick={handleCreateBrand}>Tạo Brand</button>
    </div>
    </>
  )
}

export default CreateBrand