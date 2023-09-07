import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './slices/authSlice';
import surveyedSlice from './slices/surveyedSlice';
import municipalitiesSlice from './slices/municipalitiesSlice';
import neighborhoodsSlice from './slices/neighborhoodsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    surveyed: surveyedSlice,
    municipalities: municipalitiesSlice,
    neighborhoods: neighborhoodsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type Thunk = ThunkAction<
  void,
  RootState,
  unknown,
  Action<unknown>
>;

export default store;
