import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {Favorites} from "../../../components/Favorites/Favorites.jsx";
import {Category} from "./Category/Category.jsx";

const fetchCategoriesWithProducts = async () => {
  try {
    const response = await axios.get('/categories-with-products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories with products');
  }
};

export const CategoryWithProducts = () => {
  const {favorites, handleToggleFavorite} = Favorites();
  const {data, isLoading, isError} = useQuery('categoriesWithProducts', fetchCategoriesWithProducts);

  return (
    <section className="indent">
      <div className="container">
        <div>
          {isLoading ? (
            <div>Загрузка контента...</div>
          ) : isError ? (
            <div>Ошибка при загрузке контента</div>
          ) : (
            data.map(category => (
              <Category
                key={category.id}
                category={category}
                favorites={favorites}
                handleToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};