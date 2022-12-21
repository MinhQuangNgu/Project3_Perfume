import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp,faEllipsis} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
const InforCommentDetail = ({item,setLoadingAgain,loadingAgain,socket}) => {

    const [trigger,setTrigger] = useState(false);
    const [changecontent,setChangeContent] = useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const contentRef = useRef();
    const likeRef = useRef();
    const [numberLike,setNumberLike] = useState(0);


    const handleDelete = async () => {
        dispatch(isLoading());
        try{
            const res = await axios.delete(`/api/comment/delete/${item?._id}`,{
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

    const handleEdit = () => {
        setChangeContent(true);
        setTrigger(false);
    }

    const handlEditContent = async () => {
        dispatch(isLoading());
        try{
            const res = await axios.put(`/api/comment/update/${item?._id}`,{
                content:contentRef.current.value
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
        setChangeContent(false);
        setLoadingAgain(!loadingAgain);
    }


    const handleLike = () => {
        likeRef.current.classList.toggle("activethumbs");
        if(likeRef.current.classList.contains("activethumbs")){
            setNumberLike(numberLike + 1);
        }
        else{
            setNumberLike(numberLike - 1);
        }
    }

    useEffect(() => {
        const check = item?.like?.every(item => item?.toString() !== auth.user?.id.toString());
        if(!check){
            likeRef.current.classList.add("activethumbs");
        }
        setNumberLike(item?.like?.length);
    },[item]);


    useEffect(() => {
        if(socket){
            if(auth.user){
                if(likeRef.current.classList.contains("activethumbs")){
                    socket.emit("likeComment",{
                        id:auth.user?.id,
                        comment_id:item?._id
                    })
                }
                else{
                    socket.emit('unlikeComment',{
                        id:auth.user?.id,
                        comment_id:item?._id
                    })
                }
            }
        }
    },[socket,numberLike]);

  return (
    <div className='infor-comment-detail-container'>
        <div className='row'>
            <div className='col c-2 m-2 l-1'>
                <div className='infor-comment-detail-user-avatar'>
                    <img src={item?.user?.image} />
                </div>
            </div>
            <div className='col c-10 m-10 l-11'>
                <div className='infor-comment-detail-user-name'>
                    <span>{item?.user?.name}</span>
                </div>
                <div className='infor-comment-detail-user-content'>
                    <p>{item?.content}</p>
                    <div className='infor-comment-detail-user-like-reply'>
                        <span className='infor-link-active' ref={likeRef} style={{cursor:"pointer"}}>{numberLike} <FontAwesomeIcon onClick={handleLike} className='facebook-icon-active-click' icon={faThumbsUp} /></span>
                        <span style={{cursor:"pointer",fontSize:"1.3rem",fontWeight:"700",marginTop:"0.3rem"}}>{moment(item?.createdAt).fromNow()}</span>
                    </div>
                    {(auth.user?.id?.toString() === item?.user?._id?.toString() || auth.user?.rule === 'admin') && 
                    <div onClick={() => setTrigger(!trigger)} className='comment-infor-do-more'>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>}
                    {trigger && (
                        <div className='comment-infor-do-form'>
                            <div onClick={handleEdit} className='comment-infor-do-infor'>
                                Sửa
                            </div>
                            <div onClick={handleDelete} className='comment-infor-do-infor'>
                                Xóa
                            </div>
                        </div>
                    )}
                    {changecontent && (
                        <div className='change-content-container'>
                            <textarea ref={contentRef} defaultValue={item?.content}/>
                            <button onClick={handlEditContent}>Đăng</button>
                            <button onClick={() => setChangeContent(false)} id='change-content-cancel'>Hủy</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default InforCommentDetail