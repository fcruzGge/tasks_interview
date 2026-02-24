export interface Task {
  type: string;
  status: string;
  destination?: string;
  payload?: string;
}

export class TaskProcessor {
  public processAndNotify(tasks: Task[]): Task[] {
    const results: Task[] = [];

    for (const task of tasks) {
      if (task.status !== "pending") {
        continue;
      }

      // Lógica fuertemente acoplada y violación de OCP / SRP
      if (task.type === "email") {
        console.log("Conectando al servidor SMTP...");
        console.log(
          `Enviando correo a ${task.destination} con el mensaje: ${task.payload}`,
        );
        task.status = "completed";
        results.push(task);
      } else if (task.type === "report") {
        console.log("Conectando a la base de datos...");
        console.log(`Generando reporte PDF para ${task.destination}`);
        task.status = "completed";
        results.push(task);
      } else {
        console.log(`Tipo de tarea desconocido: ${task.type}`);
        task.status = "failed";
        results.push(task);
      }
    }

    return results;
  }
}
