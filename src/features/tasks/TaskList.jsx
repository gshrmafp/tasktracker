import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import { reorderTasks } from './tasksSlice';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const filters = useSelector(state => state.filters);

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all') {
      if (filters.status === 'active' && task.completed) return false;
      if (filters.status === 'completed' && !task.completed) return false;
    }
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (
      filters.search &&
      !task.title?.toLowerCase().includes(filters.search.toLowerCase()) &&
      !task.content?.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const [draggedIdx, setDraggedIdx] = React.useState(null);

  // For drag-and-drop, track the dragged task's id
  const [draggedId, setDraggedId] = React.useState(null);

  // --- Drag and Drop Fix: Use original index from tasks, not filteredTasks ---
  const handleDragStart = (idx, id) => {
    // Find the index in the original tasks array
    const originalIdx = tasks.findIndex(t => t.id === filteredTasks[idx].id);
    setDraggedIdx(originalIdx);
    setDraggedId(id);
  };
  const handleDragOver = idx => idx !== draggedIdx;
  const handleDrop = idx => {
    if (draggedIdx === null) return;
    // Find the index in the original tasks array
    const dropTaskId = filteredTasks[idx]?.id;
    const dropIdx = tasks.findIndex(t => t.id === dropTaskId);
    if (draggedIdx === dropIdx || dropIdx === -1) {
      setDraggedIdx(null);
      setDraggedId(null);
      return;
    }
    const reordered = [...tasks];
    const [removed] = reordered.splice(draggedIdx, 1);
    reordered.splice(dropIdx, 0, removed);
    dispatch(reorderTasks(reordered));
    setDraggedIdx(null);
    setDraggedId(null);
  };

  // Allow dropping anywhere on the list
  if (!filteredTasks.length)
    return (
      <div className="text-center text-gray-500 italic mt-10 text-sm">
        No tasks found. Try adjusting filters or adding a new task.
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {filteredTasks.map((task, idx) => (
          <motion.div
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(idx, task.id)}
            onDragOver={e => {
              e.preventDefault();
              if (draggedId !== task.id) handleDragOver(idx);
            }}
            onDrop={() => handleDrop(idx)}
            onDragEnd={() => { setDraggedIdx(null); setDraggedId(null); }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`cursor-move ${draggedId === task.id ? 'opacity-60' : ''}`}
          >
            <TaskItem task={task} onEdit={onEdit} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
