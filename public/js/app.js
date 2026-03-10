const API = '/api';

const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

const authHeaders = () =>
  state.token
    ? {
        Authorization: `Bearer ${state.token}`,
      }
    : {};

async function login(email, password) {
  const response = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

async function loadDesigners() {
  const response = await fetch(`${API}/designers`, { headers: authHeaders() });
  return response.json();
}

async function submitApplication(formEl) {
  const payload = new FormData(formEl);
  const response = await fetch(`${API}/apply`, {
    method: 'POST',
    body: payload,
  });
  return response.json();
}

window.CDA = { state, login, loadDesigners, submitApplication };
