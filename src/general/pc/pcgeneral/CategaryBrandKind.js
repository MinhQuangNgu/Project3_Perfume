import React from 'react'
import {Link} from 'react-router-dom';
const CategaryBrandKind = ({brand}) => {


  return (
    <ul className='categary-pc-kind-hover-container'>
        {brand?.map(item => (
            <li key={item?._id + "brand"} className='categary-pc-kind-hover-container-li'>
                <Link to={`/brands/${item?.slug}`} className='Link-kind-hover'>
                    {item?.name}
                </Link>
            </li>
        ))}
    </ul>
  )
}

export default CategaryBrandKind