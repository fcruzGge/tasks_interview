import pytest
from unittest.mock import Mock
from tasks import Task, TaskProcessor


def test_should_process_email_tasks_successfully():
    # ARRANGE
    mock_email_handler = Mock()
    handlers_registry = {"email": mock_email_handler}
    processor = TaskProcessor(handlers=handlers_registry)
    task = Task(type="email", status="pending", destination="test@example.com", payload="Test")

    # ACT
    results = processor.process_and_notify([task])

    # ASSERT
    mock_email_handler.execute.assert_called_once_with(task)
    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_process_report_tasks_successfully():
    # ARRANGE
    mock_report_handler = Mock()
    handlers_registry = {"report": mock_report_handler}
    processor = TaskProcessor(handlers=handlers_registry)
    task = Task(type="report", status="pending", destination="admin")

    # ACT
    results = processor.process_and_notify([task])

    # ASSERT
    mock_report_handler.execute.assert_called_once_with(task)
    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_process_whatsapp_tasks_successfully():
    # ARRANGE
    mock_whatsapp_handler = Mock()
    handlers_registry = {"whatsapp": mock_whatsapp_handler}
    processor = TaskProcessor(handlers=handlers_registry)
    task = Task(type="whatsapp", status="pending", destination="+123456789", payload="Message")

    # ACT
    results = processor.process_and_notify([task])

    # ASSERT
    mock_whatsapp_handler.execute.assert_called_once_with(task)
    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_process_sms_tasks_successfully():
    # ARRANGE
    mock_sms_handler = Mock()
    handlers_registry = {"sms": mock_sms_handler}
    processor = TaskProcessor(handlers=handlers_registry)
    task = Task(type="sms", status="pending", destination="+123456789", payload="Alert")

    # ACT
    results = processor.process_and_notify([task])

    # ASSERT
    mock_sms_handler.execute.assert_called_once_with(task)
    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_process_push_tasks_successfully():
    # ARRANGE
    mock_push_handler = Mock()
    handlers_registry = {"push": mock_push_handler}
    processor = TaskProcessor(handlers=handlers_registry)
    task = Task(type="push", status="pending", destination="device123", payload="Notification")

    # ACT
    results = processor.process_and_notify([task])

    # ASSERT
    mock_push_handler.execute.assert_called_once_with(task)
    assert len(results) == 1
    assert results[0].status == "completed"


def test_should_handle_unknown_task_type():
    # ARRANGE
    processor = TaskProcessor(handlers={})  # Sin handlers registrados
    task = Task(type="unknown", status="pending")

    # ACT
    results = processor.process_and_notify([task])

    # ASSERT
    assert results[0].status == "failed"


def test_should_mark_task_as_failed_if_handler_throws_error():
    # ARRANGE
    mock_failing_handler = Mock()
    mock_failing_handler.execute.side_effect = Exception("Network Error")
    handlers_registry = {"email": mock_failing_handler}
    processor = TaskProcessor(handlers=handlers_registry)
    task = Task(type="email", status="pending")

    # ACT
    results = processor.process_and_notify([task])

    # ASSERT
    assert results[0].status == "failed"
