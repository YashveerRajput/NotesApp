import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Pagination from '../components/Pagination';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: '', page: 1, limit: 9 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set('page', filters.page);
      params.set('limit', filters.limit);
      if (filters.status) params.set('status', filters.status);
      if (filters.search) params.set('search', filters.search);

      const res = await api.get(`/api/tasks?${params}`);
      setTasks(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = ({ search, status }) => {
    setFilters((prev) => ({ ...prev, search, status, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSaveTask = async (formData, id) => {
    if (id) {
      await api.put(`/api/tasks/${id}`, formData);
    } else {
      await api.post('/api/tasks', formData);
    }
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      if (tasks.length === 1 && filters.page > 1) {
        setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
      } else {
        fetchTasks();
      }
    } catch {
      setError('Failed to delete task');
    } finally {
      setDeletingId(null);
    }
  };

  const openCreate = () => { setEditingTask(null); setModalOpen(true); };
  const openEdit = (task) => { setEditingTask(task); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingTask(null); };

  return (
    <div className="dashboard">
      {/* ── Navbar ───────────────────────────────── */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-logo">✓</span>
          <span className="navbar-title">TaskFlow</span>
        </div>
        <div className="navbar-right">
          <span className="navbar-user">👤 {user?.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* ── Main ─────────────────────────────────── */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>My Tasks</h1>
            <p className="dashboard-subtitle">
              {pagination ? `${pagination.total} task${pagination.total !== 1 ? 's' : ''} total` : ''}
            </p>
          </div>
          <button id="add-task-btn" className="btn btn-primary" onClick={openCreate}>
            + New Task
          </button>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="tasks-loading">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="task-skeleton" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No tasks found</h3>
            <p>
              {filters.search || filters.status
                ? 'Try adjusting your filters'
                : 'Create your first task to get started'}
            </p>
            {!filters.search && !filters.status && (
              <button className="btn btn-primary" onClick={openCreate}>Create Task</button>
            )}
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEdit}
                onDelete={handleDelete}
                deleting={deletingId === task._id}
              />
            ))}
          </div>
        )}

        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </main>

      {modalOpen && (
        <TaskModal task={editingTask} onSave={handleSaveTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default Dashboard;
