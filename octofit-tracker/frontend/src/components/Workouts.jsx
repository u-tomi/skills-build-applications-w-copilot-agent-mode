import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { CollectionState } from './CollectionState.jsx';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch(() => setState({ loading: false, error: 'Workouts could not be loaded.' })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Designed for today</p><h1>Suggested workouts</h1></div><span className="count-badge">{workouts.length} sessions</span></div><CollectionState {...state} empty={!workouts.length}><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-top"><span className="difficulty">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="exercise-tags">{(workout.exercises || []).slice(0, 3).map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div></CollectionState></section>;
}