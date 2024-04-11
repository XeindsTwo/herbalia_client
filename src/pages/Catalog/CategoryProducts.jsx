import {useState, useEffect} from 'react';
import axios from 'axios';
import {Layout} from '../../components/Layout.jsx';
import {useParams, Link} from 'react-router-dom';
import styles from './CategoryProducts.module.scss';
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs.jsx";
import {formatPrice} from "../../utils/priceUtils.js";

export const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {categoryId} = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const categoryIdNumber = parseInt(categoryId, 10);
        const response = await axios.get(`/catalog/${categoryIdNumber}`);
        setCategoryName(response.data.category_name);
        setMinPrice(response.data.min_price);
        setTotalCount(response.data.total_count);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  if (isLoading) {
    return <div>Загрузка товаров...</div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке товаров</div>;
  }

  return (
    <Layout>
      <section className={'indent--breadcrumbs'}>
        <div className="container">
          <Breadcrumbs
            current={categoryName}
            additional={[{label: 'Каталог', to: '/catalog'}]}
          />
          <div className={styles.top}>
            <h1 className={styles.name}>{categoryName}</h1>
            <div className={styles.counters}>
              <span>от {formatPrice(minPrice)}</span>
              <span>{totalCount} шт</span>
            </div>
          </div>
          <ul className={styles.list}>
            {products.map(product => (
              <li key={product.id}>
                <Link to={`/catalog/${categoryId}/${product.id}`}>
                  <img className={styles.img} src={product.image_url} alt={product.name} width="500" height="300"/>
                  <span className={styles.name_product}>{product.name}</span>
                  <p className={styles.delivery}>
                    <span>Бесплатная доставка через 2ч</span>
                    <span className={styles.time}>с 10:00 до 23:00</span>
                  </p>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};