import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../axios.js";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { fetchRemoveCategory } from "../../../store/category.js";
import admincategories from "./admincategories.css";
import { Link,useParams } from "react-router-dom";

export default function AdminCategories() {
  const [category, setCategory] = React.useState("");
  const {id} = useParams();

  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const fields = {
        category,
      };

      const { data } = await axios.post("/createcategories", fields);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создание статьи!");
    }
  };

  const allCategory = useSelector((state) => state.category.category.items);

  const onClickRemove = (id) => {
    if (window.confirm("Вы действительно хотите удалить товар?")) {
      dispatch(fetchRemoveCategory(id));
    }
  };

  return (
    <div className="admin-category-wrapper">
      <form className="admin-category-form">
        <div>
          <div>
          <p>Нова категорія</p>
          </div>
        <div>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
        <Button type="submin" onClick={onSubmit}>
          Додати
        </Button>
        </div>
        </div>
      </form>
      <div className="admin-category-category-wrapper">
        {allCategory &&
          allCategory.map((el) => (
            <div key={el._id} className="admin-category-item">
              <div>
              <p>{el.category}</p>
              <div className="admin-category-item-button">
                <Link to={`/admin-categories/${el._id}/edit`}>
                <BsPencilFill/>
                </Link>
              <AiFillDelete onClick={() => onClickRemove(el._id)}/>
              </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
