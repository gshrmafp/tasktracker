// Filters slice for status, category, priority, and search
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'all', // all | active | completed
  category: 'all',
  priority: 'all',
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    resetFilters(state) {
      state.status = 'all';
      state.category = 'all';
      state.priority = 'all';
      state.search = '';
    },
  },
});

export const { setStatus, setCategory, setPriority, setSearch, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
