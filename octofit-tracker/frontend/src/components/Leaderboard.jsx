import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { CollectionState } from './CollectionState.jsx';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchCollection('leaderboard').then((data) => setEntries([...data].sort((a, b) => (a.rank || 99) - (b.rank || 99)))).catch(() => setState({ loading: false, error: 'Leaderboard could not be loaded.' })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Weekly challenge</p><h1>Leaderboard</h1></div><span className="count-badge">This week</span></div><CollectionState {...state} empty={!entries.length}><div className="leaderboard">{entries.map((entry) => <div className={`leader-row rank-${entry.rank}`} key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><div className="rank-avatar">{entry.userId?.displayName?.slice(0, 1) || '●'}</div><div className="rank-name">{entry.userId?.displayName || `Athlete ${entry.rank}`}<small>{entry.period || 'Current period'}</small></div><strong>{entry.points} <small>pts</small></strong></div>)}</div></CollectionState></section>;
}