import React from 'react';
import clsx from 'clsx';

const base =
	'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2';

const variants = {
	primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
	secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-500',
	ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
};

import Spinner from './Spinner';

export const Button = ({ children, className, variant = 'primary', loading = false, ...props }) => (
	<button className={clsx(base, variants[variant], 'px-4 py-2', className)} disabled={loading || props.disabled} {...props}>
		{loading && <Spinner />}
		<span className="inline-flex items-center">{children}</span>
	</button>
);

export default Button;


