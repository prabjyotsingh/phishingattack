import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/Card';
import { detectionApi } from '../services/api';

const History = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		detectionApi.history().then(setItems).catch(console.error);
	}, []);

	return (
		<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-100">
			<h1 className="text-3xl font-bold mb-4">Detection History</h1>
			<Card>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead>
								<tr className="text-left text-gray-500 dark:text-gray-400">
									<th className="py-2">URL</th>
									<th className="py-2">Result</th>
									<th className="py-2">Confidence</th>
									<th className="py-2">Date</th>
								</tr>
							</thead>
							<tbody>
								{items.map((i) => (
									<tr key={i.id} className="border-t border-gray-100 dark:border-gray-800">
										<td className="py-2 pr-4 break-all">{i.url}</td>
										<td className={`py-2 pr-4 ${i.result === 'phishing' ? 'text-red-500' : 'text-green-500'}`}>{i.result}</td>
										<td className="py-2 pr-4">{Math.round(i.confidence * 100)}%</td>
										<td className="py-2">{new Date(i.submitted_at || i.date).toLocaleString()}</td>
									</tr>
								))}
								{items.length === 0 && (
									<tr>
										<td colSpan={4} className="py-4 text-center text-gray-500 dark:text-gray-400">No scans yet.</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default History;
