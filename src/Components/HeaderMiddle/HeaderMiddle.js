import React from 'react'
import { Link } from 'react-router-dom'
import headermiddle from './headermiddle.css'
import Basket from '../Basket/Basket'

 function HeaderMiddle({cartLength}) {
  return (
    <div className='header-middle-wrapper'>
        <Link to='/' className='header-middle-logotype-wrapper'>
            BamBook
        </Link>
        <div className='middle-basket'>
        <Basket cartLength={cartLength}/>
        </div>
    </div>
  )
}

export default React.memo(HeaderMiddle)
