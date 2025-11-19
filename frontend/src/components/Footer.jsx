import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
	return (
		<footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="space-y-3">
						<Logo />
						<p className="text-gray-600 dark:text-gray-300 text-sm">
							Real-time AI protection against lookalike and homoglyph phishing attacks.
						</p>
					</div>
					<div>
						<h5 className="text-gray-900 dark:text-white font-semibold mb-2">Links</h5>
						<ul className="space-y-1 text-sm">
							<li><Link className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-300" to="/features">Features</Link></li>
							<li><Link className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-300" to="/extension">Extension</Link></li>
							<li><Link className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-300" to="/about">About</Link></li>
						</ul>
					</div>
					<div>
						<h5 className="text-gray-900 dark:text-white font-semibold mb-2">Social</h5>
						<div className="flex gap-3 text-sm">
							<a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-300" href="#" rel="noreferrer">Twitter</a>
							<a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-300" href="#" rel="noreferrer">GitHub</a>
							<a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-300" href="#" rel="noreferrer">LinkedIn</a>
						</div>
					</div>
				</div>
				<div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
					© {new Date().getFullYear()} AI Phishing Detector. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
