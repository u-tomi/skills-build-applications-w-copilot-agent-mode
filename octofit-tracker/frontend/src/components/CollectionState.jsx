export function CollectionState({ loading, error, empty, children }) {
  if (loading) return <div className="state-message">Loading your tracker data...</div>;
  if (error) return <div className="state-message state-error">{error}</div>;
  if (empty) return <div className="state-message">No records yet.</div>;
  return children;
}