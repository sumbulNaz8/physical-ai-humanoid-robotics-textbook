# Tasks: AI-Native Interactive Humanoid Robotic Book

**Input**: Design documents from `/specs/0001-robotic-book/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   **Single project**: `src/`, `tests/` at repository root
-   **Web app**: `backend/src/`, `frontend/src/`
-   **Mobile**: `api/src/`, `ios/src/` or `android/src/`
-   Paths shown below assume web app structure based on plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Install Claude Code CLI and verify installation: `claude-code --version`
- [ ] T002 Clone Spec-Kit Plus repository and read `README.md`: `git clone https://github.com/panaversity/spec-kit-plus/`
- [ ] T003 Initialize Docusaurus project: `npx create-docusaurus@latest frontend classic`
- [ ] T004 Create GitHub public repository and perform initial commit: `git push -u origin main`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create Docusaurus Table of Contents structure in `frontend/sidebars.js`
- [ ] T006 Create placeholder chapter files for Intro, Module 1-4 in `frontend/docs/`
- [ ] T007 Write the Introduction Chapter content in `frontend/docs/intro/introduction.md`
- [ ] T008 Create `backend/` directory and initialize Python environment: `pip install fastapi uvicorn python-dotenv`
- [ ] T009 Create `backend/requirements.txt` with initial dependencies
- [ ] T010 Create `backend/.env` file for API keys and configuration

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Read Textbook Chapter (Priority: P1) 🎯 MVP

**Goal**: Enable users to read textbook chapters in a Docusaurus-based book.

**Independent Test**: Navigate to any chapter, verify content readability and structure (objectives, examples, exercises, checks).

### Implementation for User Story 1

- [ ] T011 [P] [US1] Write Module 1 - ROS 2 Chapters in `frontend/docs/module1/`
- [ ] T012 [P] [US1] Write Module 2 - Gazebo & Unity Chapters in `frontend/docs/module2/`
- [ ] T013 [P] [US1] Write Module 3 - NVIDIA Isaac Chapters in `frontend/docs/module3/`
- [ ] T014 [P] [US1] Write Module 4 - VLA Chapters in `frontend/docs/module4/`
- [ ] T015 [US1] Add Assessments for each Module in `frontend/docs/<module>/`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 4 - Generate Chapters from Specs (Priority: P2)

**Goal**: Enable content creators to generate textbook chapters from YAML specifications.

**Independent Test**: Provide a valid YAML spec and verify Claude Code generates a correct Markdown chapter.

### Implementation for User Story 4

- [ ] T016 [US4] Implement Document Embedding Pipeline in `backend/src/services/embeddings.py`
- [ ] T017 [US4] Ensure markdown files from `frontend/docs/` are split into chunks (800-1200 tokens)
- [ ] T018 [US4] Generate embeddings using OpenAI and store in Qdrant with metadata

**Checkpoint**: At this point, User Stories 1 and 4 should be independently functional and testable.

---

## Phase 5: User Story 3 - Ask Question in RAG Mode (Priority: P2)

**Goal**: Enable users to ask general questions about the textbook in RAG mode.

**Independent Test**: Ask a general question, verify chatbot retrieves relevant chunks and provides an accurate answer.

### Implementation for User Story 3

- [ ] T019 [P] [US3] Setup Neon Postgres database and `chat_history` table
- [ ] T020 [P] [US3] Setup Qdrant Cloud collection `book_embeddings`
- [ ] T021 [US3] Create FastAPI `/chat` endpoint in `backend/src/api/main.py`
- [ ] T022 [US3] Implement RAG logic in `backend/src/services/rag_service.py`
- [ ] T023 [US3] Integrate OpenAI ChatKit for conversation memory in `backend/src/services/chat_kit_service.py`
- [ ] T024 [US3] Create `backend/src/models/chat_history.py` for chat history persistence

**Checkpoint**: User Stories 1, 3, and 4 should now be independently functional and testable.

---

## Phase 6: User Story 2 - Ask Question from Selected Text (Priority: P1)

**Goal**: Enable users to highlight text and ask questions strictly based on the selection.

**Independent Test**: Select text, ask question, verify chatbot answers exclusively from selected text.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Implement FastAPI `/selected-text` endpoint in `backend/src/api/main.py`
- [ ] T026 [US2] Implement selected text processing logic in `backend/src/services/selected_text_service.py`
- [ ] T027 [US2] Create Chatbot UI Component in `frontend/src/components/Chatbot.js`
- [ ] T028 [US2] Create styling for chatbot UI in `frontend/src/styles/chatbot.css`
- [ ] T029 [US2] Implement Text Selection Feature in `frontend/src/components/TextSelector.js`
- [ ] T030 [US2] Integrate Chatbot UI with Docusaurus theme in `frontend/docusaurus.config.js` and `frontend/src/theme/Root.js`
- [ ] T031 [US2] Configure frontend API base URL in `frontend/.env`
- [ ] T032 [US2] Create API call service in `frontend/src/services/api.js`
- [ ] T033 [US2] Implement frontend loading states and error message display

**Checkpoint**: All core user stories should now be independently functional and testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements, deployment, and demo submission.

- [ ] T034 [P] Deploy Docusaurus Book to GitHub Pages/Vercel: `npm run build && npm run deploy`
- [ ] T035 [P] Deploy FastAPI Backend to Render/Railway/Vercel
- [ ] T036 [P] Configure Environment Variables on hosting platforms
- [ ] T037 Perform end-to-end production testing of the deployed book and chatbot
- [ ] T038 Script Demo Video covering all core functionalities
- [ ] T039 Record Demo Video in HD with voiceover, under 90 seconds
- [ ] T040 Upload Demo Video and submit project to specified form
- [ ] T041 Review Pre-Submission Checklist for all requirements
- [ ] T042 [P] Implement Bonus 1: Better-Auth Signup/Signin functionality
- [ ] T043 [P] Implement Bonus 2: Content Personalization feature
- [ ] T044 [P] Implement Bonus 3: Urdu Translation feature
- [ ] T045 [P] Implement Bonus 4: Claude Code Subagents for content generation

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3-6)**: All depend on Foundational phase completion
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (P1 → P2 → P3)
-   **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

-   **User Story 1 - Read Textbook Chapter (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
-   **User Story 4 - Generate Chapters from Specs (P2)**: Can start after Foundational (Phase 2) - Needs content from US1 but primarily a backend/content generation task.
-   **User Story 3 - Ask Question in RAG Mode (P2)**: Can start after Foundational (Phase 2) - Relies on US4 for chunking/embeddings and US1 for content, but its core logic is independent.
-   **User Story 2 - Ask Question from Selected Text (P1)**: Can start after Foundational (Phase 2) - Depends on US1 for frontend text, and US3 for core backend RAG components (e.g. Qdrant, OpenAI integration).

### Within Each User Story

-   Tests (if included) MUST be written and FAIL before implementation
-   Models before services
-   Services before endpoints
-   Core implementation before integration
-   Story complete before moving to next priority

### Parallel Opportunities

-   Tasks marked [P] within a phase can run in parallel.
-   Once Foundational phase completes, certain user stories can start in parallel (e.g., US1 and initial parts of US4; US3 and US2 have more sequential dependencies).
-   Multiple user stories can be worked on in parallel by different team members, especially US1 (content writing), and US4 (embedding pipeline setup) can be somewhat independent initially.
-   Bonus tasks in Phase 7 are highly parallelizable once core functionality is deployed.

---

## Parallel Example: Phase 1 & 2 Setup

```bash
# Launch multiple setup tasks in parallel:
Task: "Install Claude Code CLI and verify installation"
Task: "Clone Spec-Kit Plus repository"

# Or, after foundational setup, prepare content in parallel:
Task: "Write Module 1 - ROS 2 Chapters"
Task: "Write Module 2 - Gazebo & Unity Chapters"
Task: "Write Module 3 - NVIDIA Isaac Chapters"
Task: "Write Module 4 - VLA Chapters"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1
4.  **STOP and VALIDATE**: Test User Story 1 independently (basic Docusaurus book with content)
5.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready (Basic Docusaurus book structure and backend environment)
2.  Add User Story 1 (Content writing) → Test independently → Deploy/Demo (Readable textbook)
3.  Add User Story 4 (Content generation/embedding) → Test independently → Deploy/Demo (Automated chapter generation and content ready for RAG)
4.  Add User Story 3 (RAG Chatbot) → Test independently → Deploy/Demo (Full RAG Q&A)
5.  Add User Story 2 (Selected Text Q&A) → Test independently → Deploy/Demo (Full interactive chatbot experience)
6.  Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    -   Developer A: User Story 1 (Content Creation)
    -   Developer B: User Story 4 (Embedding Pipeline, Spec-to-Markdown Tool)
    -   Developer C: User Story 3 (RAG Backend API & Database Setup)
    -   Developer D: User Story 2 (Frontend Chat Widget & Text Selection Integration)
3.  Stories complete and integrate independently.

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify tests fail before implementing
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
