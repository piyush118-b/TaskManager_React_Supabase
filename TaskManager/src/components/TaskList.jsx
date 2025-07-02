import "./TaskList.css";

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onEditTask }) => {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks added yet.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3 style={{ textDecoration: task.is_completed ? "line-through" : "none" }}>
            {task.title}
          </h3>
          <p>{task.description}</p>
          <p><strong>Deadline:</strong> {task.deadline}</p>
          <p><strong>Priority:</strong> {["High", "Medium", "Low"][task.priority - 1]}</p>
          <p><strong>Type:</strong> {task.type}</p>
          <p><strong>Extra:</strong> {task.extra}</p>
          <label>
            <input
              type="checkbox"
              checked={task.is_completed}
              onChange={() => onToggleComplete(task.id)}
            />
            {" "}Mark as Completed
          </label>
          <button
            onClick={() => onDeleteTask(task.id)}
            style={{
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "0.4rem 0.8rem",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "0.5rem"
            }}
          >
            Delete
          </button>
          <button
            onClick={() => onEditTask(task)}
            style={{
              background: "#3498db",
              color: "#fff",
              border: "none",
              padding: "0.4rem 0.8rem",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
