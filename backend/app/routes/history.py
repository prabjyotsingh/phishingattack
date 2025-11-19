from flask import Blueprint
from ..controllers.history_controller import list_history, admin_history

bp = Blueprint("history", __name__)

bp.get("/history")(list_history)
bp.get("/admin/history")(admin_history)

