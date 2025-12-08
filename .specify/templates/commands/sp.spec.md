# SpeckitPlus Command: sp.spec

Creates a new feature specification using the spec-template.md

## Usage
```
/sp.spec [feature-name] [feature-description]
```

## Process
1. Creates `specs/[feature-name]/spec.md` from spec-template.md
2. Fills in placeholders with provided arguments
3. Sets appropriate metadata (date, branch, etc.)

## Input Requirements
- feature-name: Short identifier for the feature
- feature-description: User description of what the feature should do

## Output
- New specification file ready for review and planning