import {createSlice} from '@reduxjs/toolkit';
export interface Car {
  color: string;
  model: string;
  make: string;
  category: string;
  registrationNo: string;
}
interface CarsState {
  cars: Car[];
  isLoading: boolean;
  error?: string;
}

const initialState: CarsState = {
  cars: [
    {
      color: 'blue',
      model: 'Accord',
      make: 'Honda',
      category: 'Sedan',
      registrationNo: 'ABC123',
    },
    {
      color: 'red',
      model: 'Camry',
      make: 'Toyota',
      category: 'Hatchback',
      registrationNo: 'DEF456',
    },
    {
      color: 'green',
      model: 'Civic',
      make: 'Honda',
      category: 'SUV',
      registrationNo: 'GHI789',
    },
  ],
  isLoading: false,
  error: undefined,
};
const authSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetState(state) {
      state.cars = [];
      state.isLoading = false;
      state.error = undefined;
    },
    addCar(state, action) {
      state.cars.push(action.payload);
    },
    updateCar(state, action) {
      const {index, ...car} = action.payload;
      state.cars[index] = car;
    },
    deleteCar(state, action) {
      const prev = [...state.cars];
      const {index} = action.payload;
      prev.splice(index, 1);
      state.cars = prev;
    },
  },
});
export const {resetState, addCar, updateCar, deleteCar} = authSlice.actions;
export default authSlice.reducer;
