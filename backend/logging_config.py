"""
Logging configuration for the Physical AI & Humanoid Robotics textbook project.
Provides structured logging for better debugging and monitoring.
"""
import logging
import sys
from datetime import datetime
from config import Config

def setup_logging():
    """
    Configure the logging system for the application
    """
    # Create a custom formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

    # Create a handler that writes to stdout
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)

    # Configure the root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.addHandler(handler)

    # Also set specific loggers for our modules
    logging.getLogger('agent').setLevel(logging.INFO)
    logging.getLogger('server').setLevel(logging.INFO)
    
    # Configure Qdrant client logger if needed
    logging.getLogger('qdrant_client').setLevel(logging.WARNING)
    
    return root_logger


def log_api_request(request, endpoint):
    """
    Log an API request with details
    """
    logger = logging.getLogger('api')
    
    logger.info(f"API request to {endpoint} | Method: {request.method} | "
                f"Remote Address: {request.remote_addr}")


def log_api_response(response, request_time=None):
    """
    Log an API response with details
    """
    logger = logging.getLogger('api')
    
    response_time_str = f" | Response Time: {request_time:.3f}s" if request_time else ""
    logger.info(f"API response | Status: {response.status_code}{response_time_str}")


def log_error(error_msg, context=None):
    """
    Log an error with optional context
    """
    logger = logging.getLogger('errors')
    
    context_str = f" | Context: {context}" if context else ""
    logger.error(f"Error occurred: {error_msg}{context_str}")


def log_performance(metric_name, value, unit="ms"):
    """
    Log a performance metric
    """
    logger = logging.getLogger('performance')
    
    logger.info(f"Performance metric - {metric_name}: {value} {unit}")


def init_logging():
    """
    Initialize the logging system
    """
    setup_logging()
    
    # Log the initialization
    logger = logging.getLogger('app')
    logger.info(f"Application logging initialized at {datetime.now().isoformat()}")
    
    # Log config summary at startup
    logger.info(f"Server starting on {Config.HOST}:{Config.PORT} with debug={Config.DEBUG}")


if __name__ == "__main__":
    # When run directly, initialize logging and test it
    init_logging()
    
    logger = logging.getLogger('test')
    logger.info("Logging test successful")
    logger.warning("This is a warning message")
    logger.error("This is an error message")