# SpeckitPlus Command: sp.tasks

Generates implementation tasks based on a feature specification and plan

## Usage
```
/sp.tasks [feature-name]
```

## Process
1. Reads `specs/[feature-name]/spec.md` and `specs/[feature-name]/plan.md`
2. Creates detailed task list from tasks-template.md
3. Organizes tasks by user story priority (P1, P2, P3, etc.)
4. Creates `specs/[feature-name]/tasks.md`

## Input Requirements
- Existing spec.md and plan.md files in the corresponding specs directory

## Output
- Detailed task list organized by user story
- Dependencies and execution order defined
- Parallel execution opportunities identified