import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card, CardContent } from '../../components/Card';
import { adminApi } from '../../services/api';

const AdminDataset = () => {
	const [file, setFile] = useState(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const loadDatasets = async () => {
		try {
			const data = await adminApi.listDataset();
			setItems(data);
		} catch (err) {
			setMessage(err.message || 'Failed to load datasets');
		}
	};

	useEffect(() => {
		loadDatasets();
	}, []);

	const upload = async (e) => {
		e.preventDefault();
		if (!file) return;
		setLoading(true);
		try {
			await adminApi.uploadDataset(file);
			setMessage('Dataset uploaded successfully.');
			setFile(null);
			await loadDatasets();
		} catch (err) {
			setMessage(err.message || 'Upload failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-gray-900 dark:text-gray-100">
			<h1 className="text-3xl font-bold">Dataset Management</h1>
			<Card>
				<CardContent>
					<form onSubmit={upload} className="flex flex-col gap-4 md:flex-row md:items-center">
						<input
							type="file"
							onChange={(e) => setFile(e.target.files?.[0] || null)}
							className="text-sm text-gray-700 dark:text-gray-300"
						/>
						<Button type="submit" loading={loading}>Upload</Button>
					</form>
					{message && <p className="mt-3 text-sm text-blue-600 dark:text-cyan-300">{message}</p>}
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					<h2 className="font-semibold mb-2">Uploaded Datasets</h2>
					<ul className="text-sm space-y-2">
						{items.map((i) => (
							<li key={i.id} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-2">
								<span>{i.name}</span>
								<span className="text-gray-500">{i.size} · {new Date(i.uploadedAt).toLocaleString()}</span>
							</li>
						))}
						{items.length === 0 && <li className="text-gray-500 dark:text-gray-400">No datasets uploaded yet.</li>}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminDataset;
