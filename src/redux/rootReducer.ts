import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '@Redux/slices/auth';
import carsReducer from '@Redux/slices/cars';

const rootReducer = combineReducers({
  auth: authReducer,
  cars: carsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
