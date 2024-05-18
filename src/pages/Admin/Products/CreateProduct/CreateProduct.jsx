import React, {useState, useEffect} from 'react';
import {AdminLayout} from '../../../../components/AdminLayout.jsx';
import styles from './CreateProduct.module.scss';
import {NameInput} from '../../../../components/FormFields/Product/NameInput.jsx';
import {PriceInput} from '../../../../components/FormFields/Product/PriceInput.jsx';
import {ImageUploader} from '../ImageUploader/ImageUploader.jsx';
import {ProductCompositions} from '../ProductCompositions/ProductCompositions.jsx';
import axios from 'axios';
import {toast} from "react-toastify";
import {validateProductName, validateProductPrice} from "../../../../utils/validationUtils.js";

export const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    photos: [],
    composition: []
  });
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/admin/categories', {
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

    const nameValidationResult = validateProductName(formData.name);
    const priceValidationResult = validateProductPrice(formData.price);

    if (nameValidationResult) {
      setNameError(nameValidationResult);
      return;
    }

    if (priceValidationResult) {
      setPriceError(priceValidationResult);
      return;
    }

    if (!formData.category_id) {
      toast.error('Пожалуйста, выберите категорию товара');
      return;
    }

    if (!formData.photos || formData.photos.length === 0) {
      toast.error('Пожалуйста, загрузите хотя бы одно изображение товара');
      return;
    }

    if (
      formData.composition.length === 0 ||
      formData.composition.some(item => !item.name || !item.quantity)
    ) {
      toast.error('Пожалуйста, заполните состав товара');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category_id', formData.category_id);

      formData.photos.forEach((photo, index) => {
        if (!photo || !photo.name) {
          console.error(`Невалидная фотография ${index}:`, photo);
          return;
        }

        formDataToSend.append(`photos[${index}]`, photo);
      });

      formData.composition.forEach((item, index) => {
        formDataToSend.append(`composition[${index}][name]`, item.name);
        formDataToSend.append(`composition[${index}][quantity]`, item.quantity);
      });

      const response = await axios.post('/admin/products/create', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success('Товар успешно создан');
      setTimeout(() => {
        const categoryId = formData.category_id;
        if (categoryId && !isNaN(categoryId)) {
          window.location.href = `/admin/products/category/${categoryId}`;
        }
      }, 3000);
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
      toast.error('Произошла ошибка при создании товара. Пожалуйста, попробуйте еще раз');
    }
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNameBlur = () => {
    const error = validateProductName(formData.name);
    setNameError(error);
  };

  const handlePriceBlur = () => {
    const error = validateProductPrice(formData.price);
    setPriceError(error);
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
                      onBlur={handleNameBlur}
                      error={nameError}
                    />
                  </li>
                  <li>
                    <PriceInput
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      onBlur={handlePriceBlur}
                      error={priceError}
                    />
                  </li>
                  <li>
                    <label className="label" htmlFor="category">
                      Выберите категорию
                    </label>
                    <select
                      id="category"
                      className="input"
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
                  formData={formData}
                  onUpload={(photos) => setFormData(prevState => ({
                    ...prevState,
                    photos: [...prevState.photos, ...photos]
                  }))}
                  setFormData={setFormData}
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