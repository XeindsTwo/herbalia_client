import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.products.indexOf(productId);
      if (index === -1) {
        state.products.push(productId);
      } else {
        state.products.splice(index, 1);
      }

      localStorage.setItem('favorites', JSON.stringify(state.products));
    },
  },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;