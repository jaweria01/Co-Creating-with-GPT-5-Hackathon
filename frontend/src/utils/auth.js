const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export function isLoggedIn() {
  return !!localStorage.getItem('isLoggedIn');
}

export function getUserName() {
  return localStorage.getItem('userName') || '';
}

export async function loginUser(data) {
  // Mock for testing
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userName', data.username);
  return { ok: true };
  // Real backend call (uncomment when backend ready)
  /*
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', data.username);
  }
  return response;
  */
}

export async function signupUser(data) {
  // Mock for testing
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userName', data.username);
  return { ok: true };
  // Real backend call
  /*
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', data.username);
  }
  return response;
  */
}

export async function logoutUser() {
  // Mock for testing
  localStorage.clear();
  return { ok: true };
  // Real backend call
  /*
  const response = await fetch(`${API_BASE_URL}/logout`, { method: 'POST' });
  if (response.ok) {
    localStorage.clear();
  }
  return response;
  */
}