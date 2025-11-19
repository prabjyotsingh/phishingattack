import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Extension from './pages/Extension';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/auth/Profile';
import Detect from './pages/Detect';
import History from './pages/History';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDataset from './pages/admin/AdminDataset';
import AdminModelInfo from './pages/admin/AdminModelInfo';

function App() {
	return (
		<div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col">
			<Navbar />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/features" element={<Features />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/extension" element={<Extension />} />

					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/profile" element={<Profile />} />

					<Route path="/detect" element={<Detect />} />
					<Route path="/history" element={<History />} />

					<Route path="/admin" element={<AdminDashboard />} />
					<Route path="/admin/dataset" element={<AdminDataset />} />
					<Route path="/admin/model" element={<AdminModelInfo />} />

					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;