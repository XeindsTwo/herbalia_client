import {Layout} from "../../components/Layout.jsx";
import styles from './ProductDetails.module.scss';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Error404} from "../Errors/Error404.jsx";

export const ProductDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/products/${id}`);
        const productData = response.data.product;
        const {article, composition, images, ...rest} = productData;
        setProduct({...rest, article, composition, images});
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        }
      }
    }

    fetchProduct();
  }, [id]);

  if (notFound) {
    return (
      <Error404/>
    );
  }

  return (
    <Layout>
      <div className='container'>
        {product && (
          <div className={styles.inner}>
            <div className={styles.gallery}>
              {product.images.map(image => (
                <img key={image.id} src={image.url} width={450} height={450} alt={image.name}/>
              ))}
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>Букет "{product.name}"</h1>
              <span className={styles.undertitle}>Артикул: {product.article}</span>
              <div className={styles.top}>
                <span className={styles.in}>Ближайшая доставка через 2 часа</span>
                <p>с 10:00 до 23:00</p>
              </div>
              <p className={styles.price}>{product.price} ₽</p>
              <h3>Состав товара:</h3>
              <ul>
                {product.composition.map(item => (
                  <li key={item.id}>{item.name}: {item.quantity}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}