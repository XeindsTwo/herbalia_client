import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../cartSlice.js';
import {toast} from 'react-toastify';

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const loading = useSelector(state => state.cart.loading);
  const error = useSelector(state => state.cart.error);
  const cartItemCount = useSelector(state => state.cart.cartItemCount);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await dispatch(addToCart(productId, quantity));
      toast.success('Товар успешно добавлен в корзину');
    } catch (err) {
      toast.error(error || 'Произошла ошибка при добавлении товара в корзину');
    }
  };

  return {cartItems, loading, error, handleAddToCart, cartItemCount};
};