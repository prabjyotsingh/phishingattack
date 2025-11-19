def test_signup_and_login(client):
	# Signup (allow idempotent runs)
	resp = client.post("/api/auth/signup", json={"name":"Test","email":"a@b.com","password":"secret123"})
	if resp.status_code not in (200,201):
		assert resp.status_code == 409
	else:
		data = resp.get_json()
		assert data["success"] is True
		assert "token" in data["data"]

	# Login
	resp2 = client.post("/api/auth/login", json={"email":"a@b.com","password":"secret123"})
	assert resp2.status_code == 200
	data2 = resp2.get_json()
	assert "token" in data2["data"]

