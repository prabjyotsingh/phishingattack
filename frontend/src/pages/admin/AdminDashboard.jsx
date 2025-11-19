import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/Card';
import { adminApi } from '../../services/api';

const Stat = ({ label, value }) => (
	<Card>
		<CardContent>
			<div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
			<div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
		</CardContent>
	</Card>
);

const AdminDashboard = () => {
	const [stats, setStats] = useState(null);

	useEffect(() => {
		adminApi.dashboardStats().then(setStats).catch(console.error);
	}, []);

	return (
		<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-gray-900 dark:text-gray-100">
			<h1 className="text-3xl font-bold">Admin Dashboard</h1>
			{stats ? (
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<Stat label="Total Users" value={stats.totalUsers} />
					<Stat label="Total Requests" value={stats.totalRequests} />
					<Stat label="Phishing Rate" value={`${(stats.phishingRate * 100).toFixed(2)}%`} />
					<Stat label="Model Version" value={stats.modelVersion} />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default AdminDashboard;
