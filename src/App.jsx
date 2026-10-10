import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/molecules/TaskForm';
import TaskList from './components/organisms/TaskList';
import FilterBar from './components/molecules/FilterBar';
import { useTasks } from './context/TaskContext';
import { COLORS } from './constants/colors';

const STYLES = {
  container: {
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    color: COLORS.textMain,
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    padding: '0'
  },
  header: {
    backgroundColor: COLORS.cardBg,
    borderBottom: `1px solid ${COLORS.border}`,
    padding: '2.5rem 1rem',
    marginBottom: '0'
  },
  headerContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: '48px',
    height: '48px',
    backgroundColor: COLORS.primary,
    borderRadius: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.bg,
    fontWeight: 'bold',
    fontSize: '1.2rem',
    letterSpacing: '2px'
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: '700',
    margin: 0,
    color: COLORS.textMain,
    letterSpacing: '3px',
    textTransform: 'uppercase'
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: '0.8rem',
    margin: '4px 0 0 0',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  statusBadge: {
    color: COLORS.textMuted,
    fontSize: '0.75rem',
    fontWeight: '600',
    border: `1px solid ${COLORS.border}`,
    padding: '6px 14px',
    borderRadius: '0px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  nav: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1rem 0 1rem',
    display: 'flex',
    gap: '10px'
  },
  tabButton: (isActive) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: isActive ? COLORS.primary : 'transparent',
    color: isActive ? COLORS.bg : COLORS.textMain,
    border: `1px solid ${isActive ? COLORS.primary : COLORS.border}`,
    borderRadius: '0px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.2s ease'
  }),
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '3rem 1rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: `1px solid ${COLORS.textMain}`,
    paddingBottom: '12px',
    marginBottom: '12px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '400',
    margin: 0,
    color: COLORS.textMain,
    letterSpacing: '2px',
    textTransform: 'uppercase'
  },
  dateLabel: {
    fontSize: '0.8rem',
    color: COLORS.textMuted,
    fontFamily: 'monospace'
  }
};

function AppContent() {
  const { filterState, setFilterState } = useTasks();
  const [activeTab, setActiveTab] = useState('incoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'incoming') {
      setFilterState({ ...filterState, status: 'Active' });
    } else if (tab === 'completed') {
      setFilterState({ ...filterState, status: 'Completed' });
    }
  };

  return (
    <div style={STYLES.container}>
      <header style={STYLES.header}>
        <div style={STYLES.headerContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={STYLES.logo}>TOS</div>
            <div>
              <h1 style={STYLES.title}>Task Orchestration</h1>
              <p style={STYLES.subtitle}>Management System</p>
            </div>
          </div>
          <div style={STYLES.statusBadge}>System Operational</div>
        </div>
      </header>

      <nav style={STYLES.nav}>
        {[
          { id: 'incoming', label: 'Incoming' },
          { id: 'completed', label: 'Completed' },
          { id: 'create', label: 'New' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={STYLES.tabButton(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main style={STYLES.main}>
        {activeTab === 'create' ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <h2 style={{
                ...STYLES.sectionTitle,
                margin: '0 0 2rem 0',
                borderBottom: `1px solid ${COLORS.textMain}`,
                paddingBottom: '12px'
              }}>
                Next Task
              </h2>
              <TaskForm />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={STYLES.sectionHeader}>
              <h2 style={STYLES.sectionTitle}>
                {activeTab === 'incoming' ? 'Current Directives' : 'Archived Directives'}
              </h2>
              <div style={STYLES.dateLabel}>
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <FilterBar filters={filterState} setFilters={setFilterState} />
            <TaskList />
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
