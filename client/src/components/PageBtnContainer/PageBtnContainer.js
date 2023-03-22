import React from 'react'
import wrapper from "./PageBtnContainerCSS";
import { useAppContext } from '../../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = () => {
const { numOfPages, page , changePage } = useAppContext();

   const pages=Array.from({length:numOfPages},(_,index) =>{ //create array based on numof pages
      return index+1
   })

   const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      // newPage = 1
      // alternative
      newPage = numOfPages; //go to last page
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      // newPage = numOfPages
      // alternative
      newPage = 1;
    }
    changePage(newPage);
  };

  return (
   <wrapper>
       <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
    {pages.map((pageNumber) => {
      return (
        <button
          type='button'
          className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} //currem page will be active css
          key={pageNumber}
          onClick={() => changePage(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    })}
  </div>

      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </wrapper>
  )
}

export default PageBtnContainer