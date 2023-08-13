import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, { payload }) => {
      return payload;
    },
  },
});

export const filterSliceReducer = filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
