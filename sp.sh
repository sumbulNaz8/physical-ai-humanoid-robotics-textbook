#!/bin/bash

# SpeckitPlus Command Router (Bash version)
# This script provides command-line access to SpeckitPlus functionality on Unix-like systems

# Function to display help
show_help() {
    echo "SpeckitPlus Commands:"
    echo "  sp spec [feature-name] [description]  - Create a new feature specification"
    echo "  sp plan [feature-name]                - Create an implementation plan"
    echo "  sp tasks [feature-name]               - Generate implementation tasks"
    echo "  sp adr [decision-title]               - Create an architecture decision record"
    echo "  sp phr [title] [stage]                - Create a prompt history record"
    echo "  sp help                               - Show this help"
}

# Process commands
case "$1" in
    "spec")
        if [ $# -ge 3 ]; then
            FEATURE_NAME="$2"
            DESCRIPTION="${@:3}"
            echo "Creating new specification for: $FEATURE_NAME"
            echo "Description: $DESCRIPTION"
            
            # Create feature directory
            mkdir -p "specs/$FEATURE_NAME"
            
            # Copy spec template
            if [ -f ".specify/templates/spec-template.md" ]; then
                sed -e "s/\[FEATURE NAME\]/$FEATURE_NAME/g" \
                    -e "s/\[DATE\]/$(date +%Y-%m-%d)/g" \
                    -e "s/\$ARGUMENTS/$DESCRIPTION/g" \
                    ".specify/templates/spec-template.md" > "specs/$FEATURE_NAME/spec.md"
                echo "Created spec: specs/$FEATURE_NAME/spec.md"
            else
                echo "Error: Template not found at .specify/templates/spec-template.md"
                exit 1
            fi
        else
            echo "Usage: sp spec [feature-name] [description]"
            exit 1
        fi
        ;;
        
    "plan")
        if [ $# -eq 2 ]; then
            FEATURE_NAME="$2"
            echo "Creating implementation plan for: $FEATURE_NAME"
            
            SPEC_PATH="specs/$FEATURE_NAME/spec.md"
            PLAN_PATH="specs/$FEATURE_NAME/plan.md"
            
            if [ -f "$SPEC_PATH" ]; then
                if [ -f ".specify/templates/plan-template.md" ]; then
                    sed -e "s/\[FEATURE\]/$FEATURE_NAME/g" \
                        -e "s/\[DATE\]/$(date +%Y-%m-%d)/g" \
                        ".specify/templates/plan-template.md" > "$PLAN_PATH"
                    echo "Created plan: $PLAN_PATH"
                else
                    echo "Error: Plan template not found"
                    exit 1
                fi
            else
                echo "Error: Spec file not found: $SPEC_PATH"
                exit 1
            fi
        else
            echo "Usage: sp plan [feature-name]"
            exit 1
        fi
        ;;
        
    "tasks")
        if [ $# -eq 2 ]; then
            FEATURE_NAME="$2"
            echo "Creating task list for: $FEATURE_NAME"
            
            TASKS_PATH="specs/$FEATURE_NAME/tasks.md"
            
            if [ -f ".specify/templates/tasks-template.md" ]; then
                sed -e "s/\[FEATURE NAME\]/$FEATURE_NAME/g" \
                    ".specify/templates/tasks-template.md" > "$TASKS_PATH"
                echo "Created tasks: $TASKS_PATH"
            else
                echo "Error: Tasks template not found"
                exit 1
            fi
        else
            echo "Usage: sp tasks [feature-name]"
            exit 1
        fi
        ;;
        
    "adr")
        if [ $# -ge 2 ]; then
            TITLE="$2"
            # Generate a simple ID based on timestamp
            ID=$(date +%s)
            FILENAME="history/adr/adr-$ID-$TITLE.md"
            echo "Creating ADR: $FILENAME"
            
            if [ -f ".specify/templates/adr-template.md" ]; then
                sed -e "s/{{ID}}/$ID/g" \
                    -e "s/{{TITLE}}/$TITLE/g" \
                    -e "s/{{DATE_ISO}}/$(date +%Y-%m-%d)/g" \
                    ".specify/templates/adr-template.md" > "$FILENAME"
                echo "Created ADR: $FILENAME"
            else
                echo "Error: ADR template not found"
                exit 1
            fi
        else
            echo "Usage: sp adr [decision-title]"
            exit 1
        fi
        ;;
        
    "phr")
        if [ $# -eq 3 ]; then
            TITLE="$2"
            STAGE="$3"
            ID=$(date +%s)
            FILENAME="history/prompts/general/${ID}-${TITLE}.${STAGE}.prompt.md"
            echo "Creating PHR: $FILENAME"
            
            if [ -f ".specify/templates/phr-template.prompt.md" ]; then
                sed -e "s/{{ID}}/$ID/g" \
                    -e "s/{{TITLE}}/$TITLE/g" \
                    -e "s/{{STAGE}}/$STAGE/g" \
                    -e "s/{{DATE_ISO}}/$(date +%Y-%m-%d)/g" \
                    ".specify/templates/phr-template.prompt.md" > "$FILENAME"
                echo "Created PHR: $FILENAME"
            else
                echo "Error: PHR template not found"
                exit 1
            fi
        else
            echo "Usage: sp phr [title] [stage]"
            exit 1
        fi
        ;;
        
    "help"|"-h"|"--help")
        show_help
        ;;
        
    "")
        show_help
        ;;
        
    *)
        echo "Unknown command: $1"
        echo "Use 'sp help' for available commands"
        exit 1
        ;;
esac