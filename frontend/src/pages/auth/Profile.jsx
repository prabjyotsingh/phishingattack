import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card, CardContent } from '../../components/Card';
import { authApi } from '../../services/api';

const Profile = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		authApi.profile().then((res) => setUser(res.data));
	}, []);

	const logout = () => {
		// Placeholder: clear token etc.
		navigate('/login');
	};

	return (
		<div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-2xl font-bold mb-4">Profile</h1>
			<Card>
				<CardContent>
					{user ? (
						<div className="space-y-2">
							<p><span className="font-medium">Name:</span> {user.name}</p>
							<p><span className="font-medium">Email:</span> {user.email}</p>
							<Button onClick={logout}>Logout</Button>
						</div>
					) : (
						<p>Loading...</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Profile;


