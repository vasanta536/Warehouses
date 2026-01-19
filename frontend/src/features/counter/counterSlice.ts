import { createSlice } from '@reduxjs/toolkit';

interface perPageState {
  value: number;
}

const initialState: perPageState = { value: 5 };

const perPageSlice = createSlice({ 
name: 'perPage',
  initialState,
  reducers: {
    setPerPageCount: (state, action) => {state.value = action.payload}, 
  },
});

export const { setPerPageCount } =perPageSlice.actions;

export default perPageSlice.reducer