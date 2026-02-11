import os

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text


app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:root@db:5432/ipssi",
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")))