import { useEffect, useState } from 'react';
import { displayDate, fetchCollection } from '../api.js';
import { CollectionState } from './CollectionState.jsx';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchCollection('activities').then(setActivities).catch(() => setState({ loading: false, error: 'Activities could not be loaded.' })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your movement log</p><h1>Recent activities</h1></div><span className="count-badge">{activities.length} logged</span></div><CollectionState {...state} empty={!activities.length}><div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><div className="activity-icon">↗</div><div className="activity-copy"><h2>{activity.type}</h2><p>{displayDate(activity.performedAt)} · {activity.durationMinutes} min</p></div><strong>{activity.calories} <small>kcal</small></strong></article>)}</div></CollectionState></section>;
}