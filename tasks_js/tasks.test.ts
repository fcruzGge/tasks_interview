import { describe, it, expect } from 'vitest';
import { TaskProcessor, Task } from './tasks';

describe('TaskProcessor', () => {
  it('should process email tasks successfully', () => {
    const tasks: Task[] = [
      { type: 'email', status: 'pending', destination: 'test@example.com', payload: 'Test' }
    ];
    const processor = new TaskProcessor();
    const results = processor.processAndNotify(tasks);
    
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe('completed');
  });

  it('should process report tasks successfully', () => {
    const tasks: Task[] = [
      { type: 'report', status: 'pending', destination: 'admin' }
    ];
    const processor = new TaskProcessor();
    const results = processor.processAndNotify(tasks);
    
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe('completed');
  });

  it('should process whatsapp tasks successfully', () => {
    const tasks: Task[] = [
      { type: 'whatsapp', status: 'pending', destination: '+123456789', payload: 'Message' }
    ];
    const processor = new TaskProcessor();
    const results = processor.processAndNotify(tasks);
    
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe('completed');
  });

  it('should process whatsapp tasks successfully', () => {
    const tasks: Task[] = [
      { type: 'sms', status: 'pending', destination: '+123456789', payload: 'Alert' }
    ];
    const processor = new TaskProcessor();
    const results = processor.processAndNotify(tasks);
    
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe('completed');
  });

  it('should process push tasks successfully', () => {
    const tasks: Task[] = [
      { type: 'push', status: 'pending', destination: 'device123', payload: 'Notification' }
    ];
    const processor = new TaskProcessor();
    const results = processor.processAndNotify(tasks);
    
    expect(results).toHaveLength(1);
    expect(results[0].status).toBe('completed');
  });
});
