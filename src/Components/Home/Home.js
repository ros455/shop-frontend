import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectProductChange, fetchAllProducts } from '../../store/product';
import { selectProductOnPage, setCurrentPage, selectCurrentPage } from '../../store/productOnPage';
import Paginate from '../Paginate/Paginate.js';
import Product from '../Product/Product';
import SortPanel from '../SortPanel/SortPanel';
import CountProductOnPage from '../CountProductOnPage/CountProductOnPage';
import home from './home.css'
 function Home() {

  const currentPage = useSelector(selectCurrentPage)

  const dispatch = useDispatch();

  let currentCountry = []

  const currentPerPage = useSelector(selectProductOnPage)

  const products = useSelector(selectProductChange)

  const lastProductIndex = currentPage * currentPerPage;
  const firstProductIndex = lastProductIndex - currentPerPage;

  currentCountry = products.slice(firstProductIndex, lastProductIndex)
    
  const paginate = React.useCallback((pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  },[])

  return (
    <>
    <div className='count-product-on-page-wrapper'>
    <CountProductOnPage/>
    </div>
    <div className='sort-panel-home-wrapper'>
          <div className='sort-wrapper'>
          <SortPanel/>
          </div>
      <div className="home-wrapper">
        {currentCountry &&
          currentCountry.map((el) => (
            <div key={el._id} className="home-product-wrapper">
              <Product
                id={el._id}
                title={el.title}
                category={el.category}
                price={el.price}
                imageUrl={el.imageUrl}
                el={el}
                star={el.star}
              />
            </div>
          ))}
      </div>
    </div>
    <div className='home-pagination-wrapper'>
    {products && (
        <Paginate 
        totalCount={products.length} 
        currentPerPage={Number(currentPerPage)}
        paginate={paginate} />
      )}
    </div>

    </>
  );
}

export default React.memo(Home)
