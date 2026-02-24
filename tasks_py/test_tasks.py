import pytest
from tasks import Task, TaskProcessor


def test_should_process_email_tasks_successfully():
    tasks = [Task(type="email", status="pending", destination="test@example.com", payload="Test")]
    processor = TaskProcessor()
    results = processor.process_and_notify(tasks)

    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_process_report_tasks_successfully():
    tasks = [Task(type="report", status="pending", destination="admin")]
    processor = TaskProcessor()
    results = processor.process_and_notify(tasks)

    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_fail_for_whatsapp_tasks():
    tasks = [Task(type="whatsapp", status="pending", destination="+123456789", payload="Message")]
    processor = TaskProcessor()
    results = processor.process_and_notify(tasks)

    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_fail_for_sms_tasks():
    tasks = [Task(type="sms", status="pending", destination="+123456789", payload="Alert")]
    processor = TaskProcessor()
    results = processor.process_and_notify(tasks)

    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_fail_for_push_tasks():
    tasks = [Task(type="push", status="pending", destination="device123", payload="Notification")]
    processor = TaskProcessor()
    results = processor.process_and_notify(tasks)

    assert len(results) == 1
    assert results[0].status == "completed"
