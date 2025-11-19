from app import create_app
from app.extensions import db
from app.models.user import User
app = create_app()
with app.app_context():
    u = User.query.filter_by(email="nitin@example.com").first()
    if u:
        u.is_admin = True
        db.session.commit()
        print(f"Promoted user_id={u.id} to admin")
    else:
        print("User not found")
