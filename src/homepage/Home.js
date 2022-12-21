import React from 'react'
import './Home.css';
import HomeCategary from './HomeCategary';
import {Link} from 'react-router-dom';
import NewPerfume from './newperfume/NewPerfume';
import Besselling from './bestselling/Besselling';
import BrandPerfume from './brandperfume/BrandPerfume';
import Commitment from './commitment/Commitment';
const Home = ({cache}) => {
  return (
    <div className='home-container'>
      <div className='grid wide'>
          <div className='row'>
              <div className='col c-10 c-o-1 l-7 m-7'>
                  <HomeCategary cache={cache}/>
              </div>
              <div className='col c-8 c-o-2 m-5 l-5'>
                <div className='home-kind-nam'>
                    <div className='home-kind-nam-link'>
                      <Link className='Link-kind-nam' to='/nuoc-hoa-nu'>
                        NƯỚC HOA NỮ
                      </Link>
                    </div>
                </div>
                <div className='home-kind-nu'>
                    <div className='home-kind-nam-link'>
                      <Link className='Link-kind-nam' to='/nuoc-hoa-nam'>
                        NƯỚC HOA NAM
                      </Link>
                    </div>
                </div>
              </div>
              <div className='col c-12 m-12 l-12'>
                <NewPerfume cache={cache}/>
                <Besselling cache={cache}/>
                <BrandPerfume cache={cache}/>
                <Commitment />
              </div>
          </div>
      </div>
    </div>
  )
}

export default Home