import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { CollectionState } from './CollectionState.jsx';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  useEffect(() => { fetchCollection('teams').then(setTeams).catch(() => setState({ loading: false, error: 'Teams could not be loaded.' })).finally(() => setState((current) => ({ ...current, loading: false }))); }, []);
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Collective energy</p><h1>Find your crew</h1></div><span className="count-badge">{teams.length} teams</span></div><CollectionState {...state} empty={!teams.length}><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id} style={{ '--team-color': team.color || '#ef8354' }}><div className="team-mark">{(team.name || 'T').slice(0, 1)}</div><h2>{team.name}</h2><p>{team.description}</p><footer>{team.memberIds?.length || 0} members <span>→</span></footer></article>)}</div></CollectionState></section>;
}