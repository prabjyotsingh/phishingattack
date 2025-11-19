import React from 'react';
import clsx from 'clsx';

export const Card = ({ className, children }) => {
	return (
		<div className={clsx('bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm', className)}>
			{children}
		</div>
	);
};

export const CardHeader = ({ className, children }) => (
	<div className={clsx('px-6 py-4 border-b border-gray-200 dark:border-gray-800', className)}>{children}</div>
);

export const CardContent = ({ className, children }) => (
	<div className={clsx('px-6 py-4', className)}>{children}</div>
);

export const CardFooter = ({ className, children }) => (
	<div className={clsx('px-6 py-4 border-t border-gray-200 dark:border-gray-800', className)}>{children}</div>
);

export default Card;


