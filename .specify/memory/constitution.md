<!--
Sync Impact Report:
Version change: 0.0.0 → 1.0.0 (MINOR: New principles and sections added)
List of modified principles:
  - PROJECT_NAME → AI-Native Interactive Humanoid Robotic Book
  - PRINCIPLE_1_NAME → Truthfulness
  - PRINCIPLE_2_NAME → Accuracy
  - PRINCIPLE_3_NAME → Reproducibility
  - PRINCIPLE_4_NAME → Transparency
  - PRINCIPLE_5_NAME → Safety
  - PRINCIPLE_6_NAME → Clarity
Added sections: Key Standards, Constraints, Success Criteria
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .specify/templates/commands/sp.constitution.md ✅ updated
Follow-up TODOs: None
-->
# AI-Native Interactive Humanoid Robotic Book Constitution

## Core Principles

### Truthfulness
Chatbot MUST answer ONLY from textbook when selected text is provided. This principle ensures the integrity of information presented to the user, preventing misinformation by strictly adhering to verified sources within the textbook.

### Accuracy
All content MUST strictly follow module specs and constraints. This guarantees that the generated book content and chatbot responses are technically correct and aligned with predefined architectural and functional requirements.

### Reproducibility
Book generation via Specext answering (MUST HAVE) - SpKitPlus MUST produce identical output from the same specs. This principle ensures consistency in content generation, allowing for reliable and verifiable builds of the textbook chapters from their specifications.

### Transparency
RAG retrieval MUST remain deterministic and controllable. This provides clarity on how information is sourced and processed, allowing developers to debug and audit the chatbot's knowledge retrieval mechanism effectively.

### Safety
No hallucination of hardware features not defined in the textbook. This is a critical safety measure to prevent the chatbot from generating misleading or dangerous information regarding physical or simulated hardware capabilities.

### Clarity
Language MUST be simple and instructional for beginners. This principle ensures the textbook is accessible and understandable for its target audience, facilitating learning and ease of use.

## Key Standards

- Textbook MUST be built using Docusaurus.
- All chapters MUST originate from SpecKitPlus specs (YAML).
- Claude Code MUST generate final markdown chapters from specs.
- Chatbot MUST support two modes:
  1. Selected Text Mode → Answer strictly from the provided text.
  2. RAG Mode → Retrieve top-K chunks from Qdrant and answer from them.
- Embedding model MUST be consistent across indexing and querying.
- Chunk size ~800–1200 tokens.
- Backend MUST expose `/query` API endpoint.
- Code MUST run locally and deploy on GitHub Pages/Vercel.
- Repo MUST be clean and reproducible on a fresh machine.

## Constraints

- Required functional components:
  - Minimum 4 textbook chapters
  - Fully working RAG chatbot
  - Selected-tecs written in SpecKitPlus format
  - Demo video (90 seconds)
- Hardware MAY be physical, simulated, or proxy (simulation allowed).
- Chatbot CANNOT fabricate hardware capabilities not defined in specs.
- All outputs MUST be consistent with textbook content.

## Success Criteria

- All chapters generated from specs and published in Docusaurus.
- Chatbot answers correctly and deterministically using selected text.
- No hallucination in selected-text mode.
- RAG retrieval returns correct, relevant textbook chunks.
- Clean UI + working chat widget inside the book.
- 90-second demo shows:
  1. Book
  2. Highlighted text → ask question
  3. Chatbot answering correctly
  4. Optional hardware/simulation demo
- Repo MUST include run instructions and public link.

## Governance

This constitution supersedes all other project practices. Amendments require formal documentation, approval, and a plan for migration or propagation of changes across dependent artifacts. All Pull Requests and code reviews MUST verify compliance with these principles. Justification is required for any increase in complexity.

**Version**: 1.0.0 | **Ratified**: 2025-12-04 | **Last Amended**: 2025-12-04
