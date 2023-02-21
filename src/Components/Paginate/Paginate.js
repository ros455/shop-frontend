import React from 'react'
import pagination from './pagination.css'
import {BiFirstPage,BiLastPage} from 'react-icons/bi'
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import Pagination from "react-js-pagination";
function Paginate({totalCount,currentPerPage,paginate}) {
  const [activePage, setActivePage] = React.useState(1);
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalCount /currentPerPage); i++) {
        pageNumber.push(i)
      }

      const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        paginate(pageNumber)
        window.scrollTo( 0, 10 );
      }
      
  return (
    <>
        <Pagination
          firstPageText={<BiFirstPage className='pagination-switch-button'/>}
          lastPageText={<BiLastPage className='pagination-switch-button'/>}
          prevPageText={<IoIosArrowBack className='pagination-switch-button'/>}
          nextPageText={<IoIosArrowForward className='pagination-switch-button'/>}
          activePage={activePage}
          itemsCountPerPage={currentPerPage}
          totalItemsCount={totalCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          innerClass='main-pagination'
          itemClass='main-pagination__li'
          linkClass='main-pagination__a'
          itemClassLast='main-pagination__last'
          itemClassFirst='main-pagination__first'
          itemClassPrev='main-pagination__prev'
          itemClassNext='main-pagination__next'
          activeLinkClass='main-pagination_active-link'
          activeClass='main-pagination_active-class'
        />
    </>
  )
}

export default React.memo(Paginate)