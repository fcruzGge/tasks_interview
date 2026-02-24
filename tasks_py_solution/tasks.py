from typing import Protocol, Dict, List, Optional
from dataclasses import dataclass
import logging

logging.basicConfig(level=logging.INFO)


@dataclass
class Task:
    type: str
    status: str
    destination: Optional[str] = None
    payload: Optional[str] = None


# 1. Definimos el contrato (Interfaz) para cualquier manejador de tareas
class TaskHandler(Protocol):
    def execute(self, task: Task) -> None:
        """Ejecuta la lógica específica de la tarea. Lanza una excepción si falla."""
        pass


# 2. Implementaciones concretas (Cumplen con Single Responsibility)
class EmailHandler:
    def __init__(self, smtp_client=None):
        self._smtp_client = smtp_client  # Inyección de dependencia

    def execute(self, task: Task) -> None:
        logging.info("Conectando al servidor SMTP...")
        logging.info(f"Enviando correo a {task.destination} con el mensaje: {task.payload}")


class ReportHandler:
    def __init__(self, db_connection=None):
        self._db_connection = db_connection

    def execute(self, task: Task) -> None:
        logging.info("Conectando a la base de datos...")
        logging.info(f"Generando reporte PDF para {task.destination}")


class WhatsAppHandler:
    def __init__(self, whatsapp_client=None):
        self._whatsapp_client = whatsapp_client

    def execute(self, task: Task) -> None:
        logging.info("Conectando a WhatsApp API...")
        logging.info(f"Enviando WhatsApp a {task.destination}: {task.payload}")


class SMSHandler:
    def __init__(self, sms_client=None):
        self._sms_client = sms_client

    def execute(self, task: Task) -> None:
        logging.info("Conectando a SMS Gateway...")
        logging.info(f"Enviando SMS a {task.destination}: {task.payload}")


class PushHandler:
    def __init__(self, push_client=None):
        self._push_client = push_client

    def execute(self, task: Task) -> None:
        logging.info("Conectando a Push Notification Service...")
        logging.info(f"Enviando push a {task.destination}: {task.payload}")


# 3. El Orquestador (Cumple con Open/Closed Principle)
class TaskProcessor:
    def __init__(self, handlers: Dict[str, TaskHandler]):
        # Recibe el registro de handlers por el constructor
        self._handlers = handlers

    def process_and_notify(self, tasks: List[Task]) -> List[Task]:
        results = []
        for task in tasks:
            if task.status != "pending":
                continue

            handler = self._handlers.get(task.type)

            if not handler:
                logging.warning(f"Handler no encontrado para el tipo: {task.type}")
                task.status = "failed"
                results.append(task)
                continue

            try:
                handler.execute(task)
                task.status = "completed"
            except Exception as e:
                logging.error(f"Error procesando tarea {task.type}: {e}")
                task.status = "failed"

            results.append(task)

        return results
