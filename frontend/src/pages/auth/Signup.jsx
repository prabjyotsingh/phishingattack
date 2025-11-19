import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card, CardContent } from '../../components/Card';
import { authApi } from '../../services/api';

const Signup = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			if (form.name.trim().length < 2) throw new Error('Name is too short');
			if (!/\S+@\S+\.\S+/.test(form.email)) throw new Error('Enter a valid email');
			if (form.password.length < 6) throw new Error('Password must be at least 6 characters');
			await authApi.signup(form);
			navigate('/profile');
		} catch (err) {
			setError(err.message || 'Signup failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-100">
			<h1 className="text-2xl font-bold mb-4">Create account</h1>
			<Card>
				<CardContent>
					<form onSubmit={submit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Name</label>
							<input className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
						</div>
						<div>
							<label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Email</label>
							<input type="email" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
						</div>
						<div>
							<label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Password</label>
							<input type="password" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
						</div>
						{error && <p className="text-sm text-red-600">{error}</p>}
						<Button type="submit" loading={loading}>Create account</Button>
						<div className="text-sm text-gray-700 dark:text-gray-300">
							Already have an account? <Link className="text-blue-600 dark:text-cyan-300" to="/login">Login</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Signup;


