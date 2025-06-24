// src/api/timelogs.js
const API_URL = 'http://localhost:5002/api/timelogs';

export const getLogs = async (email) => {
  try {
    const res = await fetch(`${API_URL}?userEmail=${email}`);
    if (!res.ok) throw new Error('Nuk u morën logjet');
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const addLog = async (log) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });
  if (!res.ok) throw new Error('Gabim gjatë shtimit');
  return await res.json();
};

export const deleteLog = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Gabim gjatë fshirjes');
  return await res.json();
};

// ✅ FUNKSIONI UPDATE
export const updateLog = async (id, updatedLog) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedLog),
  });
  if (!res.ok) throw new Error('Gabim gjatë përditësimit');
  return await res.json();
};
