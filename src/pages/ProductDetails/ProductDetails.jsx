import {Layout} from "../../components/Layout.jsx";
import styles from './ProductDetails.module.scss';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Error404} from "../Errors/Error404.jsx";
import {formatPrice} from '../../utils/priceUtils.js';
import InfoIcon from '../../assets/images/icons/product/info.svg?react';
import LikeIcon from '../../assets/images/icons/product/like.svg?react';
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs.jsx";
import {Contacts} from "../../components/Contacts/Contacts.jsx";

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
        setProduct(productData);
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
      <section className='indent--breadcrumbs'>
        <div className='container'>
          <Breadcrumbs
            current={product ? product.name : ''}
            additional={[
              {label: 'Каталог', to: '/catalog'},
              {
                label: product && product.category ? product.category.name : '',
                to: product && product.category ? `/catalog/${product.category.id}` : ''
              }
            ]}
          />
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

                <div className={styles.business}>
                  <div>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    <div className={styles.delivery}>
                      Цена с доставкой
                      <button className={styles.tooltip}>
                        <InfoIcon/>
                      </button>
                    </div>
                    <div className={styles.bonus}>Вы получите 96 баллов</div>
                  </div>
                  <button className={styles.order} type={"button"}>Оформить заказ</button>
                </div>

                <button className={styles.like} type="button">
                  <LikeIcon/>
                  В любимчики
                </button>

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
      </section>
      <Contacts/>
    </Layout>
  );
}