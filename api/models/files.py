from datetime import datetime

from extensions import db


class Files(db.Model):
    __tablename__ = "files"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    path = db.Column(db.String(1024), nullable=False)
    content = db.Column(db.Text, nullable=False)

    victim_id = db.Column(db.Integer, db.ForeignKey("victims.id"), nullable=False)
    victim = db.relationship("Victims", back_populates="files")

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )