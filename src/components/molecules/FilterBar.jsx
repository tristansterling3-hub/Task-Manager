import React from 'react';
import { PRIORITIES, LABELS } from '../../constants';
import { COLORS } from '../../constants/colors';
import { useTasks } from '../../context/TaskContext';

const FilterBar = ({ filters, setFilters }) => {
  const { tasks } = useTasks();

  const getCount = (type, value) => {
    if (type === 'priority' && value === 'Upcoming') {
      return tasks.filter(task => task.dueDate && new Date(task.dueDate) >= new Date()).length;
    }
    return tasks.filter(task => task[type] === value).length;
  };

  const filterInputStyle = {
    padding: '6px 12px',
    borderRadius: '0px',
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardBg,
    color: COLORS.textMain,
    fontSize: '0.7rem',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const labelStyle = {
    fontSize: '0.6rem',
    fontWeight: 'bold',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginRight: '8px',
    fontFamily: 'monospace',
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      alignItems: 'center',
      padding: '1.2rem',
      backgroundColor: COLORS.cardBg,
      border: `1px solid ${COLORS.border}`,
      marginBottom: '2rem',
      borderRadius: '0px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={labelStyle}>Filter Priority:</span>
        <select
          value={filters.priority}
          onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          style={filterInputStyle}
        >
          <option value="All">ALL PRIORITIES</option>
          <option value="Upcoming">
            UPCOMING {getCount('priority', 'Upcoming') > 0 ? `(+${getCount('priority', 'Upcoming')})` : '(0)'}
          </option>
          {Object.values(PRIORITIES).map(p => {
            const count = getCount('priority', p);
            return (
              <option key={p} value={p}>
                {p.toUpperCase()} {count > 0 ? `(+${count})` : '(0)'}
              </option>
            );
          })}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={labelStyle}>Filter Label:</span>
        <select
          value={filters.label}
          onChange={(e) => setFilters(prev => ({ ...prev, label: e.target.value }))}
          style={filterInputStyle}
        >
          <option value="All">ALL LABELS</option>
          {Object.values(LABELS).map(l => {
            const count = getCount('label', l);
            return (
              <option key={l} value={l}>
                {l.toUpperCase()} {count > 0 ? `(+${count})` : '(0)'}
              </option>
            );
          })}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={labelStyle}>Filter Status:</span>
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          style={filterInputStyle}
        >
          <option value="All">ALL STATUS</option>
          <option value="Active">ACTIVE ONLY</option>
          <option value="Completed">COMPLETED ONLY</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
