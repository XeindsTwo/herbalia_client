// Код для cartSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = loadCartFromLocalStorage();

function loadCartFromLocalStorage() {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : {
    cartItems: [],
    loading: false,
    error: null,
    cartItemCount: 0,
  };
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartStart(state) {
      state.loading = true;
    },
    addToCartSuccess(state, action) {
      state.loading = false;
      state.cartItems.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    addToCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateCartItemCount(state, action) {
      state.cartItemCount = action.payload;
    },
  },
});

export const {
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  updateCartItems,
  updateCartItemCount
} = cartSlice.actions;

export const addToCart = (productId, quantity) => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('Вы должны быть авторизованы для добавления товаров в корзину');
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch(addToCartStart());
  try {
    const response = await axios.post('/cart/add', {product_id: productId, quantity}, config);
    dispatch(addToCartSuccess(response.data));
    const updatedCartResponse = await axios.get('/cart', config);
    dispatch(updateCartItems(updatedCartResponse.data));
    dispatch(updateCartItemCount(updatedCartResponse.data.length));
  } catch (error) {
    if (error.response) {
      dispatch(addToCartFailure(error.response.data.error || 'Произошла ошибка при добавлении товара в корзину'));
    } else {
      toast.error('Произошла ошибка при отправке запроса');
    }
    throw error;
  }
};

export default cartSlice.reducer;