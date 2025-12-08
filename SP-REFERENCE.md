# SpeckitPlus Command Reference

SpeckitPlus is a comprehensive framework for specification-driven development. This document provides detailed information about all available commands.

## Windows Commands

### Batch Files
- `sp.bat` - Main command router for SpeckitPlus commands
- `sp-init.bat` - Initialization script for new projects

### Available Commands

#### `sp spec [feature-name] [description]`
Creates a new feature specification document with user stories, requirements, and acceptance criteria.

**Example**:
```
sp spec user-authentication "Implement user authentication with JWT tokens"
```

#### `sp plan [feature-name]`
Generates an implementation plan with technical context, project structure, and architectural decisions.

**Example**:
```
sp plan user-authentication
```

#### `sp tasks [feature-name]`
Creates a detailed task list organized by user story priority with dependencies and execution order.

**Example**:
```
sp tasks user-authentication
```

#### `sp adr [decision-title]`
Documents an architectural decision with alternatives considered, consequences, and rationale.

**Example**:
```
sp adr "database-choice"
```

#### `sp phr [title] [stage]`
Creates a Prompt History Record to track development interactions and decisions.

**Example**:
```
sp phr "authentication-implementation" "red"
```

## PowerShell Script

- `.specify\scripts\powershell\sp.ps1` - PowerShell implementation of SpeckitPlus commands
- `.specify\scripts\powershell\SpeckitPlus.psm1` - PowerShell module with helper functions

## Shell Script

- `sp.sh` - Bash implementation for Unix-like systems (cross-platform compatibility)

## Directory Structure

### `.specify/` - Framework Configuration
- `memory/` - Project constitution and principles
- `templates/` - Document templates for specs, plans, tasks, etc.
- `scripts/` - Helper scripts for automation
- `config.md` - Framework configuration
- `README.md` - Documentation

### `specs/` - Feature Specifications
- `[feature-name]/` - Each feature gets its own directory
  - `spec.md` - Feature requirements and user stories
  - `plan.md` - Implementation plan
  - `tasks.md` - Detailed implementation tasks
  - `research.md` - Technical research and analysis
  - `data-model.md` - Data model definitions
  - `contracts/` - API contracts and interfaces
  - `quickstart.md` - Quick start guide for the feature

### `history/` - Historical Records
- `prompts/` - Prompt History Records (PHRs)
- `adr/` - Architecture Decision Records (ADRs)

## Getting Started

1. Initialize your SpeckitPlus project:
   ```
   sp-init.bat
   ```

2. Create a feature specification:
   ```
   sp spec my-feature "Description of what this feature should do"
   ```

3. Plan the implementation:
   ```
   sp plan my-feature
   ```

4. Generate tasks:
   ```
   sp tasks my-feature
   ```

5. Execute tasks following the generated task list

6. Document architecture decisions:
   ```
   sp adr important-decision
   ```

7. Record development interactions:
   ```
   sp phr session-title stage
   ```

## Key Principles

1. **Specification First**: Define what you're building before implementing
2. **Traceability**: Clear path from user needs to implementation
3. **Modularity**: Features can be developed and tested independently
4. **Documentation**: All decisions and processes are recorded
5. **Iterative**: Build in small, testable increments