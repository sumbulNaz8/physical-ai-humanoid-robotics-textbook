---
id: 0001
title: Update AI Native Robotic Book Constitution
stage: constitution
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution
labels: ["constitution", "update"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - ./.specify/memory/constitution.md
tests:
  - N/A
---

## Prompt

```text
/sp.constitution

Project:
AI-Native Interactive Humanoid Robotic Book
(Docusaurus Textbook + RAG Chatbot + SpecKitPlus)

Core principles:
- Truthfulness: Chatbot must answer ONLY from textbook when selected text is provided.
- Accuracy: All content must strictly follow module specs and constraints.
- Reproducibility: Book generation via Specext answering (MUST HAVE)
  - SpKitPlus must produce identical output from the same specs.
- Transparency: RAG retrieval must remain deterministic and controllable.
- Safety: No hallucination of hardware features not defined in the textbook.
- Clarity: Language must be simple and instructional for beginners.

Key standards:
- Textbook must be built using Docusaurus.
- All chapters must originate from SpecKitPlus specs (YAML).
- Claude Code must generate final markdown chapters from specs.
- Chatbot must support two modes:
  1. Selected Text Mode → Answer strictly from the provided text.
  2. RAG Mode → Retrieve top-K chunks from Qdrant and answer from them.
- Embedding model must be consistent across indexing and querying.
- Chunk size ~800–1200 tokens.
- Backend must expose `/query` API endpoint.
- Code must run locally and deploy on GitHub Pages/Vercel.
- Repo must be clean and reproducible on a fresh machine.

Constraints:
- Required functional components:
  - Minimum 4 textbook chapters
  - Fully working RAG chatbot
  - Selected-tecs written in SpecKitPlus format
  - Demo video (90 seconds)
- Hardware may be physical, simulated, or proxy (simulation allowed).
- Chatbot cannot fabricate hardware capabilities not defined in specs.
- All outputs must be consistent with textbook content.

Success criteria:
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
- Repo must include run instructions and public link.
```

## Response snapshot

The project constitution has been updated to version 1.0.0. This is a minor version bump due to the addition of new principles and sections.

The following templates require manual follow-up updates to ensure consistency with the new constitution:
- .specify/templates/plan-template.md
- .specify/templates/spec-template.md
- .specify/templates/tasks-template.md

Suggested commit message:
`docs: amend constitution to v1.0.0 (principle additions + governance update)`

## Outcome

- ✅ Impact: Constitution updated with new principles and sections.
- 🧪 Tests: No new tests added for constitution update.
- 📁 Files: Updated ./.specify/memory/constitution.md
- 🔁 Next prompts: Update dependent templates (plan, spec, tasks).
- 🧠 Reflection: Successfully updated constitution based on detailed user input. Need to propagate changes to other templates.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: Ensure consistency propagation to other templates.
