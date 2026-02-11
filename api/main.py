import os

from flask import Flask
from sqlalchemy import text

from extensions import db


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:root@host.docker.internal:5432/ipssi",
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

from handlers.victims_handler import victims_bp
from models import Files, Victims

app.register_blueprint(victims_bp)


@app.get("/")
def health() -> tuple[dict, int]:
    return {"status": "ok"}, 200


@app.get("/db-health")
def db_health() -> tuple[dict, int]:
    try:
        db.session.execute(text("SELECT 1"))
        return {"database": "connected"}, 200
    except Exception as exc:
        return {"database": "error", "detail": str(exc)}, 500


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")))