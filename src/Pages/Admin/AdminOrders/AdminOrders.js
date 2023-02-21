import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchAllOrders, selectOrders } from '../../../store/order'
import { AiFillDelete } from "react-icons/ai";
import { fetchRemoveOrders } from '../../../store/order';
import adminorders from './adminorders.css'
import { Button } from 'react-bootstrap';
export default function AdminOrders() {

  const [activeStatus,setActiveStatus] = React.useState(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllOrders())
  },[])

  const order = useSelector(selectOrders);

  const onClickRemove = (id) => {
    if (window.confirm("Вы действительно хотите удалить товар?")) {
      dispatch(fetchRemoveOrders(id));
    }
  };

  return (
    <div className='admin-order-wrapper'>
      <div className='admin-order-item-wrapper'>
        <div className='admin-order-delete'></div>
      <div className="admin-order-time table">
              <p>Дата</p>
            </div>
            <div className='admin-order-total-sum table'>
            <p>Сумма</p>
            </div>
            <div className='admin-order-full-name table'>
            <p>Імя</p>
            </div>
            <div className='admin-order-phone table'>
            <p>Телефон</p>
            </div>
            <div className='admin-order-email table'>
            <p>Ел. пошта</p>
            </div>
            <div className='admin-order-city table'>
            <p>Місто</p>
            </div>
            <div className='admin-order-post-number table'>
            <p>Відділення</p>
            </div>
            <div className='admin-order-status table'>
              <p>Статус</p>
            </div>
            <div className='admin-order-button-wrapper table'>

            </div>
      </div>
      {order &&
        order.map((el) => (
          <div key={el._id} className='admin-order-item-wrapper'>
            <div className='admin-order-delete'>
            <button onClick={() => onClickRemove(el._id)} className='admin-order-delete__button'>
              <AiFillDelete className="AiFillDelete" />
            </button>
            </div>
            <div className="admin-order-time">
              {el.createdAt && (
                <>
                  <p>{el.createdAt.substring(0, 10)}/</p>
                  <p>{Number(el.createdAt.substring(11, 13)) + 3}</p>
                  <p>:{el.createdAt.substring(14, 16)}</p>
                </>
              )}
            </div>
            <div className='admin-order-total-sum'>
            <p>{el.totalSum}</p>
            </div>
            <div className='admin-order-full-name'>
          <p>{el.firstName}</p>
          <p>{el.lastName}</p>
          <p>{el.fatherName}</p>
            </div>
            <div className='admin-order-phone'>
            <p>{el.phone}</p>
            </div>
            <div className='admin-order-email'>
            <p>{el.email}</p>
            </div>
            <div className='admin-order-city'>
            <p>{el.city}</p>
            </div>
            <div className='admin-order-post-number'>
            <p>{el.postNumber}</p>
            </div>
            <div className= {`admin-order-status ${el.status == 'Доставлено' ? 'succses' : ''} ${el.status == 'В дорозі' ? 'intheway' : ''} ${el.status == 'Відміна' ? 'danger' : ''} ${el.status == 'В обробці' ? 'processing' : ''} ${el.status == 'Нове' ? 'new' : ''}`}>
            <p>
              {el.status}
            </p>
            </div>
            <div className='admin-order-button-wrapper'>
              <Link to={`${el._id}`}>
              <Button variant="outline-dark" className='admin-order-button'>Відкрити</Button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
