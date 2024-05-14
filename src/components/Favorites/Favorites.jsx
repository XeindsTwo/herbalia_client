import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../../favoritesSlice.js';
import {toast} from "react-toastify";

export const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.products);
  const favoritesCount = favorites.length;

  const handleToggleFavorite = (productId) => {
    dispatch(toggleFavorite(productId));
    const product = favorites.find(item => item === productId);
    if (product) {
      toast.info('Товар удален из избранного');
    } else {
      toast.success('Товар добавлен в избранное');
    }
  };

  return {favorites, favoritesCount, handleToggleFavorite};
};