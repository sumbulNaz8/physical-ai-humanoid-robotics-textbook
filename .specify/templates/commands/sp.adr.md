# SpeckitPlus Command: sp.adr

Creates an Architecture Decision Record based on design decisions

## Usage
```
/sp.adr [decision-title]
```

## Process
1. Creates `history/adr/adr-[id]-[decision-title].md` from adr-template.md
2. Fills in decision context, alternatives, and consequences
3. Links to relevant specs and plans

## Input Requirements
- Clear decision title that describes the architectural choice

## Output
- ADR with decision, consequences, alternatives considered, and references