import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { PRIORITIES, LABELS } from '../../constants';
import { COLORS } from '../../constants/colors';

const TaskForm = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.MEDIUM);
  const [label, setLabel] = useState(LABELS.PERSONAL);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      priority,
      label,
      dueDate,
      isCompleted: false,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const inputStyle = {
    padding: '0.6rem 0.8rem',
    borderRadius: '0px',
    border: `1px solid ${COLORS.borderStrong}`,
    backgroundColor: COLORS.bg,
    color: COLORS.textMain,
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: COLORS.cardBg,
        padding: '1.5rem',
        borderRadius: '0px',
        border: `1px solid ${COLORS.border}`,
        boxShadow: `0 10px 15px -3px ${COLORS.overlay}`,
      }}
    >
      <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: COLORS.primary, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
        New Directive
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Name"
          required
          style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Notes or Details"
          style={{
            ...inputStyle,
            width: '100%',
            resize: 'vertical',
            minHeight: '80px',
            boxSizing: 'border-box'
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
            {Object.values(PRIORITIES).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={label} onChange={(e) => setLabel(e.target.value)} style={inputStyle}>
            {Object.values(LABELS).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.bg,
            border: 'none',
            padding: '0.8rem',
            borderRadius: '0px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.8rem',
            transition: 'all 0.2s ease',
            boxShadow: `0 0 10px ${COLORS.primary}44`
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = COLORS.primaryHover;
            e.target.style.boxShadow = `0 0 20px ${COLORS.primary}66`;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = COLORS.primary;
            e.target.style.boxShadow = `0 0 10px ${COLORS.primary}44`;
          }}
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
