from flask import Blueprint
from flask_limiter.util import get_remote_address
from ..controllers.predict_controller import predict
from ..extensions import limiter

bp = Blueprint("predict", __name__)

# Rate limit predict more strictly
limiter.limit("30/minute")(bp)

bp.post("/predict")(predict)

