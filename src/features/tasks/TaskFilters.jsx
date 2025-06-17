import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStatus,
  setCategory,
  setPriority,
  setSearch,
  resetFilters,
} from '../filters/filtersSlice';

const categories = ['all', 'Work', 'Personal', 'Shopping', 'Other'];
const priorities = ['all', 'Low', 'Medium', 'High'];

const TaskFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  return (
    <form className="w-full bg-white rounded-2xl shadow p-6 border border-blue-100 flex flex-wrap gap-4 items-center">
      <select
        value={filters.status}
        onChange={(e) => dispatch(setStatus(e.target.value))}
        aria-label="Filter by status"
        className="min-w-[140px] px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        aria-label="Filter by category"
        className="min-w-[160px] px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'all' ? 'All Categories' : cat}
          </option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => dispatch(setPriority(e.target.value))}
        aria-label="Filter by priority"
        className="min-w-[130px] px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {priorities.map((pri) => (
          <option key={pri} value={pri}>
            {pri === 'all' ? 'All Priorities' : pri}
          </option>
        ))}
      </select>

      <input
        type="search"
        value={filters.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Search tasks..."
        aria-label="Search tasks"
        className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <button
        type="button"
        onClick={() => dispatch(resetFilters())}
        className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-md shadow"
      >
        Reset
      </button>
    </form>
  );
};

export default TaskFilters;
