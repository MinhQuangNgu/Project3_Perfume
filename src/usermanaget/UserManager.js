import React, { useEffect, useState } from 'react'
import './UserManager.css';
import UserManagerCard from './UserManagerCard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { isFailing, isLoading, isSuccess } from '../redux/slice/authSlice';
import Paginating from '../paginating/Paginating';
import { useLocation, useNavigate } from 'react-router-dom';
const UserManager = ({cache}) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [user,setUser] = useState();
    const [loadingAgain,setLoadingAgain] = useState(false);
    const [findUser,setFindUser] = useState("");
    const {search} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let here = true;
        const url = `/api/user/getall${search && search}`;
        dispatch(isLoading());
        axios.get(url,{
            headers:{
                token:`Bearer ${auth.user?.accessToken}`
            }
        })
            .then(res => {
                if(!here){
                    return;
                }
                setUser(res.data);
                dispatch(isSuccess());
            })
            .catch(() => {
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[loadingAgain,search]);

    useEffect(() => {
        if(findUser){
            return navigate(`?search=${findUser}`);
        }
        return navigate('');
    },[findUser]);
  return (
    <div className='grid wide'>
        <div className='user-manager'>
            <div className='row'>
                <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                    <div className='user-manager-search-container'>
                        <div className='user-manager-search'>
                            <input onChange={(e) => setFindUser(e.target.value)} type='text' placeholder='Tìm Kiếm' />
                            <div className='user-manager-search-icon'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                    </div>
                </div>
                {user?.user?.map(item => (
                    <UserManagerCard loadingAgain={loadingAgain} setLoadingAgain={setLoadingAgain} key={item._id + "manager"} item={item}/>
                ))}
            </div>
            <div className='col c-10 c-o-1 m-10 m-o-1 l-12'>
                <Paginating count={user?.count} limit={20}/>
            </div>
        </div>
    </div>
  )
}

export default UserManager