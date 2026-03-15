const STATUS_CONFIG = {
  todo: { label: 'To Do', className: 'badge-todo' },
  'in-progress': { label: 'In Progress', className: 'badge-progress' },
  done: { label: 'Done', className: 'badge-done' },
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { label, className } = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-card-header">
        <span className={`badge ${className}`}>{label}</span>
        <div className="task-actions">
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => onDelete(task._id)}
            title="Delete task"
            aria-label="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-meta">
        <span className="task-date">📅 {formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;
