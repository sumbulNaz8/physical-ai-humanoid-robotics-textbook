# SpeckitPlus: Specification-Driven Development Framework

## Overview

SpeckitPlus is a comprehensive framework for specification-driven development that emphasizes structured planning, clear documentation, and systematic implementation. It is designed to help teams build complex projects with clear traceability from user requirements to implementation.

## Directory Structure

- `.specify/` - Framework configuration and templates
  - `memory/` - Project constitution and principles
  - `templates/` - Document templates for specs, plans, tasks, etc.
  - `scripts/` - Helper scripts for automation
  - `config.md` - Framework configuration

- `specs/` - Feature specifications organized by feature name
  - `[feature-name]/`
    - `spec.md` - Feature requirements and user stories
    - `plan.md` - Implementation plan
    - `tasks.md` - Detailed implementation tasks
    - `research.md` - Technical research and analysis
    - `data-model.md` - Data model definitions
    - `contracts/` - API contracts and interfaces
    - `quickstart.md` - Quick start guide for the feature

- `history/` - Historical records
  - `prompts/` - Prompt History Records (PHRs)
  - `adr/` - Architecture Decision Records (ADRs)

## Core Commands

### `/sp.spec [feature-name] [description]`
Creates a new feature specification document with user stories, requirements, and acceptance criteria.

### `/sp.plan [feature-name]`
Generates an implementation plan with technical context, project structure, and architectural decisions.

### `/sp.tasks [feature-name]`
Creates a detailed task list organized by user story priority with dependencies and execution order.

### `/sp.adr [decision-title]`
Documents an architectural decision with alternatives considered, consequences, and rationale.

### `/sp.phr [title] [stage]`
Creates a Prompt History Record to track development interactions and decisions.

### `/sp.checklist [feature-name] [checklist-type]`
Generates a checklist for validation, testing, or compliance purposes.

## Key Principles

1. **Specification First**: Define what you're building before implementing
2. **Traceability**: Clear path from user needs to implementation
3. **Modularity**: Features can be developed and tested independently
4. **Documentation**: All decisions and processes are recorded
5. **Iterative**: Build in small, testable increments

## Getting Started

1. Create a feature specification: `/sp.spec my-feature "Description of what this feature should do"`
2. Plan the implementation: `/sp.plan my-feature`
3. Generate tasks: `/sp.tasks my-feature`
4. Execute tasks following the generated task list
5. Document architecture decisions: `/sp.adr important-decision`
6. Record development interactions: `/sp.phr session-title stage`

## Best Practices

- Prioritize user stories as P1 (must have), P2 (should have), P3 (nice to have)
- Each user story should be independently testable
- Test requirements before implementation
- Complete foundational tasks before user stories
- Document significant decisions as ADRs
- Keep PHRs for important interactions and decisions