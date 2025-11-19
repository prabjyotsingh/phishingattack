import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';

const Feature = ({ title, desc }) => (
	<Card className="h-full">
		<CardContent>
			<h3 className="text-lg font-semibold mb-1">{title}</h3>
			<p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
		</CardContent>
	</Card>
);

const Home = () => {
	return (
		<div>
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid lg:grid-cols-2 gap-10 items-center">
					<div>
						<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
							AI Powered Phishing Detection
						</h1>
						<p className="mt-4 text-gray-600 dark:text-gray-300">
							Detect and prevent phishing attacks in real-time using machine learning and URL analysis.
						</p>
						<div className="mt-6 flex gap-3">
							<Link to="/detect"><Button>Check a URL</Button></Link>
							<Link to="/features"><Button variant="secondary">Learn More</Button></Link>
						</div>
					</div>
					<div className="relative">
						<div className="aspect-video rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800" />
						<div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-blue-600/10" />
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
				<h2 className="text-2xl font-semibold mb-6">Why choose our tool?</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Feature title="Real-time Detection" desc="Instantly analyze URLs and detect phishing attempts." />
					<Feature title="URL Intelligence" desc="Advanced heuristics and ML features for better accuracy." />
					<Feature title="Browser Extension" desc="Check links directly while browsing." />
					<Feature title="Admin Dashboard" desc="Monitor stats, manage datasets, and model info." />
				</div>
			</section>
		</div>
	);
};

export default Home;


