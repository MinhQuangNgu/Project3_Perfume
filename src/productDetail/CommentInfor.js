import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import InforCommentDetail from './InforCommentDetail'

const CommentInfor = ({socket}) => {

  const [comment,setComment] = useState([]);
  const [loadingAgain,setLoadingAgain] = useState(false);
  const dispatch = useDispatch();
  const {slug} = useParams();
  useEffect(() => {
    if(comment){
        if(socket){
            socket.on('getComment',infor => {
                setComment([infor,...comment]);
            })
        }
        return () => {
            if(socket){
                socket.off('getComment');
            }
        }
    }
},[socket,comment]);

useEffect(() => {
    if(socket){
        socket.emit("increwatch",{slug});
    }
},[socket,slug]);
  useEffect(() => {
      let here = true;
      const url = `/api/comment/getone/${slug}`;
      dispatch(isLoading());
      axios.get(url)
          .then(res => {
              if(!here){
                  return;
              }
              setComment(res.data.comment);
              dispatch(isSuccess());
          })
          .catch(() => {
              dispatch(isFailing());
          })
      return () => {
          here = false;
      }
  },[slug,loadingAgain]);

  return (
    <div className='comment-infor-user-container'>
        {comment.map(item => (
          <InforCommentDetail socket={socket} loadingAgain={loadingAgain} setLoadingAgain={setLoadingAgain} key={item?._id + "zaka"} item={item}/>
        ))}
    </div>
  )
}

export default CommentInfor