import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, clearHistory } from './tasksSlice';
import { FaFileExport, FaFileImport } from 'react-icons/fa';

const ExportImport = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const [status, setStatus] = React.useState('');
  const statusRef = React.useRef();

  // Export tasks as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus('Tasks exported!');
  };

  // Import tasks from JSON
  const handleImport = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          dispatch(setTasks(imported));
          dispatch(clearHistory());
          setStatus('Tasks imported successfully!');
        } else {
          setStatus('Invalid file format.');
        }
      } catch {
        setStatus('Failed to import tasks.');
      }
    };
    reader.readAsText(file);
  };

  React.useEffect(() => {
    if (status && statusRef.current) {
      statusRef.current.focus();
      const timeout = setTimeout(() => setStatus(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <div className="flex gap-3 justify-end mb-3" role="region" aria-label="Export and import tasks">
      <button onClick={handleExport} aria-label="Export tasks" title="Export tasks" tabIndex={0} className="bg-gray-200 text-gray-800 rounded px-4 py-2 font-semibold hover:bg-gray-300 transition shadow flex items-center gap-2"><FaFileExport /> Export</button>
      <label className="bg-gray-200 text-gray-800 rounded px-4 py-2 font-semibold hover:bg-gray-300 transition cursor-pointer shadow flex items-center gap-2" title="Import tasks" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.target.querySelector('input').click(); }}>
        <FaFileImport /> Import
        <input type="file" accept="application/json" style={{ display: 'none' }} onChange={handleImport} tabIndex={-1} />
      </label>
      <span
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        style={{position:'absolute',left:'-9999px'}}
      >{status}</span>
    </div>
  );
};

export default ExportImport;