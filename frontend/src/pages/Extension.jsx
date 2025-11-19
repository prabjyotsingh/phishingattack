import React from 'react';
import { Card, CardContent } from '../components/Card';

const Extension = () => {
	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
			<h1 className="text-3xl font-bold">Browser Extension</h1>
			<Card>
				<CardContent>
					<ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
						<li>Download the extension from the extension folder (coming soon).</li>
						<li>Open your browser’s extensions page and enable Developer Mode.</li>
						<li>Click “Load unpacked” and select the extension folder.</li>
						<li>Use the extension to check any link with one click.</li>
					</ol>
				</CardContent>
			</Card>
		</div>
	);
};

export default Extension;


