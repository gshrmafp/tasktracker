// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import filtersReducer from '../features/filters/filtersSlice';
import uiReducer from '../features/ui/uiSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
});

export default store;
