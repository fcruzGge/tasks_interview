import json
from tasks import Task, TaskProcessor


def main():
    with open("data.json", "r") as f:
        tasks_data = json.load(f)

    tasks = [Task(**task_data) for task_data in tasks_data]

    processor = TaskProcessor()
    results = processor.process_and_notify(tasks)
    print("\nResultados:", results)


if __name__ == "__main__":
    main()
