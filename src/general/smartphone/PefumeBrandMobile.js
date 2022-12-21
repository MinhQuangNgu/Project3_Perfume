import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isFailing, isLoading, isSuccess } from '../../redux/slice/authSlice';

const PefumeBrandMobile = ({infor,cache,kind}) => {

    const [trigger,setTriggier] = useState(false); 
    const dispatch = useDispatch();
    const [brand,setBrand] = useState([]);

    useEffect(() => {
        let here = true;
        const url = kind ? `api/brand/${kind}` : '/api/brand';
        if(cache.current[url]){
            return setBrand(cache.current[url]);
        }
        dispatch(isLoading());
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                cache.current[url] = res.data.brands;
                setBrand(res.data.brands);
                dispatch(isSuccess());
            })
            .catch(err => {
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[kind]);
  return (
    <>
    <li className='categary-mobile-menu-kind-brand'>
        <Link className='categary-mobile-menu-kind' to={kind ? `/${kind}` : '/all'}>
        <span>{infor}</span>  
        </Link>
        <FontAwesomeIcon onClick={() => setTriggier(!trigger)} className='categary-mobile-menu-kind-hover' icon={!trigger ? faAngleDown:faAngleUp} />
    </li>
    {trigger && (
        <ul className='categary-mobile-menu-kind-branddetail-container'>
            {brand.map(item => (
                <li key={item?._id + "mobile"}>
                <Link className='Link-branddetail' to={`/brands/${item?.slug}`} >
                    {item?.name}
                </Link>
                </li>
            ))}
        </ul>
    )}
    </>
  )
}

export default PefumeBrandMobile