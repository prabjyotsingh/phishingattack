import os
import tempfile
import pytest
from app import create_app
from app.extensions import db as _db

@pytest.fixture()
def app():
	app = create_app("development")
	db_fd, db_path = tempfile.mkstemp()
	app.config.update(SQLALCHEMY_DATABASE_URI=f"sqlite:///{db_path}", TESTING=True)
	with app.app_context():
		_db.create_all()
	yield app

	os.close(db_fd)
	os.unlink(db_path)

@pytest.fixture()
def client(app):
	return app.test_client()

