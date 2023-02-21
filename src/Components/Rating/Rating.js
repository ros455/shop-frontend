import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../store/auth.js";
import { selectIsAuth } from "../../store/auth.js";
import axios from "../../axios.js";
import rating from "./rating.css";
import StarRatings from 'react-star-ratings';
export default function Raiting({ data }) {

  const [currentRaiting, setCurrentRaiting] = React.useState(0);
  const [finalRating, setFinalRating] = React.useState(0);
  const [rating, setRating] = React.useState(data.rating);
  const [activeRaitingUsers, setActiveRaitingUsers] = React.useState(
    data.activeRaitingUsers
  );
  const [currentId, setCurrentId] = React.useState('');
  const [isBool, setIsBool] = React.useState(true);

  const user = useSelector(currentUser);
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    let id = '';
    if(user) {
      setCurrentId(user._id);
      id = user._id;
    }

    let bool = true;

    activeRaitingUsers.forEach((el) => {
      if (el == id) {
        bool = false;
      }
    });
    
    if (bool) {
      funcRaiting(currentRaiting);
    }
  }, [currentRaiting]);

  React.useEffect(() => {
    activeRaitingUsers.forEach((el) => {
      if (user && el == user._id) {
        setIsBool(false);
      }
    });
  }, [user]);

  React.useEffect(() => {
    sumraiting(rating);
  }, [rating]);

  const funcRaiting = (num) => {
    if (num != 0 && user._id) {
      setRating([...rating, Number(num)]);
      setActiveRaitingUsers([...activeRaitingUsers, user._id]);
    }
  };

  const sumraiting = (rating) => {
    let resultSum = rating.reduce((sum, current) => sum + current, 0);
    let resultLength = rating.length;
    let res = 0;

    if (resultLength != 0) {
      res = resultSum / resultLength;
    }
    setFinalRating(Number(res));


    if(currentRaiting != 0) {
      onSubmit(Number(res));
    }
  };

  const onSubmit = async (res) => {
    try {
      let star = 0;
      star = res.toFixed(1);

      const fields = {
        rating,
        activeRaitingUsers,
        star
      };

      const { file } = await axios.patch(`/products/${data._id}`, fields);
    } catch (err) {
      console.warn(err);
      alert("Ви не авторизовані");
    }
  };

  const changeCurrentRating = (e) => {
    setCurrentRaiting(e)
    window.location.reload()
  }

  return (
    <>
      <div className="rating-wrapper">
        <div className="raiting-item-wrapper">
          <div className="rating-item">
            {isAuth && isBool ? (
              <>
                {finalRating && (
                  <StarRatings
                    rating={finalRating}
                    starRatedColor="#ffd700"
                    changeRating={(e) => changeCurrentRating(e)}
                    numOfStars={5}
                    name="rating"
                    starHoverColor="#ffd700"
                    starDimension="35px"
                  />
                )}
              </>
            ) : (
              <>
                {finalRating && (
                  <StarRatings
                    rating={finalRating}
                    starRatedColor="#ffd700"
                    numOfStars={5}
                    name="rating"
                    starSelectingHoverColor="yellow"
                    starDimension="35px"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="full-rating-number">
          <h3 className="full-rating-number__item">{finalRating.toFixed(1)}</h3>
          <h3 className="full-rating-number__item">/5</h3>
        </div>
      </div>
    </>
  );
}