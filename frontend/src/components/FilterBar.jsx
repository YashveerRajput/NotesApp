import { useEffect, useRef, useState } from 'react';

let debounceTimer;

const FilterBar = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onFilterChange({ search, status });
    }, 400);
    return () => clearTimeout(debounceTimer);
  }, [search, status]);

  const handleReset = () => {
    setSearch('');
    setStatus('');
    onFilterChange({ search: '', status: '' });
  };

  return (
    <div className="filter-bar">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          id="search-tasks"
          type="text"
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          aria-label="Search tasks"
        />
        {search && (
          <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
        )}
      </div>
      <select
        id="filter-status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="status-filter"
        aria-label="Filter by status"
      >
        <option value="">All Statuses</option>
        <option value="todo">📋 To Do</option>
        <option value="in-progress">⚡ In Progress</option>
        <option value="done">✅ Done</option>
      </select>
      {(search || status) && (
        <button className="btn btn-ghost btn-sm" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default FilterBar;
