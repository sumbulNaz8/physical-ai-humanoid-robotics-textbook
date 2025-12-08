@echo off
REM SpeckitPlus Initialization Script

echo Welcome to SpeckitPlus - Specification-Driven Development Framework
echo.

REM Check if the current directory is a SpeckitPlus project
if not exist ".specify" (
    echo Error: This does not appear to be a SpeckitPlus project directory.
    echo Make sure you're running this command from the root of your SpeckitPlus project.
    echo.
    goto :end
)

REM Check if specs directory exists, create if it doesn't
if not exist "specs" (
    mkdir specs
    echo Created specs directory
)

REM Check if history directory exists, create if it doesn't
if not exist "history\prompts" (
    mkdir history\prompts
    echo Created history\prompts directory
)

REM Check if history\adr directory exists, create if it doesn't
if not exist "history\adr" (
    mkdir history\adr
    echo Created history\adr directory
)

REM Provide information about available commands
echo SpeckitPlus is ready to use.
echo.
echo Available commands:
echo   sp spec [feature-name] [description]  - Create a new feature specification
echo   sp plan [feature-name]                - Create an implementation plan
echo   sp tasks [feature-name]               - Generate implementation tasks
echo   sp adr [decision-title]               - Create an architecture decision record
echo   sp phr [title] [stage]                - Create a prompt history record
echo.
echo For more information, visit the SpeckitPlus documentation.

:end
pause