import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { CollectionState } from './CollectionState.jsx';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection('users').then((data) => setUsers(data)).catch(() => setState({ loading: false, error: 'Users could not be loaded.' })).finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Community</p><h1>People in motion</h1></div><span className="count-badge">{users.length} members</span></div><CollectionState {...state} empty={!users.length}><div className="user-grid">{users.map((user) => <article className="person-card" key={user._id}><div className="avatar">{(user.displayName || user.username || '?').slice(0, 1)}</div><div><h2>{user.displayName || user.username}</h2><p>@{user.username}</p><span>{user.goal || 'Building a healthier rhythm'}</span></div></article>)}</div></CollectionState></section>;
}