import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from './tasksSlice';
import { FaEdit, FaTrashAlt, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const priorityColors = {
    Low: 'border-teal-500 bg-teal-50 text-teal-700',
    Medium: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    High: 'border-red-500 bg-red-50 text-red-700',
  };

  return (
    <div
      className={`flex items-center bg-white/90 rounded-xl shadow px-5 py-4 mb-3 outline-none border-l-4 ${priorityColors[task.priority] || 'border-gray-200'} ${task.completed ? 'opacity-60 line-through' : ''} hover:scale-[1.02] hover:shadow-lg transition-all duration-200`}
      tabIndex={0}
      aria-label={`Task: ${task.title}, Priority: ${task.priority}, ${task.completed ? 'Completed' : 'Active'}`}
    >
      <button
        onClick={() => dispatch(toggleTask(task.id))}
        aria-label={task.completed ? 'Mark as active' : 'Mark as completed'}
        className="mr-3 text-blue-600 text-xl focus:outline-none"
      >
        {task.completed ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle />}
      </button>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="font-semibold text-lg text-blue-900 truncate" title={task.title}>{task.title}</div>
        {task.content && (
          <div className="text-sm text-gray-700 whitespace-pre-line break-words max-w-full max-h-24 overflow-auto pr-2" title={task.content}>{task.content}</div>
        )}
        <div className="flex gap-2 items-center mt-1 flex-wrap">
          {task.category && <span className="text-xs text-gray-500 mr-2">{task.category}</span>}
          <span className={`text-xs font-semibold ml-2 ${task.priority === 'Low' ? 'text-teal-600' : task.priority === 'Medium' ? 'text-yellow-700' : 'text-red-600'}`}>{task.priority}</span>
        </div>
      </div>
      <button
        className="text-blue-600 hover:text-blue-800 font-medium mr-2 transition text-xl"
        onClick={() => onEdit(task)}
        aria-label="Edit task"
      >
        <FaEdit />
      </button>
      <button
        className="text-red-600 hover:text-red-800 text-xl font-bold ml-2 transition"
        onClick={() => dispatch(deleteTask(task.id))}
        aria-label="Delete task"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default TaskItem;
