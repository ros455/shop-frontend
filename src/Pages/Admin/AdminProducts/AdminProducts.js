import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, fetchAllProducts } from '../../../store/product';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from '../../../Components/Product/Product';
import adminproducts from './adminproducts.css'
export default function AdminProducts() {

  const dispatch = useDispatch();

  const products = useSelector(selectProducts)

  React.useEffect(() => {
    dispatch(fetchAllProducts())
  },[])

  return (
    <>
    <Link to='add-product'>
        <div><Button variant="outline-primary">Додати новий товар</Button></div>
    </Link>

    <div className="admin-products-wrapper">
    {products && products.map((el) => (
        <div key={el._id} className='admin-product-item-wrapper'>
          <Product
          id={el._id}
          title={el.title}
          category={el.category}
          price={el.price}
          isEdit={true}/>
        </div>
      ))}
    </div>

    </>
  )
}
