import React from 'react';
import TaskStats from './TaskStats';
import TaskFilters from './TaskFilters';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import UndoRedo from './UndoRedo';
import ExportImport from './ExportImport';
import ShareTasks from './ShareTasks';
import TaskCharts from './TaskCharts';
import { useDispatch } from 'react-redux';
import { setTasks, clearHistory } from './tasksSlice';

const TaskDashboard = () => {
  const [editTask, setEditTask] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handler = e => {
      dispatch(setTasks(e.detail));
      dispatch(clearHistory());
      alert('Shared tasks loaded!');
      window.location.hash = '';
    };
    window.addEventListener('import-shared-tasks', handler);
    return () => window.removeEventListener('import-shared-tasks', handler);
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-green-100 px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="w-full sm:w-1/2">
              <TaskStats />
            </div>
            <div className="w-full sm:w-1/2">
              <TaskForm editTask={editTask} onFinishEdit={() => setEditTask(null)} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 justify-between items-center mt-4">
            <UndoRedo />
            <div className="flex gap-2 mt-2 sm:mt-0">
              <ExportImport />
              <ShareTasks />
            </div>
          </div>
          <TaskFilters />
          <TaskList onEdit={setEditTask} />
        </div>
        <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-8 mt-8 lg:mt-0">
          <TaskCharts />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
