import React, {useEffect, useState} from 'react';
import {AdminLayout} from '../../../../components/AdminLayout.jsx';
import styles from './EditProduct.module.scss';
import {NameInput} from '../../../../components/FormFields/Product/NameInput.jsx';
import {PriceInput} from '../../../../components/FormFields/Product/PriceInput.jsx';
import axios from 'axios';
import {toast} from "react-toastify";
import {validateProductName, validateProductPrice} from "../../../../utils/validationUtils.js";
import {ImageUploaderEdit} from "../ImageUploader/ImageUploaderEdit.jsx";
import {useParams} from "react-router-dom";
import {ProductCompositionsEdit} from "../ProductCompositions/ProductCompositionsEdit.jsx";

export const EditProduct = () => {
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
  const {id} = useParams();

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

    fetchProductData(id);
    fetchCategories();
  }, []);

  const fetchProductData = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/admin/products/${productId}/edit`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const {product, categories, images, composition} = response.data;
      const compositionWithIds = composition.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      }));

      setFormData({
        ...formData,
        name: product.name,
        price: product.price,
        category_id: product.category_id,
        photos: images.map(image => ({file: {name: image.name}, url: image.url})),
        composition: compositionWithIds
      });
      setCategories(categories);
    } catch (error) {
      console.error('Ошибка при загрузке данных о товаре:', error);
      toast.error('Произошла ошибка при загрузке данных о товаре. Пожалуйста, попробуйте еще раз');
    }
  };

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
        formDataToSend.append(`composition[${index}][id]`, item.id);
        formDataToSend.append(`composition[${index}][name]`, item.name);
        formDataToSend.append(`composition[${index}][quantity]`, item.quantity);
      });

      const response = await axios.post(`/admin/products/${id}/edit`, formDataToSend, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success('Товар успешно обновлён');
      console.log(response.data);
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

  const removeImage = (index) => {
    setFormData((prevState) => {
      const updatedPhotos = prevState.photos.filter((_, i) => i !== index);
      return {...prevState, photos: updatedPhotos};
    });
  };

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div className={styles.form}>
            <h1 className="admin__title">Редактирование товара</h1>
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
                <ImageUploaderEdit
                  className={styles.files}
                  maxImages={4}
                  formData={formData}
                  setFormData={setFormData}
                  onUpload={(photos) => setFormData(prevState => ({
                    ...prevState,
                    photos: [...prevState.photos, ...photos]
                  }))}
                  onImageRemove={removeImage}
                />
                <ProductCompositionsEdit
                  composition={formData.composition}
                  onChange={(composition) =>
                    setFormData({...formData, composition})
                  }
                />
              </div>
              <button className={styles.create} type="submit">
                Сохранить изменения
              </button>
            </form>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};