import React from 'react'
import axios from '../../../axios.js'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AiOutlineFileDone } from "react-icons/ai";
import fulladminorder from './fulladminorder.css'
export default function FullAdminOrder() {
  const [status, setStatus] = React.useState('');
    const [data, setData] = React.useState([]);
    const { id } = useParams();

    React.useEffect(() => {
        axios
          .get(`/admin-orders/${id}`)
          .then((res) => {
            setData([res.data]);
          })
          .catch((err) => {
            console.warn(err);
            alert("Error");
          });
      }, []);

      React.useEffect(() => {
        if(id) {
          axios.get(`/admin-orders/${id}`)
          .then(({data}) => {
            setStatus(data.status)
          })
          .catch((err) => {
            console.log(err)
            alert('Ошибка при получении статьи!')
          })
        }
      },[])

      const selectedChange = async (e) => {
        setStatus(e.target.value)
      }
    
      const onSubmit = async () => {
        try{
           const  fields = {
            status,
          }
    
          const {data} = await axios.patch(`/admin-orders/${id}`, fields);

          window.location.reload();
    
        } catch(err) {
          console.warn(err)
          alert('Ошибка при создание статьи!')
        }
      }

  return (
    <div className='admin-order-wrapper'>
            <div className='admin-order-item-wrapper'>
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
            <div className='full-admin-order-button-wrapper table'>

            </div>
      </div>
    {data &&
      data.map((el) => (
        <div key={el._id} className='admin-order-item-wrapper'>
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
          <div className='admin-order-status'>
              <select value={status} onChange={selectedChange}>
                <option value={'Нове'}>Нове</option>
                <option value={'В обробці'}>В обробці</option>
                <option value={'В дорозі'}>В дорозі</option>
                <option value={'Доставлено'}>Доставлено</option>
                <option value={'Відміна'}>Відміна</option>
              </select>
          </div>
          <div className='full-admin-order-button-wrapper'>
            <Link to='/admin-orders'>
            <AiOutlineFileDone type='submit' onClick={onSubmit}>submit</AiOutlineFileDone>
            </Link>
          </div>
        </div>
      ))}
      {data && data.map((el) => (
        <div key={el._id}>
            {el.order.map((item) => (
                <div key={item._id} className='full-admin-order'>
                    <p>Назва товару: {item.title}</p>
                    <p>Ціна за одиницю товару: {item.price}</p>
                    <p>Кількість: {item.count}</p>
                </div>
            ))}
            <h5>Комментар до замовлення: {el.comment}</h5>
        </div>
      ))}
  </div>
  )
}
