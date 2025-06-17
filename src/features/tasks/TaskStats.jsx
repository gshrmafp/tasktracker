import { useSelector } from 'react-redux';

const TaskStats = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const byPriority = {
    Low: tasks.filter(t => t.priority === 'Low').length,
    Medium: tasks.filter(t => t.priority === 'Medium').length,
    High: tasks.filter(t => t.priority === 'High').length,
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-blue-100 px-6 py-5">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Task Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center text-sm text-gray-700">
        <div className="bg-blue-50 rounded-lg py-2 shadow-sm">
          <div className="font-semibold text-blue-900">Total</div>
          <div className="text-lg font-bold">{total}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg py-2 shadow-sm">
          <div className="font-semibold text-yellow-800">Active</div>
          <div className="text-lg font-bold">{active}</div>
        </div>
        <div className="bg-green-50 rounded-lg py-2 shadow-sm">
          <div className="font-semibold text-green-800">Completed</div>
          <div className="text-lg font-bold">{completed}</div>
        </div>
        <div className="bg-gray-50 rounded-lg py-2 shadow-sm">
          <div className="font-semibold text-gray-800">Low</div>
          <div className="text-lg font-bold">{byPriority.Low}</div>
        </div>
        <div className="bg-gray-100 rounded-lg py-2 shadow-sm">
          <div className="font-semibold text-gray-900">Medium</div>
          <div className="text-lg font-bold">{byPriority.Medium}</div>
        </div>
        <div className="bg-red-50 rounded-lg py-2 shadow-sm">
          <div className="font-semibold text-red-800">High</div>
          <div className="text-lg font-bold">{byPriority.High}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
