import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { detectionApi } from '../services/api';

const Detect = () => {
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);

	const submit = async (e) => {
		e.preventDefault();
		if (!url) return;
		setLoading(true);
		setResult(null);
		try {
			const res = await detectionApi.checkUrl(url);
			setResult(res.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
			<h1 className="text-3xl font-bold">Check a URL</h1>
			<Card>
				<CardContent>
					<form onSubmit={submit} className="flex gap-2">
						<input
							type="url"
							placeholder="https://example.com"
							className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							required
						/>
						<Button type="submit" disabled={loading}>{loading ? 'Scanning...' : 'Scan'}</Button>
					</form>
				</CardContent>
			</Card>
			{result && (
				<Card>
					<CardContent>
						<div className="flex items-center justify-between">
							<div>
								<div className="text-sm text-gray-500">{result.url}</div>
								<div className={`text-xl font-semibold ${result.result === 'phishing' ? 'text-red-600' : 'text-green-600'}`}>
									{result.result.toUpperCase()}
								</div>
							</div>
							<div className="text-sm">
								Confidence: <span className="font-semibold">{result.confidence}%</span>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Detect;


