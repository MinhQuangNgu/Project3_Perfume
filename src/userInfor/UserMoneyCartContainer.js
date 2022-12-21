import React from 'react'
import UserMoneyCart from './UserMoneyCart'

const UserMoneyCartContainer = ({cart,update,setUpdate,id}) => {

  return (
    <div className='row'>
        {cart?.map(item => (
            <UserMoneyCart id={id} update={update} count={item?.count} setUpdate={setUpdate} key={item?._id} item={item?.user_cart}/>
        ))}
    </div>
  )
}

export default UserMoneyCartContainer