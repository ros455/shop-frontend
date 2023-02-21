import React from 'react'
import axios from '../../axios.js'
import Product from '../Product/Product'
import { useParams } from "react-router-dom";
import fullproducts from './fullproducts.css'
 function FullProduct() {
  const [data, setData] = React.useState();
  const { id } = useParams();

    React.useEffect(() => {
      axios
        .get(`/products/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.warn(err);
          alert("Error");
        });
    }, []);

  return (
    <div className="full-products-wrapper">
      {data && (
        <Product
          _id={data._id} 
          title={data.title}
          category={data.category}
          price={data.price}
          description={data.description}
          language={data.language}
          palette={data.palette}
          year={data.year}
          pageCount={data.pageCount}
          author={data.author}
          publishingHouse={data.publishingHouse}
          imageUrl = {data.imageUrl}
          isFullProduct={true}
          data={data}
        />
      )}
    </div>
  );
}

export default React.memo(FullProduct)