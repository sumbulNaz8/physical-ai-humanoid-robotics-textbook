# SpeckitPlus Configuration

## Project Settings
- **Project Name**: Physical AI & Humanoid Robotics Textbook
- **Version**: 1.0.0
- **Root Directory**: C:\Users\AG Computer\Documents\physical-ai-humanoid-robotics-textbook
- **Spec Directory**: ./specs
- **History Directory**: ./history
- **Template Directory**: ./.specify/templates

## Command Aliases
- `/sp.spec` - Create feature specification
- `/sp.plan` - Create implementation plan  
- `/sp.tasks` - Generate implementation tasks
- `/sp.adr` - Create architecture decision record
- `/sp.phr` - Create prompt history record
- `/sp.checklist` - Generate checklist

## Default Branch Pattern
- Feature branches: `[###]-[feature-name]`
- Release branches: `release/[version]`
- Hotfix branches: `hotfix/[issue]`

## File Patterns
- Specs: `specs/[feature]/spec.md`
- Plans: `specs/[feature]/plan.md`
- Tasks: `specs/[feature]/tasks.md`
- ADRs: `history/adr/[id]-[title].md`
- PHRs: `history/prompts/[context]/[id]-[title].[stage].prompt.md`

## Global Exclusions
- Node modules: `node_modules/`
- Build artifacts: `build/`
- IDE files: `.vscode/`, `.idea/`
- OS files: `.DS_Store`, `Thumbs.db`