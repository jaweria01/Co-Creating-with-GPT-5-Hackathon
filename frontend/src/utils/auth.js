// src/utils/auth.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function getUserName() {
  return localStorage.getItem('username') || '';
}

export async function loginUser({ emailOrUsername, password }) {
  // Mock for testing with localStorage
  if (emailOrUsername && password) {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('username', emailOrUsername);
    return { ok: true };
  } else {
    throw new Error('Invalid credentials');
  }
  // Real backend call (uncomment when backend ready)
  /*
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrUsername, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    return { ok: true };
  } else {
    throw new Error(data.error || 'Login failed');
  }
  */
}

export async function signupUser({ email, username, name, password, country }) {
  // Mock for testing with localStorage
  if (email && username && name && password && country) {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('username', username);
    return { ok: true };
  } else {
    throw new Error('Invalid signup data');
  }
  // Real backend call (uncomment when backend ready)
  /*
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, name, password, country }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    return { ok: true };
  } else {
    throw new Error(data.error || 'Signup failed');
  }
  */
}

export async function logoutUser() {
  // Mock for testing with localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  return { ok: true };
  // Real backend call (uncomment when backend ready)
  /*
  const response = await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
  if (response.ok) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  return response;
  */
}


// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// export function isLoggedIn() {
//   return !!localStorage.getItem('isLoggedIn');
// }

// export function getUserName() {
//   return localStorage.getItem('userName') || '';
// }

// export async function loginUser(data) {
//   // Mock for testing
//   localStorage.setItem('isLoggedIn', 'true');
//   localStorage.setItem('userName', data.username);
//   return { ok: true };
//   // Real backend call (uncomment when backend ready)
//   /*
//   const response = await fetch(`${API_BASE_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (response.ok) {
//     localStorage.setItem('isLoggedIn', 'true');
//     localStorage.setItem('userName', data.username);
//   }
//   return response;
//   */
// }

// export async function signupUser(data) {
//   // Mock for testing
//   localStorage.setItem('isLoggedIn', 'true');
//   localStorage.setItem('userName', data.username);
//   return { ok: true };
//   // Real backend call
//   /*
//   const response = await fetch(`${API_BASE_URL}/signup`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (response.ok) {
//     localStorage.setItem('isLoggedIn', 'true');
//     localStorage.setItem('userName', data.username);
//   }
//   return response;
//   */
// }

// export async function logoutUser() {
//   // Mock for testing
//   localStorage.clear();
//   return { ok: true };
//   // Real backend call
//   /*
//   const response = await fetch(`${API_BASE_URL}/logout`, { method: 'POST' });
//   if (response.ok) {
//     localStorage.clear();
//   }
//   return response;
//   */
// }