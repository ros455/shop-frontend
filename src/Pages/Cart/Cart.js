import React from "react";
import axios from "../../axios.js";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import TotalCarSum from "../../Components/TotalCarSum/TotalCarSum";
import { AiTwotoneDelete } from "react-icons/ai";
import { currentUser } from "../../store/auth";
import {
  selectCart,
  incrementCart,
  decrementCart,
  removeCart,
  removeAll,
} from "../../store/cart";
import {
  getNowa,
  getNowaCity,
  getNowaEndCity,
  fetchNowa,
  fetchNowaCity,
} from "../../store/nowaPost.js";
import cart from "./cart.css";

 function Cart() {
  const [inputCity, setInputCity] = React.useState("");
  const [cityRef, setCityRef] = React.useState(null);
  const [selectPost, setSelectPost] = React.useState(true);

  const [city, setCity] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [phone, setPhone] = React.useState("+380");
  const [email, setEmail] = React.useState("");
  const [postNumber, setPostNumber] = React.useState("");
  const [comment, setComment] = React.useState("");

  const dispatch = useDispatch();

  const order = useSelector(selectCart);
  const user = useSelector(currentUser);
  
  let totalSum = 0;

  const nowa = useSelector(getNowa);
  const nowaCity = useSelector(getNowaCity);
  const nowaEndCity = useSelector(getNowaEndCity);

  React.useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, []);

  React.useEffect(() => {
    dispatch(fetchNowa(inputCity));
  }, [inputCity]);

  React.useEffect(() => {
    dispatch(fetchNowaCity(cityRef));
  }, [cityRef]);

  React.useEffect(() => {
    if(selectPost) {
      setEmail('Нова пошта')
    } else {
      setEmail('Укр пошта')
    }
  },[selectPost])

  order.forEach((el) => {
    totalSum += el.price * el.count;
  });

  const remove = (id) => {
    dispatch(removeCart(id));
  };

  const removeAllProductFromCart = () => {
    dispatch(removeAll());
  };

  const increment = (id) => {
    dispatch(incrementCart(id));
  };

  const decrement = (el) => {
    dispatch(decrementCart(el._id));
  };

  const onSubmit = async () => {
    try {
      const fields = {
        firstName,
        lastName,
        fatherName,
        phone,
        email,
        city,
        postNumber,
        comment,
        order,
        totalSum,
      };
      const { data } = await axios.post("/create-order", fields);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedChange = (e) => {
    setCityRef(e.target.value);
  };

  const selectedChangeCityPostAddress = (e) => {
    setPostNumber(e.target.value);

    if (nowaEndCity) {
      setCity(nowaEndCity.CityDescription);
    }
  };

  const funcSetCity = (e) => {
    setInputCity(e);
  };

  return (
    <div className="cart-wrapper">
      {order.length != 0 ? (
        <>
          <div className="total-sum-and-danger-button">
            <Button
              variant="outline-danger"
              onClick={() => removeAllProductFromCart()}
            >
              Видалити всі товари
            </Button>
            <div className="cart-total-sum-wrapper">
              <p className="cart-total-sum-wrapper__text">Загальна вартість</p>
              <TotalCarSum />
            </div>
          </div>
          {order.map((el) => (
            <div key={el._id} className="cart-item-wrapper">
              <div className="cart-image-wrapper">
                <img className="cart-image-wrapper_img" src={`https://new-backend-book-shop-1.onrender.com${el.imageUrl}`} />
              </div>
              <div className="cart-element-wrapper">
                <div>
                  <h3>{el.title}</h3>
                </div>
                <div>
                  <div>
                    <p>Ціна: {el.price * el.count}</p>
                  </div>
                  <div className="cart-button-wrapper">
                    <Button variant="dark" onClick={() => increment(el._id)}>
                      +
                    </Button>
                    <p>{el.count}</p>
                    <Button variant="dark" onClick={() => decrement(el)}>
                      -
                    </Button>
                    <AiTwotoneDelete
                      className="AiTwotoneDelete"
                      onClick={() => remove(el._id)}
                    ></AiTwotoneDelete>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div></div>
          <form className="cart-form-wrapper">
            <div className="cart-form-full-name">
              <div className="cart-input-wrapper">
                <p>Імя</p>
                <input
                  value={firstName}                 
                  onChange={(e) => setFirstName(e.target.value)}
                  className='universal-style-for-cart-form'
                />
              </div>
              <div className="cart-input-wrapper">
                <p>Прізвище</p>
                <input
                  type="phone"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='universal-style-for-cart-form'
                />
              </div>
              <div className="cart-input-wrapper">
                <p>По батькові</p>
                <input
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className='universal-style-for-cart-form'
                />
              </div>
            </div>
            <div className="cart-form-other-wrapper">
              <div className="cart-input-wrapper">
                <p>Телефон</p>
                <input
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='universal-style-for-cart-form'
                />
              </div>
            </div>
            <div className="cart-form-select-post-wrapper">
              <div
                className="cart-form-select-post"
                onClick={() => setSelectPost(true)}
              >
                <p>Нова пошта</p>
                <div className="cart-form-select-post-img-nowa-wrapper ">
                  <img
                    src={"/img/nowa.png"}
                    className="cart-form-select-post-img"
                  />
                </div>
              </div>
              <div
                className="cart-form-select-post"
                onClick={() => setSelectPost(false)}
              >
                <p>Укр пошта</p>
                <div className="cart-form-select-post-img-ukr-wrapper ">
                  <img
                    src={"/img/ukr.png"}
                    className="cart-form-select-post-img"
                  />
                </div>
              </div>
            </div>
            {selectPost ? (
              <>
                <h5>Оформлення замовлення через нову пошту</h5>
                <div className="cart-form-other-wrapper">
                  <div className="cart-input-wrapper-city">
                    <p>Ваше місто</p>
                    <input
                      value={inputCity}
                      onChange={(e) => funcSetCity(e.target.value)}
                      className='universal-style-for-cart-form'
                    />
                    <div className="cart-input-wrapper-select">
                      {inputCity &&
                        nowa.map((el, index) => (
                          <div key={index}>
                            <select onClick={selectedChange}
                            className='universal-style-for-cart-form'>
                              <option>Вибиріть місто</option>
                              {el.Addresses.map((item, i) => (
                                <option key={i} value={item.DeliveryCity}>
                                  {item.Present}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="cart-form-other-wrapper">
                  {cityRef && (
                    <>
                      <div className="cart-input-wrapper">
                        <p>Номер відділення</p>
                        <div className="cart-input-wrapper-select">
                          <select onClick={selectedChangeCityPostAddress}
                          className='universal-style-for-cart-form'>
                            <option>Вибиріть відділяння</option>
                            {nowaCity &&
                              nowaCity.map((el, idx) => (
                                <option key={idx} value={el.Description}>
                                  {el.Description}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
            <h5>Оформлення замовлення через Укр пошту</h5>
                <div className="cart-form-other-wrapper">
                  <div className="cart-input-wrapper-city">
                    <p>Ваше місто</p>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className='universal-style-for-cart-form'
                      
                    />
                  </div>
                </div>

                <div className="cart-form-other-wrapper">
                  <div className="cart-input-wrapper-city">
                    <p>Номер пошти</p>
                    <input
                      value={postNumber}
                      onChange={(e) => setPostNumber(e.target.value)}
                      className='universal-style-for-cart-form'
                    />
                  </div>
                </div>
              </>
            )}
            <div className="cart-form-bottom">
              <textarea
                placeholder="Коментар до замовлення..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='universal-style-for-cart-form'
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="outline-primary"
                onClick={onSubmit}
              >
                Оформити замовлення
              </Button>
            </div>
          </form>
        </>
      ) : (
        <h2>В корзині поки що нічого немає</h2>
      )}
    </div>
  );
}

export default React.memo(Cart)
