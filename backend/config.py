"""
Configuration management for the Physical AI & Humanoid Robotics textbook project.
Handles environment variables, validation, and default settings.
"""
import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration class to manage application settings"""

    # Cohere Configuration
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY", "")
    COHERE_MODEL: str = os.getenv("COHERE_MODEL", "command-r-08-2024")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "embed-english-v3.0")

    # Qdrant Configuration
    QDRANT_URL: str = os.getenv("QDRANT_URL", "https://462dfbac-266e-4b8c-9df8-b96019ef5c90.us-east4-0.gcp.cloud.qdrant.io:6333")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.rBzWonzS7A0Xkd12eU8LDr1BwDr_FS64Ug7wgvOpFGY")
    DEFAULT_COLLECTION_NAME: str = os.getenv("DEFAULT_COLLECTION_NAME", "physical-ai-humanoid-robotics-textbook")

    # Application Configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "5000"))
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    # RAG Configuration
    DEFAULT_RETRIEVAL_LIMIT: int = int(os.getenv("DEFAULT_RETRIEVAL_LIMIT", "5"))
    MAX_RETRIEVAL_LIMIT: int = int(os.getenv("MAX_RETRIEVAL_LIMIT", "100"))

    # Google Cloud Configuration for Translation API
    GOOGLE_CLOUD_PROJECT_ID: str = os.getenv("GOOGLE_CLOUD_PROJECT_ID", "")


    # Embedding configuration
    EMBEDDING_VECTOR_SIZE: int = int(os.getenv("EMBEDDING_VECTOR_SIZE", "1024"))


def validate_config() -> tuple[bool, list[str]]:
    """
    Validate the configuration settings
    
    Returns:
        Tuple of (is_valid, list_of_errors)
    """
    errors = []
    
    # Validate Cohere API key
    if not Config.COHERE_API_KEY or Config.COHERE_API_KEY == "your_cohere_api_key_here":
        errors.append("COHERE_API_KEY is not set or is using default placeholder value")
    
    # Validate port number
    if Config.PORT <= 0 or Config.PORT > 65535:
        errors.append(f"PORT must be between 1 and 65535, got {Config.PORT}")
    
    # Validate retrieval limits
    if Config.DEFAULT_RETRIEVAL_LIMIT <= 0:
        errors.append(f"DEFAULT_RETRIEVAL_LIMIT must be positive, got {Config.DEFAULT_RETRIEVAL_LIMIT}")
    
    if Config.MAX_RETRIEVAL_LIMIT <= 0:
        errors.append(f"MAX_RETRIEVAL_LIMIT must be positive, got {Config.MAX_RETRIEVAL_LIMIT}")
    
    if Config.DEFAULT_RETRIEVAL_LIMIT > Config.MAX_RETRIEVAL_LIMIT:
        errors.append(f"DEFAULT_RETRIEVAL_LIMIT ({Config.DEFAULT_RETRIEVAL_LIMIT}) cannot be greater than MAX_RETRIEVAL_LIMIT ({Config.MAX_RETRIEVAL_LIMIT})")
    
    # Validate Google Cloud Project ID
    if not Config.GOOGLE_CLOUD_PROJECT_ID:
        errors.append("GOOGLE_CLOUD_PROJECT_ID is not set.")

    return len(errors) == 0, errors


def print_config_summary():
    """Print a summary of the current configuration"""
    is_valid, errors = validate_config()
    
    print("Configuration Summary:")
    print("="*50)
    print(f"COHERE_API_KEY set: {'Yes' if Config.COHERE_API_KEY and Config.COHERE_API_KEY != 'your_cohere_api_key_here' else 'No'}")
    print(f"QDRANT_URL: {Config.QDRANT_URL}")
    print(f"DEFAULT_COLLECTION_NAME: {Config.DEFAULT_COLLECTION_NAME}")
    print(f"HOST: {Config.HOST}")
    print(f"PORT: {Config.PORT}")
    print(f"DEBUG: {Config.DEBUG}")
    print(f"DEFAULT_RETRIEVAL_LIMIT: {Config.DEFAULT_RETRIEVAL_LIMIT}")
    print(f"MAX_RETRIEVAL_LIMIT: {Config.MAX_RETRIEVAL_LIMIT}")
    print(f"GOOGLE_CLOUD_PROJECT_ID set: {'Yes' if Config.GOOGLE_CLOUD_PROJECT_ID else 'No'}")
    print("="*50)
    
    if errors:
        print("Configuration Errors:")
        for error in errors:
            print(f"  - {error}")
        print("="*50)
    
    print(f"Configuration Valid: {is_valid}")
    print("="*50)


if __name__ == "__main__":
    # When run directly, show configuration summary
    print_config_summary()