---
id: 0004
title: Generate AI Native Robotic Book Tasks
stage: tasks
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: robotic-book
branch: 0001-robotic-book
user: user
command: /sp.tasks
labels: ["tasks", "create"]
links:
  spec: ./specs/0001-robotic-book/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - ./specs/0001-robotic-book/tasks.md
tests:
  - N/A
---

## Prompt

```text
# Tasks - Physical AI & Humanoid Robotics Textbook

## PHASE 1: Foundation Setup ⚙️

### Task 1.1: Install Claude Code
- [ ] Visit claude.com/product/claude-code
- [ ] Download and install CLI
- [ ] Verify installation: `claude-code --version`
- [ ] Login with Anthropic account

### Task 1.2:     module2: ['gazebo-setup', 'gazebo-physics', 'unity-rendering'],
    moduleClone Spec-Kit Plus
- [ ] Open terminal
- [ ] Run: `git clone https://github.com/panaversity/spec-kit-plus/`
- [ ] Navigate to folder: `cd spec-kit-plus`
- [ ] Read documentation: `README.md`

### Task 1.3: Initialize Docusaurus Project
- [ ] Install Node.js (v18+)
- [ ] Create new Docusaurus site: `npx create-docusaurus@latest robotics-textbook classic`
- [ ] Test local server: `npm start`
- [ ] Verify site opens at localhost:3000

### Task 1.4: GitHub Repository
- [ ] Create new public repo: "physical-ai-textbook"
- [ ] Initialize git: `git init`
- [ ] Add remote: `git remote add origin <your-repo-url>`
- [ ] First commit: `git add . && git commit -m "Initial setup"`
- [ ] Push: `git push -u origin main`

**Deliverable:** Working Docusaurus site + GitHub repo

---

## PHASE 2: Book Structure 📚

### Task 2.1: Create Table of Contents
- [ ] Open `sidebars.js`
- [ ] Add structure:
```javascript
  {
    intro: ['introduction', 'hardware-requirements'],
    module1: ['ros2-intro', 'ros2-nodes', 'ros2-urdf'],
3: ['isaac-sim', 'isaac-ros', 'nav2-planning'],
    module4: ['vla-intro', 'voice-commands', 'capstone-project']
  }
```

### Task 2.2: Create Chapter Files
- [ ] Create folder: `docs/intro/`
- [ ] Create files:
  - `introduction.md`
  - `hardware-requirements.md`
- [ ] Repeat for Module 1-4 folders
- [ ] Add frontmatter to each file:
```markdown
  ---
  sidebar_position: 1
  title: Introduction to Physical AI
  ---
```

### Task 2.3: Write Introduction Chapter
- [ ] Cover topics from Weeks 1-2:
  - Foundations of Physical AI
  - Embodied intelligence concepts
  - Humanoid robotics landscape
  - Sensor systems overview
- [ ] Add learning outcomes section
- [ ] Include visual diagrams

**Deliverable:** Complete book skeleton with navigation

---

## PHASE 3: Technical Content 📝

### Task 3.1: Module 1 - ROS 2 (Weeks 3-5)
- [ ] **Chapter 1: ROS 2 Introduction**
  - ROS 2 architecture
  - Core concepts overview
  - Installation guide
- [ ] **Chapter 2: Nodes, Topics, Services**
  - Node creation with rclpy
  - Publisher/Subscriber pattern
  - Service/Client pattern
  - Code examples
- [ ] **Chapter 3: URDF for Humanoids**
  - URDF syntax
  - Robot description format
  - Example humanoid URDF
  - Launch files

### Task 3.2: Module 2 - Gazebo & Unity (Weeks 6-7)
- [ ] **Chapter 1: Gazebo Setup**
  - Installation and configuration
  - World building
  - Physics engine parameters
- [ ] **Chapter 2: Sensor Simulation**
  - LIDAR simulation
  - Depth cameras (RealSense)
  - IMU integration
  - Collision detection

### Task 3.3: Module 3 - NVIDIA Isaac (Weeks 8-10)
- [ ] **Chapter 1: Isaac Sim**
  - Omniverse setup
  - USD assets
  - Photorealistic rendering
  - Synthetic data generation
- [ ] **Chapter 2: Isaac ROS**
  - VSLAM implementation
  - Hardware acceleration
  - Nav2 integration
- [ ] **Chapter 3: Path Planning**
  - Bipedal navigation
  - Obstacle avoidance
  - Dynamic replanning

### Task 3.4: Module 4 - VLA (Weeks 11-13)
- [ ] **Chapter 1: Voice-to-Action**
  - OpenAI Whisper integration
  - Voice command parsing
  - ROS 2 action triggers
- [ ] **Chapter 2: Cognitive Planning**
  - LLM for task planning
  - Natural language to ROS actions
  - Example: "Clean the room" → action sequence
- [ ] **Chapter 3: Capstone Project**
  - Project requirements
  - Implementation guide
  - Evaluation criteria

### Task 3.5: Add Assessments
- [ ] Create assessment page for each module
- [ ] Include:
  - Quiz questions
  - Coding assignments
  - Project rubrics

**Deliverable:** Complete textbook content (all modules)

---

## PHASE 4: RAG Chatbot Backend 🤖

### Task 4.1: Setup Backend Environment
- [ ] Create folder: `backend/`
- [ ] Initialize: `pip install fastapi uvicorn python-dotenv`
- [ ] Install dependencies:
```bash
  pip install openai qdrant-client psycopg2-binary langchain
```
- [ ] Create `.env` file for API keys

### Task 4.2: Database Setup
- [ ] **Neon Postgres:**
  - Sign up at neon.tech (free tier)
  - Create database: `robotics_textbook`
  - Save connection string
  - Create table: `chat_history`
- [ ] **Qdrant Cloud:**
  - Sign up at cloud.qdrant.io (free tier)
  - Create collection: `book_embeddings`
  - Save API key and URL

### Task 4.3: Document Embedding Pipeline
- [ ] Create `embeddings.py`
- [ ] Read all markdown files from `docs/`
- [ ] Split into chunks (500 tokens each)
- [ ] Generate embeddings using OpenAI
- [ ] Store in Qdrant with metadata

### Task 4.4: FastAPI Endpoints
- [ ] Create `main.py`
- [ ] Build endpoints:
```python
  @app.post("/chat")
  # General book questions

  @app.post("/selected-text")
  # Answer based on user-selected text

  @app.get("/health")
  # Health check
```
- [ ] Implement RAG logic:
  - Query → Embed → Search Qdrant → Retrieve context → LLM response

### Task 4.5: OpenAI ChatKit Integration
- [ ] Install: `pip install openai-chatkit`
- [ ] Configure ChatKit with OpenAI API
- [ ] Add conversation memory (store in Postgres)
- [ ] Test responses locally

**Deliverable:** Working chatbot API

---

## PHASE 5: Frontend Integration 🎨

### Task 5.1: Create Chatbot UI Component
- [ ] Create `src/components/Chatbot.js`
- [ ] Design chat interface:
  - Message history
  - Input field
  - Send button
  - Loading indicator

### Task 5.2: Add Text Selection Feature
- [ ] Create `src/components/TextSelector.js`
- [ ] Implement:
  - Detect text selection on page
  - Show "Ask about this" button
  - Send selected text to `/selected-text` endpoint

### Task 5.3: Integrate with Docusaurus
- [ ] Edit `docusaurus.config.js`
- [ ] Add chatbot to all pages via theme
- [ ] Style to match book theme
- [ ] Add toggle button (open/close chat)

### Task 5.4: Connect to Backend
- [ ] Configure API base URL in `.env`
- [ ] Use `fetch` or `axios` for API calls
- [ ] Handle loading states
- [ ] Display error messages

### Task 5.5: Testing
- [ ] Test general questions
- [ ] Test text selection feature
- [ ] Test error handling
- [ ] Test on mobile view

**Deliverable:** Functional embedded chatbot

---

## PHASE 6: Deployment 🚀

### Task 6.1: Deploy Docusaurus Book
- [ ] Configure GitHub Pages in `docusaurus.config.js`:
```javascript
  url: 'https://<username>.github.io',
  baseUrl: '/physical-ai-textbook/',
  organizationName: '<username>',
  projectName: 'physical-ai-textbook',
```
- [ ] Build: `npm run build`
- [ ] Deploy: `npm run deploy`
- [ ] Verify at GitHub Pages URL

### Task 6.2: Deploy FastAPI Backend
- [ ] Choose platform: Render/Railway/Vercel
- [ ] Create `requirements.txt`
- [ ] Add `Procfile` or deployment config
- [ ] Deploy and get public URL
- [ ] Update frontend API URL

### Task 6.3: Environment Variables
- [ ] Add to hosting platform:
  - `OPENAI_API_KEY`
  - `QDRANT_URL`
  - `QDRANT_API_KEY`
  - `NEON_CONNECTION_STRING`

### Task 6.4: Production Testing
- [ ] Test book loads correctly
- [ ] Test chatbot responds
- [ ] Test text selection works
- [ ] Check mobile responsiveness
- [ ] Verify all links work

**Deliverable:** Live website with working chatbot

---

## PHASE 7: Demo Video & Submission 🎬

### Task 7.1: Script Demo Video (Max 90 seconds)
- [ ] **0-10 sec:** Show book homepage, navigation
- [ ] **10-40 sec:** Ask chatbot a general question, show response
- [ ] **40-70 sec:** Select text, click "Ask about this", show answer
- [ ] **70-90 sec:** Explain RAG technology briefly

### Task 7.2: Record Video
- [ ] Use screen recording tool (OBS/QuickTime/NotebookLM)
- [ ] Record in HD (1080p)
- [ ] Add voiceover (English/Urdu)
- [ ] Keep under 90 seconds (judges stop watching after)

### Task 7.3: Upload & Submit
- [ ] Upload video to YouTube (unlisted) or Google Drive
- [ ] Get shareable link
- [ ] Fill form: https://forms.gle/CQsSEGM3GeCrL43c8
- [ ] Submit:
  - GitHub repo link
  - Deployed book URL
  - Demo video link
  - WhatsApp number
- [ ] Double-check all links work

### Task 7.4: Pre-Submission Checklist
- [ ] Book accessible publicly
- [ ] Chatbot responds correctly
- [ ] Video under 90 seconds
- [ ] All form fields filled
- [ ] Submitted before 6:00 PM, Nov 30, 2025

**Deliverable:** Submitted project

---

## BONUS TASKS (Optional) ⭐

### Bonus 1: Better-Auth Signup/Signin (+50 points)
- [ ] Install Better-Auth: https://www.better-auth.com/
- [ ] Create signup form with questions:
  - Software background (Python/ROS experience)
  - Hardware background (Robotics/Electronics)
- [ ] Store user profile in Neon Postgres
- [ ] Add login/logout UI

### Bonus 2: Content Personalization (+50 points)
- [ ] Add "Personalize" button at chapter start
- [ ] Adjust content based on user background:
  - Beginner: More explanations
  - Advanced: Skip basics, show advanced topics
- [ ] Use LLM to rewrite sections dynamically

### Bonus 3: Urdu Translation (+50 points)
- [ ] Add "اردو میں پڑھیں" button
- [ ] Integrate translation API (OpenAI or Google Translate)
- [ ] Store translations (cache for performance)
- [ ] Toggle between English/Urdu

### Bonus 4: Claude Code Subagents (+50 points)
- [ ] Create reusable subagents for:
  - Content generation
  - Code example generation
  - Diagram creation
- [ ] Document subagent usage in README

---

## Daily Checklist ✅
- [ ] Git commit with meaningful message
- [ ] Test changes locally
- [ ] Update task completion status
- [ ] Note any blockers

**Progress Tracker:**
- Phase 1: ⬜ | Phase 2: ⬜ | Phase 3: ⬜ | Phase 4: ⬜
- Phase 5: ⬜ | Phase 6: ⬜ | Phase 7: ⬜
```

## Response snapshot

The tasks.md file for "AI-Native Interactive Humanoid Robotic Book" has been successfully generated.

**Task File**: `./specs/0001-robotic-book/tasks.md`

**Summary**:
-   **Total Tasks**: 45
-   **Tasks per User Story**:
    -   User Story 1 (Read Textbook Chapter): 5 tasks (T011-T015)
    -   User Story 4 (Generate Chapters from Specs): 3 tasks (T016-T018)
    -   User Story 3 (Ask Question in RAG Mode): 6 tasks (T019-T024)
    -   User Story 2 (Ask Question from Selected Text): 9 tasks (T025-T033)
-   **Parallel Opportunities**: Identified throughout with `[P]` labels, and outlined in the "Parallel Opportunities" section.
-   **Independent Test Criteria**: Provided for each user story in its respective phase.
-   **Suggested MVP Scope**: User Story 1 (Read Textbook Chapter) forms the initial MVP, followed by incremental delivery of other stories.

The tasks are organized by user story, with setup and foundational tasks preceding them, and a final phase for polish, deployment, and bonus features. Each task includes a checkbox, ID, appropriate labels, and file paths where applicable.

Suggested commit message:
`docs: generate tasks.md for AI-Native Humanoid Robotic Book feature
`

## Outcome

- ✅ Impact: Comprehensive task list generated, organized by user story with proper formatting.
- 🧪 Tests: N/A
- 📁 Files: Created `specs/0001-robotic-book/tasks.md`.
- 🔁 Next prompts: Proceed with implementation based on the generated tasks.
- 🧠 Reflection: Successfully generated tasks and mapped them to user stories. Bash script for PHR creation failed; used agent-native tools as fallback.

## Evaluation notes (flywheel)

- Failure modes observed: Bash script for PHR creation failed.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: Further investigate and resolve bash script execution issues.
