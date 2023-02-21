import React from 'react'
import { useDispatch } from 'react-redux'
import { changeProductOnPage, setCurrentPage } from '../../store/productOnPage';
import countproductonpage from './countproductonpage.css'
export default function CountProductOnPage() {
    const dispatch = useDispatch();
    const selectedChange = (e) => {
        dispatch(changeProductOnPage(e.target.value))
        dispatch(setCurrentPage(1))
      }
  return (
    <div className='count-product-on-page'>
    <select onChange={selectedChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
  )
}
