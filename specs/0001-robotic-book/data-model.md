# Data Model: AI-Native Interactive Humanoid Robotic Book

**Date**: 2025-12-04
**Feature**: [AI-Native Interactive Humanoid Robotic Book](./specs/0001-robotic-book/spec.md)
**Plan**: [Implementation Plan](./specs/0001-robotic-book/plan.md)

## Key Entities and Relationships

### 1. Textbook Chapter
-   **Description**: A self-contained unit of learning content within the Docusaurus book.
-   **Attributes**:
    -   `id`: Unique identifier (UUID or auto-increment).
    -   `title`: Title of the chapter (string).
    -   `content_markdown`: The rendered Markdown content of the chapter (string).
    -   `spec_id`: Foreign key referencing the `SpecKitPlus Specification` that generated this chapter.
    -   `objectives`: List of learning objectives (string array).
    -   `examples`: List of code examples or illustrations (string array/JSON).
    -   `exercises`: List of practice exercises (string array/JSON).
    -   `checks`: List of knowledge check questions (string array/JSON).
    -   `version`: Version of the chapter content (semantic version string).
-   **Relationships**: Generated from `SpecKitPlus Specification`.

### 2. SpecKitPlus Specification
-   **Description**: A YAML document defining the structure, content, and metadata for a `Textbook Chapter`.
-   **Attributes**:
    -   `id`: Unique identifier (UUID or auto-increment).
    -   `filename`: Name of the YAML file (string).
    -   `content_yaml`: Raw YAML content (string).
    -   `title`: Title of the chapter defined in the spec (string).
    -   `goals`: Goals of the chapter (string array).
    -   `constraints`: Constraints for the chapter (string array).
    -   `version`: Version of the specification (semantic version string).
-   **Relationships**: Generates one `Textbook Chapter`.

### 3. Chatbot Query
-   **Description**: A user's natural language question submitted to the chatbot.
-   **Attributes**:
    -   `id`: Unique query ID (UUID).
    -   `question`: The user's question (string).
    -   `selected_text`: Optional, user-highlighted text from the textbook (string, max 500 characters).
    -   `mode`: 'selected_text' or 'rag' (enum string).
    -   `timestamp`: Time of query submission (datetime).
    -   `response_id`: Foreign key referencing the `Chatbot Response`.
-   **Relationships**: Leads to one `Chatbot Response`.

### 4. Chatbot Response
-   **Description**: The chatbot's answer to a user's query.
-   **Attributes**:
    -   `id`: Unique response ID (UUID).
    -   `query_id`: Foreign key referencing the `Chatbot Query`.
    -   `answer`: The chatbot's generated answer (string).
    -   `source_chunks`: List of `Text Chunk` IDs used for RAG mode (string array).
    -   `timestamp`: Time of response generation (datetime).
    -   `status`: 'success', 'no_relevant_info', 'error' (enum string).
    -   `error_message`: Optional, in case of error (string).
-   **Relationships**: One-to-one with `Chatbot Query`, potentially references multiple `Text Chunk`s.

### 5. Text Chunk
-   **Description**: A segment of the textbook content, typically 800-1200 tokens long, stored in the Qdrant vector database.
-   **Attributes**:
    -   `id`: Unique chunk identifier (UUID from Qdrant).
    -   `content`: The actual text content of the chunk (string).
    -   `chapter_id`: Foreign key referencing the `Textbook Chapter` it belongs to.
    -   `start_offset`: Starting character offset in the original chapter (integer).
    -   `end_offset`: Ending character offset in the original chapter (integer).
    -   `embedding`: Vector representation of the content (float array).
-   **Relationships**: Belongs to one `Textbook Chapter`, referenced by `Chatbot Response`.

### 6. Embedding Model
-   **Description**: An AI model responsible for converting text into numerical vector representations (embeddings).
-   **Attributes**:
    -   `id`: Unique model identifier (string).
    -   `name`: Name of the embedding model (e.g., 'text-embedding-ada-002') (string).
    -   `version`: Version of the model (string).
    -   `dimensions`: Dimensionality of the output vectors (integer).
-   **Relationships**: Used to generate `embedding` for `Text Chunk`s.