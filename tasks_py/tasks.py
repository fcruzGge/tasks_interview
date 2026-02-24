from typing import List, Optional
from dataclasses import dataclass


@dataclass
class Task:
    type: str
    status: str
    destination: Optional[str] = None
    payload: Optional[str] = None


class TaskProcessor:
    def process_and_notify(self, tasks: List[Task]) -> List[Task]:
        results: List[Task] = []

        for task in tasks:
            if task.status != "pending":
                continue

            # Lógica fuertemente acoplada y violación de OCP / SRP
            if task.type == "email":
                print("Conectando al servidor SMTP...")
                print(f"Enviando correo a {task.destination} con el mensaje: {task.payload}")
                task.status = "completed"
                results.append(task)
            elif task.type == "report":
                print("Conectando a la base de datos...")
                print(f"Generando reporte PDF para {task.destination}")
                task.status = "completed"
                results.append(task)
            else:
                print(f"Tipo de tarea desconocido: {task.type}")
                task.status = "failed"
                results.append(task)

        return results
