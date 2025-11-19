import React from 'react';
import { Button } from './Button';

const Modal = ({ open, title, children, onClose, actions }) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />
			<div className="relative z-10 w-full max-w-lg rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800">
				<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
				</div>
				<div className="px-6 py-4 text-gray-700 dark:text-gray-200">{children}</div>
				<div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2">
					<Button variant="secondary" onClick={onClose}>Close</Button>
					{actions}
				</div>
			</div>
		</div>
	);
};

export default Modal;


