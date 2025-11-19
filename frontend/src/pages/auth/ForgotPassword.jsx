import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Card, CardContent } from '../../components/Card';
import { authApi } from '../../services/api';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [ok, setOk] = useState(false);
	const [loading, setLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await authApi.forgotPassword({ email });
		setOk(true);
		setLoading(false);
	};

	return (
		<div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-100">
			<h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
			<Card>
				<CardContent>
					<form onSubmit={submit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Email</label>
							<input type="email" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<Button type="submit" loading={loading}>Send reset link</Button>
						{ok && <p className="text-green-600 text-sm">If this email exists, a reset link was sent.</p>}
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ForgotPassword;


