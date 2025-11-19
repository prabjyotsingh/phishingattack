import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

const api = axios.create({
	baseURL: API_BASE.replace(/\/$/, ''),
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

const unwrap = (response) => {
	const payload = response.data;
	if (payload?.success === false) {
		throw new Error(payload?.message || 'Request failed');
	}
	return payload?.data ?? payload;
};

const saveToken = (token) => {
	if (token) {
		localStorage.setItem('token', token);
	}
};

export const authApi = {
	async login({ email, password }) {
		const data = unwrap(await api.post('/api/auth/login', { email, password }));
		saveToken(data.token);
		return data;
	},
	async signup({ name, email, password }) {
		const data = unwrap(await api.post('/api/auth/signup', { name, email, password }));
		saveToken(data.token);
		return data;
	},
	async forgotPassword({ email }) {
		// Backend placeholder endpoint can be added later; for now simulate success.
		return { ok: true, email };
	},
	async profile() {
		const data = unwrap(await api.get('/api/user/profile'));
		return data.user;
	},
	async logout() {
		localStorage.removeItem('token');
	},
};

export const detectionApi = {
	async checkUrl(url) {
		const data = unwrap(await api.post('/api/predict', { url }));
		return data;
	},
	async history() {
		const data = unwrap(await api.get('/api/history'));
		return data;
	},
};

export const adminApi = {
	async dashboardStats() {
		const data = unwrap(await api.get('/api/admin/stats'));
		return data;
	},
	async history() {
		const data = unwrap(await api.get('/api/admin/history'));
		return data;
	},
	async uploadDataset(file) {
		const formData = new FormData();
		formData.append('file', file);
		return unwrap(await api.post('/api/admin/dataset', formData));
	},
	async listDataset() {
		return unwrap(await api.get('/api/admin/dataset'));
	},
};

