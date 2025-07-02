import { useState, useEffect } from 'react';
import './TaskForm.css';
import axios from 'axios';


const initialForm = {
  title: '',
  description: '',
  deadline: '',
  priority: '1',
  type: 'Work',
  is_completed: false,
};

const TaskForm = ({ onAddTask, editTask, setEditTask }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editTask) {
      setFormData(editTask);
    } else {
      setFormData(initialForm);
    }
  }, [editTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      priority: Number(formData.priority),
    };

    try {
      let response;
      if (editTask) {
        response = await axios.put(`http://localhost:3000/tasks/${editTask.id}`, payload);
        setEditTask(null);
      } else {
        response = await axios.post('http://localhost:3000/tasks', payload);
      }

      onAddTask(response.data);
      setFormData(initialForm);
    } catch (err) {
      console.error('Failed to save task:', err);
      alert('Something went wrong. Check console for details.');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editTask ? 'Edit Task' : 'Add Task'}</h2>

      <label>Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Deadline</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />

      <label>Priority</label>
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>

      <label>Type</label>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">
        {editTask ? 'Save Changes' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
