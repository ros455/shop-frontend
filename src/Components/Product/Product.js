import React from "react";
import Raiting from "../Rating/Rating";
import AddToCart from "../AddToCart/AddToCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { fetchRemoveProducts } from "../../store/product";
import StarRatings from 'react-star-ratings';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactMarkdown from "react-markdown";
// import { addCart, selectCart, incrementCart } from "../../store/cart";
import product from "./product.css";

 function Product({
  id,
  title,
  description,
  category,
  price,
  language,
  palette,
  year,
  pageCount,
  author,
  publishingHouse,
  imageUrl,
  isFullProduct,
  isEdit,
  el,
  data,
  star,
}) {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить товар?")) {
      dispatch(fetchRemoveProducts(id));
    }
  };

  return (
    <>
      {isEdit ? (
        <div className="edit-product-wrapper">
          <div className="edit-title-wrapper">
            <p>{title}</p>
          </div>
          <div className="edit-category-wrapper">
            <p>{category}</p>
          </div>
          <div className="edit-price-wrapper">
            <p>{price}</p>
          </div>
          <div className="edit-button-wrapper">
            <button onClick={onClickRemove}>
              <AiFillDelete className="AiFillDelete" />
            </button>
            <Link to={`/product/${id}/edit`}>
              <p>
                <BsPencilFill className="BsPencilFill" />
              </p>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {isFullProduct ? (
            <>
              <div className="full-product-image-wrapper">
                {imageUrl && <img className="full-product-image-wrapper__img" src={`http://localhost:3333${imageUrl}`} />}
              </div>
              <div className="full-products-title-wrapper">
                <h2 className="full-products-title">{title}</h2>
              </div>
              <ReactMarkdown children={description} />
              {/* <p>{description}</p> */}
              <Raiting data={data}/>

          <div className="full-product-category-wrapper">
            <p className="full-product-category-wrapper__text">Категорія</p>
            <p className="full-product-category-wrapper__text">{category}</p>
          </div>

          <>
              <div className="full-product-price-button-wrapper">
                <div>
                  <AddToCart el={data} />
                </div>
                <p className="full-product-price-button-wrapper__price">Ціна {price} грн</p>
              </div>
              <div className="product-parametr-wrapper">
                <h2>Характеристики:</h2>
              {language && <div className="product-parametr-item-wrapper">
                  <p className="product-parametr-item-wrapper__text">Мова:</p>
                  <p className="product-parametr-item-wrapper__text">{language}</p>
                </div>}
              {palette &&  <div className="product-parametr-item-wrapper">
                <p className="product-parametr-item-wrapper__text">Палітра:</p>
                <p className="product-parametr-item-wrapper__text">{palette}</p>
              </div>}
              {year && <div className="product-parametr-item-wrapper">
                  <p className="product-parametr-item-wrapper__text">Рік видання:</p>
                  <p className="product-parametr-item-wrapper__text">{year}</p>
                </div>}
              {pageCount && <div className="product-parametr-item-wrapper">
                  <p className="product-parametr-item-wrapper__text">Кількість сторінок:</p>
                  <p className="product-parametr-item-wrapper__text">{pageCount}</p>
                </div>}
              {author && <div className="product-parametr-item-wrapper">
                  <p className="product-parametr-item-wrapper__text">Автор:</p>
                  <p className="product-parametr-item-wrapper__text">{author}</p>
                </div>}
              {publishingHouse && <div className="product-parametr-item-wrapper">
                  <p className="product-parametr-item-wrapper__text">Видавництво:</p>
                  <p className="product-parametr-item-wrapper__text">{publishingHouse}</p>
                </div>}
              </div>
            </>
            </>
          ) : (
            <>
              <Link to={`product/${id}`}>
                <div className="product-image-wrapper">
                {imageUrl && <LazyLoadImage
                src={`http://localhost:3333${imageUrl}`}
                />}
                </div>
              </Link>
              <Link to={`product/${id}`}>
                <h5>{`${title && title.substring(0, 15)}...`}</h5>
              </Link>

              <div className="product-star-rating-wrapper">
              <StarRatings
                    rating={star}
                    starRatedColor="#ffd700"
                    numOfStars={5}
                    name="rating"
                    starSelectingHoverColor="yellow"
                    starDimension="15px"
                  />
              </div>
              
              <div className="product-price-button-wrapper">
                <p className="product-price-button-wrapper__product-price">{price} грн</p>
                <AddToCart el={el}/>
              </div>

          <div className="product-category-wrapper">
            <p>Категорія</p>
            <p>{category}</p>
          </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default React.memo(Product)