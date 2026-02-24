import { describe, it, expect, vi } from "vitest";
import { TaskProcessor, TaskHandler, Task } from "./tasks";

describe("TaskProcessor", () => {
  it("should process email tasks successfully", async () => {
    // ARRANGE
    const mockEmailHandler: TaskHandler = {
      execute: vi.fn().mockResolvedValue(undefined),
    };
    const handlersMap = new Map<string, TaskHandler>();
    handlersMap.set("email", mockEmailHandler);
    const processor = new TaskProcessor(handlersMap);
    const tasks: Task[] = [
      {
        type: "email",
        status: "pending",
        destination: "test@example.com",
        payload: "Test",
      },
    ];

    // ACT
    const results = await processor.processAndNotify(tasks);

    // ASSERT
    expect(mockEmailHandler.execute).toHaveBeenCalledTimes(1);
    expect(mockEmailHandler.execute).toHaveBeenCalledWith(tasks[0]);
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe("completed");
  });

  it("should process report tasks successfully", async () => {
    // ARRANGE
    const mockReportHandler: TaskHandler = {
      execute: vi.fn().mockResolvedValue(undefined),
    };
    const handlersMap = new Map<string, TaskHandler>();
    handlersMap.set("report", mockReportHandler);
    const processor = new TaskProcessor(handlersMap);
    const tasks: Task[] = [
      { type: "report", status: "pending", destination: "admin" },
    ];

    // ACT
    const results = await processor.processAndNotify(tasks);

    // ASSERT
    expect(mockReportHandler.execute).toHaveBeenCalledTimes(1);
    expect(mockReportHandler.execute).toHaveBeenCalledWith(tasks[0]);
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe("completed");
  });

  it("should process whatsapp tasks successfully", async () => {
    // ARRANGE
    const mockWhatsAppHandler: TaskHandler = {
      execute: vi.fn().mockResolvedValue(undefined),
    };
    const handlersMap = new Map<string, TaskHandler>();
    handlersMap.set("whatsapp", mockWhatsAppHandler);
    const processor = new TaskProcessor(handlersMap);
    const tasks: Task[] = [
      {
        type: "whatsapp",
        status: "pending",
        destination: "+123456789",
        payload: "Message",
      },
    ];

    // ACT
    const results = await processor.processAndNotify(tasks);

    // ASSERT
    expect(mockWhatsAppHandler.execute).toHaveBeenCalledTimes(1);
    expect(mockWhatsAppHandler.execute).toHaveBeenCalledWith(tasks[0]);
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe("completed");
  });

  it("should process sms tasks successfully", async () => {
    // ARRANGE
    const mockSMSHandler: TaskHandler = {
      execute: vi.fn().mockResolvedValue(undefined),
    };
    const handlersMap = new Map<string, TaskHandler>();
    handlersMap.set("sms", mockSMSHandler);
    const processor = new TaskProcessor(handlersMap);
    const tasks: Task[] = [
      {
        type: "sms",
        status: "pending",
        destination: "+123456789",
        payload: "Alert",
      },
    ];

    // ACT
    const results = await processor.processAndNotify(tasks);

    // ASSERT
    expect(mockSMSHandler.execute).toHaveBeenCalledTimes(1);
    expect(mockSMSHandler.execute).toHaveBeenCalledWith(tasks[0]);
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe("completed");
  });

  it("should process push tasks successfully", async () => {
    // ARRANGE
    const mockPushHandler: TaskHandler = {
      execute: vi.fn().mockResolvedValue(undefined),
    };
    const handlersMap = new Map<string, TaskHandler>();
    handlersMap.set("push", mockPushHandler);
    const processor = new TaskProcessor(handlersMap);
    const tasks: Task[] = [
      {
        type: "push",
        status: "pending",
        destination: "device123",
        payload: "Notification",
      },
    ];

    // ACT
    const results = await processor.processAndNotify(tasks);

    // ASSERT
    expect(mockPushHandler.execute).toHaveBeenCalledTimes(1);
    expect(mockPushHandler.execute).toHaveBeenCalledWith(tasks[0]);
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe("completed");
  });

  it("should mark task as failed if handler throws an error", async () => {
    // ARRANGE
    const mockFailingHandler: TaskHandler = {
      execute: vi.fn().mockRejectedValue(new Error("Network Error")),
    };
    const handlersMap = new Map([["email", mockFailingHandler]]);
    const processor = new TaskProcessor(handlersMap);
    const tasks: Task[] = [{ type: "email", status: "pending" }];

    // ACT
    const results = await processor.processAndNotify(tasks);

    // ASSERT
    expect(results[0].status).toBe("failed");
  });

  it("should handle unknown task type", async () => {
    // ARRANGE
    const processor = new TaskProcessor(new Map());
    const tasks: Task[] = [{ type: "unknown", status: "pending" }];

    // ACT
    const results = await processor.processAndNotify(tasks);

    // ASSERT
    expect(results[0].status).toBe("failed");
  });
});
