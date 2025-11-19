import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/Card';
import { adminApi } from '../../services/api';

const AdminModelInfo = () => {
	const [info, setInfo] = useState(null);

	useEffect(() => {
		adminApi.modelInfo().then((res) => setInfo(res.data));
	}, []);

	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold mb-4">Model Information</h1>
			<Card>
				<CardContent>
					{info ? (
						<div className="space-y-2">
							<p><span className="font-medium">Version:</span> {info.version}</p>
							<p><span className="font-medium">Last Trained:</span> {new Date(info.lastTrained).toLocaleString()}</p>
							<p className="text-gray-700 dark:text-gray-300">{info.notes}</p>
						</div>
					) : (
						<p>Loading...</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminModelInfo;


