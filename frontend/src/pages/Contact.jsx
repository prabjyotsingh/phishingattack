import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';

const Contact = () => {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [sent, setSent] = useState(false);

	const submit = (e) => {
		e.preventDefault();
		setSent(true);
	};

	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold mb-6">Contact</h1>
			<Card>
				<CardContent>
					<form onSubmit={submit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1">Name</label>
							<input className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
						</div>
						<div>
							<label className="block text-sm mb-1">Email</label>
							<input type="email" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
						</div>
						<div>
							<label className="block text-sm mb-1">Message</label>
							<textarea className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
						</div>
						<Button type="submit">Send</Button>
						{sent && <p className="text-sm text-green-600 mt-2">Message sent (placeholder)</p>}
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Contact;


