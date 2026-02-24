import json
from tasks import (
    Task,
    TaskProcessor,
    EmailHandler,
    ReportHandler,
    WhatsAppHandler,
    SMSHandler,
    PushHandler,
)


def main():
    with open("data.json", "r") as f:
        tasks_data = json.load(f)

    tasks = [Task(**task_data) for task_data in tasks_data]

    # Inyección de dependencias: registramos los handlers
    handlers = {
        "email": EmailHandler(),
        "report": ReportHandler(),
        "whatsapp": WhatsAppHandler(),
        "sms": SMSHandler(),
        "push": PushHandler(),
    }

    processor = TaskProcessor(handlers=handlers)
    results = processor.process_and_notify(tasks)
    print("\nResultados:", results)


if __name__ == "__main__":
    main()
