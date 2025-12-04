# Implementation Plan: AI-Native Interactive Humanoid Robotic Book

**Branch**: `0001-robotic-book` | **Date**: 2025-12-04 | **Spec**: ./specs/0001-robotic-book/spec.md
**Input**: Feature specification from `/specs/0001-robotic-book/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This project aims to create an AI-Native Interactive Humanoid Robotic Book, combining a Docusaurus-based textbook with a RAG-based chatbot. The core technical approach involves generating textbook chapters from SpecKitPlus YAML specifications using Claude Code, implementing a FastAPI backend for the RAG chatbot with Qdrant as the vector database, and integrating a chat widget into the Docusaurus frontend to support both selected text question answering and full-document RAG. A key aspect is ensuring reproducibility of content generation and strict adherence to content truthfulness.

## Technical Context

**Language/Version**: Python 3.11+ (Backend - FastAPI), Node.js (for Docusaurus), TypeScript/React (Frontend - Docusaurus)
**Primary Dependencies**: FastAPI, Qdrant, Docusaurus, React, OpenAI (for embeddings/chat model integration).
**Storage**: Qdrant (Vector Database), Neon Postgres (for metadata or other persistent data, as per user's input in /sp.plan command).
**Testing**: Pytest (Backend), Jest/React Testing Library (Frontend).
**Target Platform**: Local development (Windows, macOS, Linux), Deployment to GitHub Pages/Vercel (Frontend).
**Project Type**: Web application (combining Docusaurus static site with a FastAPI backend).
**Performance Goals**: Chatbot response time < 3 seconds for 95% of queries under expected load.
**Constraints**: Reproducible repository, zero hallucination in selected text mode, RAG chunk size 800-1200 tokens, minimum 4 chapters, 90-second demo video, hardware may be physical/simulated/proxy.
**Scale/Scope**: Minimum 4 textbook chapters, fully functional RAG chatbot, comprehensive specification system, integrated chat widget, and a 90-second demo showcasing all functionalities.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Truthfulness**: Chatbot MUST answer ONLY from textbook when selected text is provided. (Addressed by Selected Text Mode requirement and explicit hallucination constraint in spec.)
- [x] **Accuracy**: All content MUST strictly follow module specs and constraints. (Addressed by SpecKitPlus generation and validation processes.)
- [x] **Reproducibility**: Book generation via Specext answering (MUST HAVE) - SpKitPlus MUST produce identical output from the same specs. (Addressed by content generation requirements and demo criteria.)
- [x] **Transparency**: RAG retrieval MUST remain deterministic and controllable. (Addressed by explicit Qdrant usage, embedding consistency, and chunk size control.)
- [x] **Safety**: No hallucination of hardware features not defined in the textbook. (Explicitly stated as a constraint and non-functional requirement in the spec.)
- [x] **Clarity**: Language MUST be simple and instructional for beginners. (Addressed by Non-Functional Requirements in spec.)

## Project Structure

### Documentation (this feature)

```text
specs/0001-robotic-book/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/             # Data models for FastAPI (e.g., for /query payload, Qdrant interaction)
│   ├── services/           # Business logic for RAG, embedding, chat processing
│   └── api/                # FastAPI application, route definitions (e.g., /query endpoint)
└── tests/
    ├── unit/
    └── integration/

frontend/
├── src/
│   ├── components/         # React components for chat widget, text selection
│   ├── pages/              # Docusaurus pages/MDX files (generated chapters)
│   ├── services/           # Frontend API interaction, state management
│   └── styles/             # Docusaurus/React styling
└── tests/
    ├── unit/
    └── integration/

docs/                       # Docusaurus content output from SpecKitPlus
.specify/                   # SpecKitPlus templates and scripts
```

**Structure Decision**: The project will adopt a `backend/` and `frontend/` monorepo structure, alongside a `docs/` directory for Docusaurus generated content and `.specify/` for SpecKitPlus. This aligns with the web application project type and cleanly separates the chatbot API from the textbook UI, supporting independent deployment and local development as required.

## Complexity Tracking

> **No Constitution Check violations found that require justification.**