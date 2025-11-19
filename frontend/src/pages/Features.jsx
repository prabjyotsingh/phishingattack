import React from 'react';
import { Card, CardContent } from '../components/Card';

const Item = ({ title, children }) => (
	<Card>
		<CardContent>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{children}</p>
		</CardContent>
	</Card>
);

const Features = () => {
	return (
		<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
			<h1 className="text-3xl font-bold">Features</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Item title="Real-time detection">Analyze URLs instantly and get verdicts.</Item>
				<Item title="URL analysis">Extract URL features and patterns for ML models.</Item>
				<Item title="Browser extension">Protect users on the fly while browsing.</Item>
				<Item title="Admin dashboard">Track usage, accuracy, and model status.</Item>
				<Item title="Dataset management">Upload and manage datasets for training.</Item>
				<Item title="Model info">View model version and last trained date.</Item>
			</div>
		</div>
	);
};

export default Features;


