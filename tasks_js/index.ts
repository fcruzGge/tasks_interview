import { readFileSync } from "fs";
import { Task, TaskProcessor } from "./tasks";

const tasks: Task[] = JSON.parse(readFileSync("data.json", "utf-8"));

const taskProcessor = new TaskProcessor();
const results = taskProcessor.processAndNotify(tasks);
console.log("\nResultados:", results);
