const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

async function request(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      "x-api-key": API_KEY,
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(API_URL + endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export function getAllChickens() {
  return request(`/all`);
}

export function submitChicken(chicken) {
  return request(`/new`, { 
    body: chicken,
    method: 'POST'
  });
}

export function updootChicken(id) {
  return request(`/updoot`, {
    body: { id },
    method: 'PUT'
  });
}

export function downdootChicken(id) {
  return request(`/downdoot`, {
    body: { id },
    method: 'PUT'
  });
}

export function deleteChicken(id) {
  return request(`/delete`, {
    body: { id },
    method: 'DELETE'
  });
}