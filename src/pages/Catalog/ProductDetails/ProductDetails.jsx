import {Layout} from "../../../components/Layout.jsx";
import styles from './ProductDetails.module.scss';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Error404} from "../../Errors/Error404.jsx";
import {formatPrice} from '../../../utils/priceUtils.js';
import LikeIcon from '../../../assets/images/icons/product/like.svg?react';
import {Breadcrumbs} from "../../../components/Breadcrumbs/Breadcrumbs.jsx";
import {Contacts} from "../../../components/Contacts/Contacts.jsx";
import {SwiperGallery} from "./SwiperGallery/SwiperGallery.jsx";
import {ProductInfoSection} from "./ProductInfoSection/ProductInfoSection.jsx";

export const ProductDetails = () => {
  const {categoryId, productId} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/catalog/${categoryId}/${productId}`);
        const productData = response.data;
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
  }, [categoryId, productId]);

  useEffect(() => {
    if (product) {
      document.title = `Букет "${product.name}" заказать с доставкой недорого`;
    }
  }, [product]);

  if (notFound || !product) {
    return (
      <Error404/>
    );
  }

  return (
    <Layout isLoading={loading}>
      <section className='indent--breadcrumbs'>
        <div className='container'>
          <Breadcrumbs
            current={product ? product.name : ''}
            additional={[
              {label: 'Каталог', to: '/catalog'},
              {
                label: product && product.category ? product.category.name : '',
                to: `/catalog/${categoryId}`
              }
            ]}
          />
          <div className={styles.inner}>
            <SwiperGallery images={product.images}/>
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
                  </div>
                  <div className={styles.bonus}>Вы получите 96 баллов</div>
                </div>
                <button className={styles.order} type={"button"}>Оформить заказ</button>
              </div>
              <button className={styles.like} type="button">
                <LikeIcon/>
                В любимчики
              </button>
            </div>
          </div>
        </div>
      </section>
      {product && (
        <ProductInfoSection composition={product.composition}/>
      )}
      <Contacts/>
    </Layout>
  );
}