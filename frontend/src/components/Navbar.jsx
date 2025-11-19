import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import Button from './Button';
import clsx from 'clsx';
import Logo from './Logo';

const navItemClass = ({ isActive }) =>
	clsx(
		'px-3 py-2 rounded-md text-sm font-medium transition-colors',
		isActive
			? 'text-blue-600 dark:text-blue-400'
			: 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
	);

const Navbar = () => {
	const { theme, toggle } = useTheme();

	return (
		<header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link to="/" className="flex items-center gap-2">
						<Logo />
					</Link>
					<nav className="hidden md:flex items-center gap-1">
						<NavLink to="/" className={navItemClass} end>Home</NavLink>
						<NavLink to="/about" className={navItemClass}>About</NavLink>
						<NavLink to="/features" className={navItemClass}>Features</NavLink>
						<NavLink to="/contact" className={navItemClass}>Contact</NavLink>
						<NavLink to="/extension" className={navItemClass}>Extension</NavLink>
						<NavLink to="/detect" className={navItemClass}>Check URL</NavLink>
						<NavLink to="/history" className={navItemClass}>History</NavLink>
						<NavLink to="/admin" className={navItemClass}>Admin</NavLink>
					</nav>
					<div className="flex items-center gap-2">
						<Button variant="secondary" onClick={toggle} aria-label="Toggle theme">
							{theme === 'dark' ? '☀️' : '🌙'}
						</Button>
						<Link to="/login">
							<Button>Login</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;


