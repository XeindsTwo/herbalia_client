import {useState, useEffect} from 'react';
import {AdminLayout} from '../../../../components/AdminLayout.jsx';
import styles from './CreateProduct.module.scss';
import {NameInput} from '../../../../components/FormFields/Product/NameInput.jsx';
import {PriceInput} from '../../../../components/FormFields/Product/PriceInput.jsx';
import {ImageUploader} from '../ImageUploader/ImageUploader.jsx';
import {ProductCompositions} from '../ProductCompositions/ProductCompositions.jsx';
import axios from 'axios';

export const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    photos: [],
    composition: []
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/admin/categories/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category_id', formData.category_id);
      formData.photos.forEach((photo, index) => {
        formDataToSend.append(`photos[${index}]`, photo);
      });

      const response = await axios.post('/admin/products/create', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
    }
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div className={styles.form}>
            <h1 className="admin__title">Создание товара</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.content}>
                <ul className={styles.items}>
                  <li>
                    <NameInput
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </li>
                  <li>
                    <PriceInput
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </li>
                  <li>
                    <label className="label" htmlFor="category">
                      Выберите категорию
                    </label>
                    <select
                      id="category"
                      className="select"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
                <ImageUploader
                  className={styles.files}
                  maxImages={4}
                  onUpload={(photos) => setFormData({...formData, photos})}
                />
                <ProductCompositions
                  onChange={(composition) =>
                    setFormData({...formData, composition})
                  }
                />
              </div>
              <button className={styles.create} type="submit">
                Создать товар
              </button>
            </form>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};