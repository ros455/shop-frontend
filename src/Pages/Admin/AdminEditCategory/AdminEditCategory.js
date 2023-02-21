import React from "react";
import axios from "../../../axios.js";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import admincategory from "../AdminCategories/admincategories.css";
export default function AdminEditCategory() {
  const [category, setCategory] = React.useState("");
  const { id } = useParams();
  const onSubmit = async () => {
    try {
      const fields = {
        category,
      };

      const { data } = await axios.patch(`/update-categories/${id}`, fields);

      window.location.reload()
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создание статьи!");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/get-one-category/${id}`)
        .then(({ data }) => {
          setCategory(data.category);
        })
        .catch((err) => {
          console.log(err);
          alert("Ошибка при получении статьи!");
        });
    }
  }, []);
  return (
    <div className="admin-category-wrapper">
      <form className="admin-category-form">
        <div>
          <div>
            <p>Редагування</p>
          </div>
          <div>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <Link to='/admin-categories'>
              <Button type="submin" onClick={onSubmit}>
                Редагувати
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
