import React, { useEffect, useState } from 'react'

const usePaginating = ({count,limit}) => {

    const total = Math.ceil(count / limit) || 1;

    const [page,setPage] = useState(1);
    const [firstArr,setFirstArr] = useState([]);
    const [lastArr,setLastArr]  = useState([]);

    useEffect(() => {
        const newArr = [...Array(total)].map((i,_i) => _i + 1);
        if(total >= 4){
            if(total - page >= 4){
                const newAr = newArr.slice(page - 1,page + 2);
                setFirstArr(newAr);
                const las = newArr.slice(total - 1);
                setLastArr(las);
            }
            else{
                const newAr = newArr.slice(total - 4);
                console.log(newAr);
                setFirstArr(newAr);
                setLastArr([]);
            }
        }
        else{
            setFirstArr(newArr);
        }
    },[page,count,limit]);


    const activePage = (p) => {
        if(p === page){
            return 'active';
        }
    }

    const jum = (p) => {
        if(p === page){
            return;
        }
        setPage(p);
    }

    const next = () => {
        const pag = Math.min(page + 1,total);
        setPage(pag);
    }
    const prev = () => {
        const pag = Math.max(1,page - 1);
        setPage(pag);
    }

  return {page,next,prev,jum,activePage,firstArr,lastArr,total};
}

export default usePaginating