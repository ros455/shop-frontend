import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../../axios.js';
import addproducts from './addproduct.css'
export default function AddProduct() {

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [language, setLanguage] = React.useState('');
    const [palette, setPalette] = React.useState('');
    const [year, setYear] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const [author, setAuthor] = React.useState('');
    const [publishingHouse, setPublishingHouse] = React.useState('');


    const inputFileRef = React.useRef(null);
    const {id} = useParams();
    const isEditing = Boolean(id); 

    const handleChangeFile = async (event) => {
      try{
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('image',file);
        const {data} = await axios.post('/upload',formData)
        setImageUrl(data.url)
      } catch(err) {
        console.warn(err)
        alert('Ошибка при загрузке файла!')
      }
    };

    const onClickRemoveImage = (event) => {
      event.preventDefault();
      setImageUrl('')
      };

    const allCategory = useSelector((state) => state.category.category.items);
    const onSubmit = async () => {
        try{
          const fields = {
            title,
            description,
            imageUrl,
            category,
            price,
            language,
            palette,
            year,
            pageCount,
            author,
            publishingHouse
          }

          const {data} = isEditing ? await axios.patch(`/products/${id}`, fields) : await axios.post(`/products`, fields);

        } catch(err) {
          console.warn(err)
          alert('Ошибка при создание статьи!')
        }
      }

      React.useEffect(() => {
        if(id) {
          axios.get(`/products/${id}`)
          .then(({data}) => {
            setTitle(data.title);
            setDescription(data.description);
            setImageUrl(data.imageUrl);
            setCategory(data.category);
            setPrice(data.price);
            setLanguage(data.language);
            setPalette(data.palette);
            setYear(data.year);
            setPageCount(data.pageCount);
            setAuthor(data.author);
            setPublishingHouse(data.publishingHouse);

          })
          .catch((err) => {
            console.log(err)
            alert('Ошибка при получении статьи!')
          })
        }
      },[])

      const selectedChange = (e) => {
        setCategory(e.target.value)
      }
  return (
    <div className="add-product-wrapper">
      <div className="add-product-button-wrapper">
        <Button
          variant="outline-primary"
          onClick={() => inputFileRef.current.click()}
          className="add-post-button"
        >
          Завантажити фото
        </Button>
        <input
          ref={inputFileRef}
          onChange={handleChangeFile}
          type="file"
          hidden
        />
        {imageUrl && (
          <Button
            variant="danger"
            onClick={onClickRemoveImage}
            className="add-post-button"
          >
            Удалить
          </Button>
        )}
      </div>
      <div className="add-product-image-wrapper">
        {imageUrl && <img src={`http://localhost:3333${imageUrl}`} />}
      </div>

      <form className="add-product-form-wrapper">
        <div>
          Назва товару
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='add-product-description-product'>
          <p>Опис товару</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          Категорія товару
          <select value={category} onChange={selectedChange}>
            {allCategory &&
              allCategory.map((el, index) => (
                <option key={index} value={el.category}>
                  {el.category}
                </option>
              ))}
          </select>
        </div>
        <div>
          Ціна товару
          <input value={price} onChange={(e) => setPrice(e.target.value)} type='number'/>
        </div>
        <div>
          Мова книги
          <input value={language} onChange={(e) => setLanguage(e.target.value)} />
        </div>
        <div>
          Палітра
          <input value={palette} onChange={(e) => setPalette(e.target.value)} />
        </div>
        <div>
          Рік видання
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          кількість сторінок
          <input value={pageCount} onChange={(e) => setPageCount(e.target.value)} />
        </div>
        <div>
          Автор
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Видавництво
          <input value={publishingHouse} onChange={(e) => setPublishingHouse(e.target.value)} />
        </div>
        <div>
          <Button type="submin" onClick={onSubmit}>
            Опублікувати
          </Button>
        </div>
      </form>
    </div>
  );
}
