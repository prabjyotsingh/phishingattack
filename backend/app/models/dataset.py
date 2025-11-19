from datetime import datetime
from ..extensions import db

class Dataset(db.Model):
	__tablename__ = "datasets"
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(255), nullable=False)
	size = db.Column(db.String(64), nullable=True)
	uploaded_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

	def to_dict(self):
		return {
			"id": self.id,
			"name": self.name,
			"size": self.size,
			"uploadedAt": self.uploaded_at.isoformat(),
		}

