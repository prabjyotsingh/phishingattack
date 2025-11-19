import React from 'react';
import logo from '../assets/logo.svg';
import clsx from 'clsx';

const Logo = ({ withText = true, className }) => (
	<div className={clsx('flex items-center gap-2', className)}>
		<img src={logo} alt="AI Phishing Detector logo" className="h-9 w-9" />
		{withText && (
			<div className="flex flex-col leading-tight">
				<span className="text-base font-semibold text-gray-900 dark:text-white">AI Phishing</span>
				<span className="text-xs uppercase tracking-wide text-blue-600 dark:text-cyan-300">Detector</span>
			</div>
		)}
	</div>
);

export default Logo;


