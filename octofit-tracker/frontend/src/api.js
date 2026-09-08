const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function toItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export async function fetchCollection(resource, endpoint = `${apiBaseUrl}/${resource}/`) {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Unable to load ${resource}`);
  return toItems(await response.json());
}

export function displayDate(value) {
  if (!value) return 'No date';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));
}