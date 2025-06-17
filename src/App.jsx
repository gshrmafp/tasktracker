import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import TaskDashboard from './features/tasks/TaskDashboard';
import './App.css';
import './index.css'; // Tailwind CSS

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-full font-sans bg-white">
        <header className="text-center py-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 tracking-tight">Task Tracker</h1>
        </header>
        <main className="w-full">
          <TaskDashboard />
        </main>
      </div>
    </Provider>
  );
}

export default App;
