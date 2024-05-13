import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
});