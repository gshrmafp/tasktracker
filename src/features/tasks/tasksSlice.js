// Task slice for CRUD, status, categories, priority, and persistence
import { createSlice, nanoid } from '@reduxjs/toolkit';

// --- Persistence to localStorage ---
const TASKS_KEY = 'task-tracker-tasks';

export const loadTasksFromStorage = () => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {}
};

const initialState = {
  tasks: loadTasksFromStorage(),
  undoStack: [],
  redoStack: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.undoStack.push(JSON.parse(JSON.stringify(state.tasks)));
        state.tasks.push(action.payload);
      },
      prepare(task) {
        return { payload: { ...task, id: nanoid(), createdAt: Date.now(), completed: false } };
      },
    },
    updateTask(state, action) {
      state.undoStack.push(JSON.parse(JSON.stringify(state.tasks)));
      const idx = state.tasks.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = { ...state.tasks[idx], ...action.payload };
    },
    deleteTask(state, action) {
      state.undoStack.push(JSON.parse(JSON.stringify(state.tasks)));
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleTask(state, action) {
      state.undoStack.push(JSON.parse(JSON.stringify(state.tasks)));
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    reorderTasks(state, action) {
      state.undoStack.push(JSON.parse(JSON.stringify(state.tasks)));
      state.tasks = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    undo(state) {
      if (state.undoStack.length) {
        state.redoStack.push(JSON.parse(JSON.stringify(state.tasks)));
        state.tasks = state.undoStack.pop();
      }
    },
    redo(state) {
      if (state.redoStack.length) {
        state.undoStack.push(JSON.parse(JSON.stringify(state.tasks)));
        state.tasks = state.redoStack.pop();
      }
    },
    clearHistory(state) {
      state.undoStack = [];
      state.redoStack = [];
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => {
      saveTasksToStorage(state.tasks);
    });
  },
});

export const { addTask, updateTask, deleteTask, toggleTask, reorderTasks, setTasks, undo, redo, clearHistory } = tasksSlice.actions;
export default tasksSlice.reducer;
