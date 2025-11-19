import React from 'react';

const About = () => {
	return (
		<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-3xl font-bold mb-4">About</h1>
			<p className="text-gray-700 dark:text-gray-300">
				This project aims to reduce phishing risks by applying AI/ML models to analyze URLs and related signals.
				It provides a modern UI, URL scanning, results with confidence, history tracking, and an admin panel to manage datasets and model info.
			</p>
		</div>
	);
};

export default About;


