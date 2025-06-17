import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask } from './tasksSlice';

const initialForm = {
  title: '',
  content: '',
  category: '',
  priority: 'Low',
};

const TaskForm = ({ editTask, onFinishEdit }) => {
  const [form, setForm] = React.useState(editTask || initialForm);
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const staticCategories = ['Work', 'Personal', 'Shopping', 'Other'];
  const taskCategories = Array.from(new Set(tasks.map(t => t.category).filter(Boolean)));
  const categories = Array.from(new Set([...staticCategories, ...taskCategories]));

  React.useEffect(() => {
    if (editTask) setForm(editTask);
  }, [editTask]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editTask) {
      dispatch(updateTask(form));
      onFinishEdit?.();
    } else {
      dispatch(addTask(form));
    }

    setForm(initialForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-2xl shadow-md p-6 border border-blue-100 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
        className="col-span-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
        className="col-span-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        style={{ minHeight: '80px', maxHeight: '200px' }}
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="col-span-full flex flex-wrap gap-3 mt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
        >
          {editTask ? 'Update Task' : 'Add Task'}
        </button>
        {editTask && (
          <button
            type="button"
            onClick={onFinishEdit}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
