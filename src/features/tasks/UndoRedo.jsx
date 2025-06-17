import React from 'react';
import { useDispatch } from 'react-redux';
import { undo, redo } from './tasksSlice';
import { FaUndo, FaRedo } from 'react-icons/fa';

const UndoRedo = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-3 justify-end mb-3">
      <button onClick={() => dispatch(undo())} aria-label="Undo" title="Undo" className="bg-gray-200 text-gray-800 rounded px-4 py-2 font-semibold hover:bg-gray-300 transition shadow flex items-center gap-2"><FaUndo /> Undo</button>
      <button onClick={() => dispatch(redo())} aria-label="Redo" title="Redo" className="bg-gray-200 text-gray-800 rounded px-4 py-2 font-semibold hover:bg-gray-300 transition shadow flex items-center gap-2"><FaRedo /> Redo</button>
    </div>
  );
};

export default UndoRedo;