from datetime import datetime

from extensions import db


class Victims(db.Model):
    __tablename__ = "victims"

    id = db.Column(db.Integer, primary_key=True)
    computer_name = db.Column(db.String(255), nullable=False)
    ip = db.Column(db.String(45), nullable=False)
    mac_address = db.Column(db.String(17), nullable=False)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    files = db.relationship(
        "Files",
        back_populates="victim",
        cascade="all, delete-orphan",
        lazy=True,
    )