import json

def signup_and_login(client, email="nitin@example.com", password="StrongP@ssw0rd", name="Nitin"):
	client.post("/api/auth/signup", json={"name": name, "email": email, "password": password})
	r = client.post("/api/auth/login", json={"email": email, "password": password})
	assert r.status_code == 200
	data = r.get_json()["data"]
	return data["token"], data["user"]

def test_history_and_profile_association(client):
	token, user = signup_and_login(client)
	hdr = {"Authorization": f"Bearer {token}"}

	# Predict twice with same URL
	u = "http://example.com"
	r1 = client.post("/api/predict", headers=hdr, json={"url": u})
	r2 = client.post("/api/predict", headers=hdr, json={"url": u})
	assert r1.status_code == 200 and r2.status_code == 200
	c1 = r1.get_json()["data"]["confidence"]
	c2 = r2.get_json()["data"]["confidence"]
	assert c1 == c2  # deterministic

	# History
	hr = client.get("/api/history", headers=hdr)
	assert hr.status_code == 200
	items = hr.get_json()["data"]
	assert len(items) >= 2
	assert items[0]["url"] == u

	# Profile
	pr = client.get("/api/user/profile", headers=hdr)
	assert pr.status_code == 200
	p = pr.get_json()["data"]["user"]
	assert p["email"] == user["email"]
	assert p["name"] == user["name"]

def test_homoglyph_detection(client):
	# Use admin to authenticate
	client.post("/api/auth/signup", json={"name":"Admin","email":"admin@example.com","password":"Admin@123"})
	resp = client.post("/api/auth/login", json={"email":"admin@example.com","password":"Admin@123"})
	token = resp.get_json()["data"]["token"]
	hdr = {"Authorization": f"Bearer {token}"}

	urls = [
		"https://www.g00gle.com",
		"https://--www.g00gle.com",
		"https://xn--gogle-abc.com",
		"https://googIe.com",  # capital I
	]
	for u in urls:
		r = client.post("/api/predict", headers=hdr, json={"url": u})
		assert r.status_code == 200
		data = r.get_json()["data"]
		assert data["result"] == "phishing"
		assert data["confidence"] >= 0.7


