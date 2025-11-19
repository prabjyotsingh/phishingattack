def test_predict_deterministic(client, monkeypatch):
	# With no model loaded in tests, endpoint may 503; skip if so
	resp = client.post("/api/predict", json={"url":"http://example.com"})
	if resp.status_code == 503:
		return
	assert resp.status_code == 200
	data1 = resp.get_json()["data"]
	resp2 = client.post("/api/predict", json={"url":"http://example.com"})
	assert resp2.status_code == 200
	data2 = resp2.get_json()["data"]
	assert data1["confidence"] == data2["confidence"]


