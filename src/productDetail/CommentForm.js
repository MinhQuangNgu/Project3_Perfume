import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import CommentInfor from './CommentInfor'
import {toast} from 'react-toastify';
import { useParams } from 'react-router-dom';
const CommentForm = ({socket}) => {

    const auth = useSelector(state => state.auth);
    const contentRef = useRef("");
    const {slug} = useParams();

    const handleComment = () => {
        if(!contentRef.current.value){
            return toast.error("Vui lòng điền nội dung.");
        }
        socket.emit("createComment",{
            product_slug:slug,
            content:contentRef.current.value,
            user:auth.user?.id
        });
        contentRef.current.value = "";
    }


  return (
    <div className='comment-form-container'>
        <div className='comment-form-user'>
            <div className='row'>
                {auth.user ? (
                    <>
                    <div className='col c-2 m-2 l-1'>
                    <div className='comment-form-user-avatar'>
                        <img src={auth.user?.image} />
                    </div>
                </div>
                <div className='col c-8 m-8 l-9'>
                    <div className='comment-form-user-content'>
                        <textarea defaultValue={contentRef.current.value} ref={contentRef} placeholder='Nhập nội dung' />
                    </div>
                </div>
                <div className='col c-2 m-2 l-2'>
                    <div className='comment-form-user-button'>
                        <button onClick={handleComment}>Bình Luận</button>
                    </div>
                </div>
                </>
                ):
                <>
                    <div className='col c-10 c-o-1 m-o-1 m-10 l-12'>
                        <div className='not-user'>
                            Vui Lòng Đăng Nhập Để Bình Luận
                        </div>
                    </div>
                </>}
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <CommentInfor socket={socket}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentForm