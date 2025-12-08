# SpeckitPlus Command: sp.plan

Creates an implementation plan based on a feature specification

## Usage
```
/sp.plan [feature-name]
```

## Process
1. Reads `specs/[feature-name]/spec.md`
2. Analyzes requirements and dependencies
3. Creates `specs/[feature-name]/plan.md` from plan-template.md
4. Includes research findings, architectural decisions, and project structure

## Input Requirements
- Existing spec.md file in the corresponding specs directory

## Output
- Implementation plan with technical context, architecture, and project structure
- Additional research documents if needed