import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortDefault, sortCheap, sortExpensive, currentCategory, allCategory } from '../../store/product';
import { setCurrentPage } from '../../store/productOnPage';
import sortpanel from './sortpanel.css'
 function SortPanel() {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category.category.items);
    const [activeCategory, setActiveCategory] = React.useState(null);
    const [activeSort, setActiveSort] = React.useState(null);

    const sortDefaultFunc = (e) => {
        dispatch(sortDefault())
        setActiveSort(e)
      }
    
      const sortCheapFunc = (e) => {
        dispatch(sortCheap())
        setActiveSort(e)
      }
    
      const sortExpensiveFunc = (e) => {
        dispatch(sortExpensive())
        setActiveSort(e)
      }

      const changeCategory = (e) => {
        dispatch(currentCategory(e))
        setActiveCategory(e)
        dispatch(setCurrentPage(1))
      }

      const changeAllCategory = (e) => {
        dispatch(allCategory())
        setActiveCategory(e)
      }
  return (
    <div className='sort-panel-wrapper'>
        <h4 className='sort-panel-wrapper__title'>Сортування:</h4>
        <div className='sort-panel-all-item-wrapper'>
            <div className= {`sort-panel-all-item-wrapper__category ${activeSort == 'default' ? 'sort-panel-all-item-wrapper__category_active-item-sort' : ''}`}
            onClick={() => sortDefaultFunc('default')}>
                <p className='sort-panel-all-item-wrapper__text'>За умовчанням</p>
            </div>
            <div className= {`sort-panel-all-item-wrapper__category ${activeSort == 'cheap' ? 'sort-panel-all-item-wrapper__category_active-item-sort' : ''}`}
            onClick={() => sortCheapFunc('cheap')}>
                <p className='sort-panel-all-item-wrapper__text'>Найдешевші</p>
            </div>
            <div className= {`sort-panel-all-item-wrapper__category ${activeSort == 'expencive' ? 'sort-panel-all-item-wrapper__category_active-item-sort' : ''}`}
            onClick={() => sortExpensiveFunc('expencive')}>
                <p className='sort-panel-all-item-wrapper__text'>Найдорожчі</p>
            </div>
        </div>
        
        <h4 className='sort-panel-wrapper__title'>Категорії:</h4>
        <div className='sort-panel-all-item-wrapper'>
        <div className= {`sort-panel-all-item-wrapper__category ${activeCategory == 'all' ? 'sort-panel-all-item-wrapper__category_active-item-category' : ''}`}
        onClick = {() => changeAllCategory('all')}>
                <p className='sort-panel-all-item-wrapper__text'>Всі</p>
                </div>
            {category &&
            category.map((el, idx) => (
                <div key={idx}
                onClick={() => changeCategory(el.category)}
                className= {`sort-panel-all-item-wrapper__category ${el.category == activeCategory ? 'sort-panel-all-item-wrapper__category_active-item-category' : ''}`}
                >
                <p className='sort-panel-all-item-wrapper__text'>{el.category}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default React.memo(SortPanel)