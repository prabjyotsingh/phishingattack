from datetime import datetime
from ..extensions import db

class History(db.Model):
	__tablename__ = "history"
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
	url = db.Column(db.String(2048), nullable=False)
	result = db.Column(db.String(32), nullable=False)  # 'safe' or 'phishing'
	confidence = db.Column(db.Float, nullable=False, default=0.0)
	created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

	def to_dict(self):
		return {
			"id": self.id,
			"url": self.url,
			"result": self.result,
			"confidence": self.confidence,
			"date": self.created_at.isoformat(),
		}

