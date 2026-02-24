import { readFileSync } from "fs";
import {
  Task,
  TaskProcessor,
  TaskHandler,
  EmailHandler,
  ReportHandler,
  WhatsAppHandler,
  SMSHandler,
  PushHandler,
} from "./tasks";

async function main() {
  const tasks: Task[] = JSON.parse(readFileSync("data.json", "utf-8"));

  // Inyección de dependencias: registramos los handlers
  const handlers = new Map<string, TaskHandler>();
  handlers.set("email", new EmailHandler());
  handlers.set("report", new ReportHandler());
  handlers.set("whatsapp", new WhatsAppHandler());
  handlers.set("sms", new SMSHandler());
  handlers.set("push", new PushHandler());

  const taskProcessor = new TaskProcessor(handlers);
  const results = await taskProcessor.processAndNotify(tasks);
  console.log("\nResultados:", results);
}

main();
