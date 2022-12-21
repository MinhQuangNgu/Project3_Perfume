import React, { useEffect } from 'react'
import './Paginating.css';
import {faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import usePaginating from './usePaginating';
const Paginating = ({count,limit,setTrang}) => {

    const {page,next,prev,jum,activePage,firstArr,lastArr} = usePaginating({count:count,limit:limit ? limit : 15});

    useEffect(() => {
        if(setTrang){
            setTrang(page);
        }
    },[page]);

  return (
    <div className='pagination'>
        <div onClick={prev} className='pagination-container'>
            <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        {firstArr?.map(item => (
            <div key={item + "ad"} onClick={() => jum(item)} className={`pagination-container ${activePage(item)}`}>
            {item}
            </div>
        ))}
        {lastArr.length > 0 && 
        <div className={`pagination-container`}>
        ...
        </div>}
        {lastArr.length > 0 && 
        lastArr.map(item => (
        <div key={item + "ad"} onClick={() => jum(item)} className={`pagination-container ${activePage(item)}`}>
            {item}
        </div>
        ))
        }
        <div onClick={next} className='pagination-container'>
            <FontAwesomeIcon icon={faAngleRight} />
        </div>
    </div>
  )
}

export default Paginating