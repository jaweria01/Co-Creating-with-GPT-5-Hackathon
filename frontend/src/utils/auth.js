const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function getUserName() {
  return localStorage.getItem('username') || '';
}

export async function loginUser({ username, password, idToken }) {
  // Mock for testing
  if (idToken) {
    // Simulate Google Sign-In backend validation
    localStorage.setItem('token', idToken);
    localStorage.setItem('username', username || 'Google User');
    return { ok: true };
  }
  if (username === 'test' && password === 'test123') {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('username', username);
    return { ok: true };
  }
  throw new Error('Invalid credentials');
}

export async function signupUser({ username, name, password, country, idToken }) {
  // Mock for testing
  if (idToken) {
    // Simulate Google Sign-Up backend validation
    localStorage.setItem('token', idToken);
    localStorage.setItem('username', username || name || 'Google User');
    return { ok: true };
  }
  if (username && password) {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('username', username);
    return { ok: true };
  }
  throw new Error('Invalid signup data');
}

export async function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  return { ok: true };
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