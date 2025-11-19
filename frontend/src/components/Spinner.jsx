import React from 'react';
import clsx from 'clsx';

const Spinner = ({ className }) => (
	<span
		className={clsx(
			'inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent',
			'dark:border-gray-100 dark:border-t-transparent',
			className
		)}
	/>
);

export default Spinner;


