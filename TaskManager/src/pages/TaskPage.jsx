import axios from 'axios';
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const retrieveTasks = async () => {
    const response = await axios.get('http://localhost:3000/tasks');
    return response.data;
  };

  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retrieveTasks();
      if (allTasks) {
        setTasks(allTasks);
      }
    };
    getAllTasks();
  }, []);

  const handleAddOrUpdateTask = (taskFromServer) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === taskFromServer.id);
      return exists
        ? prev.map((t) => (t.id === taskFromServer.id ? taskFromServer : t))
        : [...prev, taskFromServer];
    });
  };

  const handleToggleComplete = async (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    const updatedTask = {
      ...taskToToggle,
      is_completed: !taskToToggle.is_completed,
    };

    try {
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? response.data : task
        )
      );
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">My Task Manager</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Task Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TaskForm
              onAddTask={handleAddOrUpdateTask}
              editTask={editTask}
              setEditTask={setEditTask}
            />
          </div>

          {/* Task List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onEditTask={setEditTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
