import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CategaryBrandKind from './pcgeneral/CategaryBrandKind';
import {isFailing,isLoading, isSuccess} from '../../redux/slice/authSlice';
import axios from 'axios';
const PerfumeNam = ({cache,infor,kind}) => {

    const [brand,setBrand] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let here = true;
        const url = kind ? `/api/brand/${kind}` : `/api/brand`;
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
            .catch(() => {{
                dispatch(isFailing());
            }})
        return () => {
            here = false;
        }
    },[kind]);
  return (
    <li className='categary-brand-kind-hover categary-pc-kind-li'>
        <Link style={{color:"black"}} to={kind ? `/${kind}`:'/all'} className='Link'>
            {infor}
            <FontAwesomeIcon style={{marginLeft:"0.7rem",fontSize:"1.4rem"}} icon={faAngleDown} />
        </Link>
        <CategaryBrandKind brand={brand}/>
    </li>
  )
}

export default PerfumeNam