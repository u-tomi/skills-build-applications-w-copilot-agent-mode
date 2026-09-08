import { NavLink, Route, Routes } from 'react-router-dom';
import logo from '../../../docs/octofitapp-small.png';
import { apiBaseUrl } from './api.js';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navigation = [['/', 'Overview'], ['/activities', 'Activities'], ['/workouts', 'Workouts'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'People']];

function Overview() {
  return <section className="overview"><p className="eyebrow">Tuesday, September 8</p><h1>Small steps.<br /><em>Strong momentum.</em></h1><p className="intro">Your fitness is a practice, not a finish line. Pick a session, find your pace, and keep showing up.</p><div className="overview-links"><NavLink className="primary-action" to="/activities">View your activity <span>↗</span></NavLink><NavLink className="text-action" to="/workouts">Choose a workout</NavLink></div></section>;
}

function App() {
  return <div className="app-shell"><aside className="sidebar"><NavLink className="brand" to="/"><img src={logo} alt="OctoFit" /><span>OCTOFIT<small>TRACKER</small></span></NavLink><nav>{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}<span>↗</span></NavLink>)}</nav><div className="connection"><span className="pulse" />API connected<small>{apiBaseUrl.replace('/api', '')}</small></div></aside><main className="main-content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/workouts" element={<Workouts />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /></Routes></main></div>;
}

export default App;