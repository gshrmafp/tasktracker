import React from 'react';
import { useSelector } from 'react-redux';
// Use a simple chart library for demo: chart.js + react-chartjs-2
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const TaskCharts = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const priorities = ['Low', 'Medium', 'High'];
  const priorityCounts = priorities.map(p => tasks.filter(t => t.priority === p).length);
  const completed = tasks.filter(t => t.completed).length;
  const active = tasks.length - completed;

  const barData = {
    labels: priorities,
    datasets: [
      {
        label: 'Tasks by Priority',
        data: priorityCounts,
        backgroundColor: ['#38b2ac', '#ecc94b', '#f56565'],
      },
    ],
  };

  const pieData = {
    labels: ['Active', 'Completed'],
    datasets: [
      {
        data: [active, completed],
        backgroundColor: ['#3182ce', '#38a169'],
      },
    ],
  };

  return (
    <div className="flex gap-8 justify-center mb-10 flex-wrap">
      <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[260px] max-w-[340px] w-full border border-blue-100">
        <Bar data={barData} options={{ plugins: { legend: { display: false } } }} />
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[260px] max-w-[340px] w-full border border-blue-100">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default TaskCharts;
