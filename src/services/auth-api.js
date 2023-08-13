import axios from 'axios';

export const $instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  $instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  $instance.defaults.headers['Authorization'] = '';
};

export async function register(userData) {
  const response = await $instance.post('/users/signup', userData);
  setToken(response.data.token);
  return response.data;
}

export async function login(userData) {
  const response = await $instance.post(`/users/login`, userData);
  setToken(response.data.token);
  return response.data;
}

export async function logout() {
  const response = await $instance.post(`/users/logout`);
  clearToken();
  return response.data;
}

export async function refresh() {
  const response = await $instance.get(`/users/current`);
  return response.data;
}
