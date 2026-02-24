export type TaskStatus = "pending" | "completed" | "failed";

export interface Task {
  type: string;
  status: TaskStatus;
  destination?: string;
  payload?: string;
}

// Interfaz clave para el polimorfismo
export interface TaskHandler {
  execute(task: Task): Promise<void>;
}

// Implementaciones (SRP)
export class EmailHandler implements TaskHandler {
  constructor(private readonly smtpClient?: any) {}

  async execute(task: Task): Promise<void> {
    console.log("Conectando al servidor SMTP...");
    console.log(
      `Enviando correo a ${task.destination} con el mensaje: ${task.payload}`,
    );
  }
}

export class ReportHandler implements TaskHandler {
  constructor(private readonly dbConnection?: any) {}

  async execute(task: Task): Promise<void> {
    console.log("Conectando a la base de datos...");
    console.log(`Generando reporte PDF para ${task.destination}`);
  }
}

export class WhatsAppHandler implements TaskHandler {
  constructor(private readonly whatsappClient?: any) {}

  async execute(task: Task): Promise<void> {
    console.log("Conectando a WhatsApp API...");
    console.log(`Enviando WhatsApp a ${task.destination}: ${task.payload}`);
  }
}

export class SMSHandler implements TaskHandler {
  constructor(private readonly smsClient?: any) {}

  async execute(task: Task): Promise<void> {
    console.log("Conectando a SMS Gateway...");
    console.log(`Enviando SMS a ${task.destination}: ${task.payload}`);
  }
}

export class PushHandler implements TaskHandler {
  constructor(private readonly pushClient?: any) {}

  async execute(task: Task): Promise<void> {
    console.log("Conectando a Push Notification Service...");
    console.log(`Enviando push a ${task.destination}: ${task.payload}`);
  }
}

// El Orquestador (OCP)
export class TaskProcessor {
  constructor(private readonly handlers: Map<string, TaskHandler>) {}

  public async processAndNotify(tasks: Task[]): Promise<Task[]> {
    const results: Task[] = [];

    for (const task of tasks) {
      if (task.status !== "pending") continue;

      const handler = this.handlers.get(task.type);

      if (!handler) {
        console.warn(`No handler found for type: ${task.type}`);
        task.status = "failed";
        results.push(task);
        continue;
      }

      try {
        await handler.execute(task);
        task.status = "completed";
      } catch (error) {
        console.error(`Error processing task ${task.type}:`, error);
        task.status = "failed";
      }

      results.push(task);
    }

    return results;
  }
}
