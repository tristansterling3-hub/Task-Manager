import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { PRIORITIES, LABELS } from '../../constants';
import { COLORS } from '../../constants/colors';
import { isTaskOverdue } from '../../utils/taskHelpers';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editLabel, setEditLabel] = useState(task.label);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const getPriorityColor = (p) => {
    switch(p) {
      case PRIORITIES.URGENT: return COLORS.urgent;
      case PRIORITIES.HIGH: return COLORS.high;
      case PRIORITIES.MEDIUM: return COLORS.medium;
      case PRIORITIES.LOW: return COLORS.low;
      default: return COLORS.textMuted;
    }
  };

  const overdue = isTaskOverdue(task);

  const handleSave = () => {
    updateTask(task.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      label: editLabel,
      dueDate: editDueDate
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setEditLabel(task.label);
    setEditDueDate(task.dueDate || '');
  };

  if (isEditing) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '1.2rem',
        border: `1px solid ${COLORS.primary}`,
        backgroundColor: COLORS.cardBg,
        borderRadius: '0px',
        marginBottom: '1rem',
        color: COLORS.textMain
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: COLORS.textMuted, textTransform: 'uppercase' }}>Directive_Title</span>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              padding: '6px',
              backgroundColor: COLORS.bg,
              color: COLORS.textMain,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '0px',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: COLORS.textMuted, textTransform: 'uppercase' }}>SOP_Description</span>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            style={{
              padding: '6px',
              backgroundColor: COLORS.bg,
              color: COLORS.textMain,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '0px',
              fontSize: '0.9rem',
              minHeight: '60px'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: COLORS.textMuted, textTransform: 'uppercase' }}>Priority</span>
            <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} style={{ padding: '4px', backgroundColor: COLORS.bg, color: COLORS.textMain, border: `1px solid ${COLORS.border}`, borderRadius: '0px' }}>
              {Object.values(PRIORITIES).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: COLORS.textMuted, textTransform: 'uppercase' }}>Label</span>
            <select value={editLabel} onChange={(e) => setEditLabel(e.target.value)} style={{ padding: '4px', backgroundColor: COLORS.bg, color: COLORS.textMain, border: `1px solid ${COLORS.border}`, borderRadius: '0px' }}>
              {Object.values(LABELS).map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: COLORS.textMuted, textTransform: 'uppercase' }}>Due_Date</span>
            <input
              type="datetime-local"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              style={{ padding: '4px', backgroundColor: COLORS.bg, color: COLORS.textMain, border: `1px solid ${COLORS.border}`, borderRadius: '0px' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button onClick={handleCancel} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: 'transparent', color: COLORS.textMuted, border: `1px solid ${COLORS.border}`, borderRadius: '0px', fontSize: '0.7rem', textTransform: 'uppercase' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: COLORS.primary, color: COLORS.bg, border: 'none', borderRadius: '0px', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Save_Changes</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      padding: '1.2rem',
      border: `1px solid ${COLORS.border}`,
      backgroundColor: COLORS.cardBg,
      opacity: task.isCompleted ? 0.5 : 1,
      transition: 'all 0.2s ease',
      borderRadius: '0px',
      marginBottom: '1rem',
      boxShadow: 'none',
      borderLeft: `6px solid ${overdue ? COLORS.danger : getPriorityColor(task.priority)}`
    }}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => toggleComplete(task.id)}
        style={{
          marginTop: '4px',
          cursor: 'pointer',
          accentColor: COLORS.primary
        }}
      />
      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{
            textDecoration: task.isCompleted ? 'line-through' : 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            color: task.isCompleted ? COLORS.textMuted : COLORS.textMain,
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {task.title}
          </span>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 'bold',
            color: COLORS.accent,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: `1px solid ${COLORS.accent}`,
            padding: '2px 6px',
            borderRadius: '0px'
          }}>
            {task.label}
          </span>
        </div>

        {task.description && (
          <div style={{
            fontSize: '0.9rem',
            color: COLORS.textMuted,
            marginBottom: '12px',
            lineHeight: '1.5',
            fontFamily: 'sans-serif'
          }}>
            {task.description}
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          fontSize: '0.75rem',
          color: COLORS.textMuted,
          fontWeight: '500'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: getPriorityColor(task.priority), fontWeight: 'bold' }}>●</span>
            <span style={{ textTransform: 'uppercase' }}>{task.priority}</span>
          </div>
          {task.dueDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: overdue ? COLORS.danger : COLORS.accent }}>📅</span>
              <span style={{ color: overdue ? COLORS.danger : 'inherit', fontWeight: overdue ? 'bold' : 'normal' }}>
                {overdue && <span style={{ fontSize: '0.6rem', marginRight: '4px' }}>[OVERDUE] </span>}
                {new Date(task.dueDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>
          )}
          {task.lastEdited && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.7, fontStyle: 'italic' }}>
              <span style={{ fontSize: '0.65rem' }}>Edited: {new Date(task.lastEdited).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button
          onClick={() => setIsEditing(true)}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${COLORS.border}`,
            color: COLORS.textMuted,
            padding: '6px 10px',
            borderRadius: '0px',
            cursor: 'pointer',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.color = COLORS.textMain;
            e.target.style.borderColor = COLORS.borderStrong;
          }}
          onMouseOut={(e) => {
            e.target.style.color = COLORS.textMuted;
            e.target.style.borderColor = COLORS.border;
          }}
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${COLORS.border}`,
            color: COLORS.textMuted,
            padding: '6px 10px',
            borderRadius: '0px',
            cursor: 'pointer',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.color = COLORS.danger;
            e.target.style.borderColor = COLORS.danger;
          }}
          onMouseOut={(e) => {
            e.target.style.color = COLORS.textMuted;
            e.target.style.borderColor = COLORS.border;
          }}
        >
          Terminate
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
