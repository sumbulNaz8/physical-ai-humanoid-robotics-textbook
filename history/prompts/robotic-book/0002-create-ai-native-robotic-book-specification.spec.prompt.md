---
id: 0002
title: Create AI Native Robotic Book Specification
stage: spec
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: robotic-book
branch: 0001-robotic-book
user: user
command: /sp.specify
labels: ["spec", "create"]
links:
  spec: ./specs/0001-robotic-book/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - ./specs/0001-robotic-book/spec.md
  - ./specs/0001-robotic-book/checklists/requirements.md
tests:
  - N/A
---

## Prompt

```text
/sp.specify

# Requirements Specification
### Project: AI-Native Interactive Humanoid Robotic Book
### Components: Docusaurus Textbook + RAG Chatbot + SpecKitPlus + Claude Code

## 1. Project Overview
The AI-Native Humanoid Robotic Book is a digital textbook combined with an intelligent
- top-k ≥ 3

## 4. Frontend Requirements
- Chat widget inside Docusaurus
- Highlighted text must be sendable to `/query`

## 5. HarRAG-based chatbot.
It supports:
- Auto-generated chapters (SpecKitPlus + Claude Code)
- Selected Text Question Answering
- Full-document RAG
- Optional physical humanoid/simulation
- 90-second demo

## 2. Functional Requirements
### 2.1 Textbook (Docusaurus)
- Minimum 4 chapters
- All chapters generated from SpecKitPlus specs
- Must include objectives, examples, exercises, checks

### 2.2 Specification System
- Specs in YAML with title, goals, constraints, exercises
- Version-controlled

### 2.3 Content Generation
- Claude Code must convert specs → markdown
- Output stored in `docs/`
- Process must be reproducible

## 3. RAG Chatbot Requirements
### 3.1 Two Modes
1. Selected Text Mode → strict, no hallucination
2. RAG Mode → uses Qdrant

### 3.2 Backend API
POST /query with:
- question
- selected_text (optional)

Rules:
- selected_text → only use that
- else → retrieve top-k and answer

### 3.3 Vector Database
- Qdrant
- Embeddings consistent
- Chunk size 800–1200  dware (Optional)
Physical or simulated robot allowed
Simple actions only

## 6. Deployment
- Docusaurus on GitHub Pages/Vercel
- Backend locally runnable

## 7. Demo Requirements
- 90-second video showing:
  - Book
  - Selected text Q&A
  - RAG Q&A
  - Optional robot simulation

## 8. Success Criteria
- All chapters generated
- Selected-text answering perfect
- RAG accurate
- Clean UI
- Reproducible repo

## 9. Non-Functional Requirements
- Zero hallucination in selected mode
- Response time < 3 seconds
- Beginner-friendly writing
- Maintainable structure

## 10. Minimum Deliverable (MVP)
- Docusaurus book
- FastAPI backend
- RAG + selected-text
- Chat widget
- 90-sec demo
```

## Response snapshot

The feature specification for "AI-Native Interactive Humanoid Robotic Book" is complete.

**Branch**: `0001-robotic-book`
**Specification File**: `./specs/0001-robotic-book/spec.md`
**Checklist File**: `./specs/0001-robotic-book/checklists/requirements.md`

All quality checklist items have been passed, and all clarifications have been resolved. The specification is now ready for planning. You can proceed with `/sp.plan` to initiate the implementation planning workflow.

## Outcome

- ✅ Impact: Feature specification created and validated.
- 🧪 Tests: N/A
- 📁 Files: Created `specs/0001-robotic-book/spec.md` and `specs/0001-robotic-book/checklists/requirements.md`.
- 🔁 Next prompts: Proceed to planning with `/sp.plan`.
- 🧠 Reflection: Successfully created the feature specification and resolved user clarification. All checks passed.

## Evaluation notes (flywheel)

- Failure modes observed: Bash script for PHR creation failed, used agent-native tools as fallback.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: Investigate why the bash script for PHR creation failed.
