# SpeckitPlus Command: sp.phr

Creates a Prompt History Record to document interactions

## Usage
```
/sp.phr [title] [stage]
```

## Process
1. Creates `history/prompts/[context]/[id]-[title].[stage].prompt.md` from phr-template.prompt.md
2. Captures the current prompt and response
3. Records metadata including date, user, model, and context
4. Routes to appropriate subdirectory based on stage

## Input Requirements
- title: Brief descriptive title for the interaction
- stage: One of [constitution, spec, plan, tasks, red, green, refactor, explainer, misc, general]

## Output
- Complete PHR with prompt, response, outcome, and evaluation
- Properly routed to feature-specific or general history directory