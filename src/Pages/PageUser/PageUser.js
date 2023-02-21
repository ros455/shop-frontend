import React from 'react'
import { fetchAllOrders, selectOrders } from '../../store/order'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from '../../store/auth'
import pageuser from './pageuser.css'
export default function PageUser() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllOrders())
  },[])

  const allOrders = useSelector(selectOrders)
  const user = useSelector(currentUser)



  const currentUserOrder = [];

  if(allOrders && user) {
    allOrders.forEach((el) => {
      if(el.email == user.email) {
        currentUserOrder.push(el)
      }
    })
  }

  return (
    <div>
      {currentUserOrder &&
      currentUserOrder.map((el) => (
        <div key={el._id} className='page-user-wrapper'>
        <h3>Інформація про отримувача:</h3>
          <p>Загальна сумма: {el.totalSum} грн.</p>
          <div className="page-user-time">
              {el.createdAt && (
                <>
                  <p>Дата створення:</p>
                  <p>{el.createdAt.substring(0, 10)}/</p>
                  <p>{Number(el.createdAt.substring(11, 13)) + 3}</p>
                  <p>:{el.createdAt.substring(14, 16)}</p>
                </>
              )}
            </div>
          <p>Імя: {el.firstName}</p>
          <p>Прізвище: {el.lastName}</p>
          <p>По батькові: {el.fatherName}</p>
          <p>Телефон: {el.phone}</p>
          <p>Місто: {el.city}</p>
          <p>Відділення: {el.postNumber}</p>
          <h3>Замовлення:</h3>
          <div>
          {el.order.map((item) => (
            <div key={item._id} className='page-user-products-item'>
              <div className='page-user-img-wrapper'>
              <img src={`https://new-backend-book-shop-1.onrender.com${item.imageUrl}`} className='page-user-img-wrapper_image'/>
              </div>
              <div className='page-user-products-content'>
              <h5>{item.title}</h5>
              <p>Кількість: {item.count}</p>
              <p>Ціна: {item.price}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  )
}
