# Quickstart Guide: AI-Native Interactive Humanoid Robotic Book

**Date**: 2025-12-04
**Feature**: [AI-Native Interactive Humanoid Robotic Book](./specs/0001-robotic-book/spec.md)
**Plan**: [Implementation Plan](./specs/0001-robotic-book/plan.md)

This guide provides a quick overview of how to set up and run the AI-Native Interactive Humanoid Robotic Book project locally for development and testing.

## 1. Prerequisites

Ensure you have the following installed:
-   Git
-   Node.js (LTS version, for Docusaurus frontend)
-   Python 3.11+ (for FastAPI backend)
-   Docker (optional, for running Qdrant locally if not using a cloud instance)

## 2. Clone the Repository

```bash
git clone [repository-url]
cd [repository-name]
```

## 3. Frontend Setup (Docusaurus Textbook)

Navigate to the `frontend/` directory and install dependencies:

```bash
cd frontend
npm install
# or yarn install
```

To run the Docusaurus development server:

```bash
npm start
# or yarn start
```

The textbook should now be accessible in your browser at `http://localhost:3000`.

## 4. Backend Setup (FastAPI Chatbot)

Navigate to the `backend/` directory and set up a Python virtual environment:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Configure environment variables (e.g., Qdrant connection, OpenAI API key) in a `.env` file in the `backend/` directory. Refer to the `backend/.env.example` (if available) for required variables.

Run the FastAPI development server:

```bash
uvicorn src.api.main:app --reload
```

The chatbot API will be available at `http://localhost:8000` (or as configured). You can test the `/query` endpoint using tools like `curl`, Postman, or by accessing `http://localhost:8000/docs` for the Swagger UI.

## 5. Integrating Frontend and Backend (Development)

During development, ensure both the Docusaurus frontend and FastAPI backend are running concurrently. The frontend chat widget will be configured to send queries to the local backend API. Cross-Origin Resource Sharing (CORS) will need to be configured in the FastAPI backend to allow requests from the Docusaurus development server (`http://localhost:3000`).

## 6. Content Generation (SpecKitPlus)

Textbook chapters are generated from SpecKitPlus YAML specifications. Refer to the `.specify/` directory for scripts and templates. The general process involves:

1.  Creating/updating YAML specs in `specs/[feature-name]/`.
2.  Using Claude Code or a dedicated script to convert these specs into Markdown files in `docs/`.

For example (assuming a script exists):

```bash
# Example: This command would be run from the root of the project
# python .specify/scripts/generate_chapter.py --spec specs/0001-robotic-book/chapter1.yaml --output docs/chapter1.md
```

## Next Steps

-   Implement the Docusaurus chat widget to interact with the backend `/query` API.
-   Develop the backend RAG logic, including Qdrant integration and embedding generation.
-   Create initial SpecKitPlus YAML chapter specifications and generate Markdown content.
