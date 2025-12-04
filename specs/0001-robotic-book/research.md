# Research Notes: AI-Native Interactive Humanoid Robotic Book

**Date**: 2025-12-04
**Feature**: [AI-Native Interactive Humanoid Robotic Book](./specs/0001-robotic-book/spec.md)
**Plan**: [Implementation Plan](./specs/0001-robotic-book/plan.md)

## Core Technology Decisions & Rationale

### Backend Language & Framework: Python with FastAPI
-   **Decision**: Python with FastAPI for the RAG chatbot backend.
-   **Rationale**: Python is a dominant language in AI/ML and RAG ecosystems, offering extensive libraries (e.g., for embeddings, LLM interaction). FastAPI provides high performance, ease of use, and robust API development features, making it ideal for the `/query` endpoint.
-   **Alternatives considered**: Node.js with Express (less mature AI/ML ecosystem), Go with Gin (steeper learning curve for rapid prototyping in AI domain).

### Frontend Framework: Docusaurus with React/TypeScript
-   **Decision**: Docusaurus for the textbook, leveraging React/TypeScript for interactive components like the chat widget.
-   **Rationale**: Docusaurus is explicitly mentioned in the project requirements. It's a static site generator optimized for documentation, providing excellent content organization, search, and Markdown support. React/TypeScript are standard for building interactive web UIs.
-   **Alternatives considered**: Next.js (more complex than needed for a static textbook with embedded widget), VuePress (less ecosystem support than Docusaurus for this use case).

### Vector Database: Qdrant
-   **Decision**: Qdrant for storing and retrieving textbook content chunks.
-   **Rationale**: Qdrant is explicitly mentioned in the project requirements. It's a high-performance vector similarity search engine, well-suited for RAG applications due to its efficient indexing and querying capabilities for vector embeddings.
-   **Alternatives considered**: Pinecone, Weaviate (not specified in requirements, Qdrant is a direct requirement).

### Persistent Data Storage: Neon Postgres
-   **Decision**: Neon Postgres for metadata or other persistent data, as per user's input in the initial `/sp.plan` command.
-   **Rationale**: Postgres is a robust, widely-used relational database. Neon offers a serverless Postgres experience which can simplify deployment and scaling, especially for a project that might evolve beyond basic RAG to include user management or more complex data. Used as per user's suggestion.
-   **Alternatives considered**: SQLite (simpler but less scalable), MongoDB (NoSQL, not ideal if relational data is anticipated).

### Embedding & Chat Model Integration: OpenAI (Implied)
-   **Decision**: Utilize OpenAI models for text embeddings and potentially the core chat model within the RAG pipeline.
-   **Rationale**: While not explicitly stated, the mention of "OpenAI ChatKit integration" in the user's `sp.plan` input strongly implies the use of OpenAI's ecosystem for LLM capabilities. OpenAI models are industry leaders for embeddings and generative AI, providing high quality and widely supported APIs.
-   **Alternatives considered**: Hugging Face models, local LLMs (require more infrastructure/setup, higher inference cost for self-hosting), Anthropic Claude models (not implied by "OpenAI ChatKit").

## Unresolved Questions / Deferred Decisions

- None. All technical context elements were either explicitly provided, derived from the specification, or filled with standard, reasonable defaults.