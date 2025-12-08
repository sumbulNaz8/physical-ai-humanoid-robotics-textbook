# SpeckitPlus Command Router

# This script provides command-line access to SpeckitPlus functionality
# It should be executed as: powershell -ExecutionPolicy Bypass -File sp.ps1 [command] [args]

param(
    [string]$Command,
    [string[]]$Arguments
)

# Import the SpeckitPlus module
$modulePath = ".specify\scripts\powershell\SpeckitPlus.psm1"
if (Test-Path $modulePath) {
    Import-Module $modulePath -Force
} else {
    Write-Host "SpeckitPlus module not found at $modulePath" -ForegroundColor Red
    exit 1
}

# Process commands
switch ($Command) {
    "spec" {
        if ($Arguments.Count -ge 2) {
            $featureName = $Arguments[0]
            $description = $Arguments[1..($Arguments.Count-1)] -join " "
            New-Spec -FeatureName $featureName -Description $description
        } else {
            Write-Host "Usage: sp spec [feature-name] [description]" -ForegroundColor Yellow
        }
    }
    
    "plan" {
        if ($Arguments.Count -eq 1) {
            $featureName = $Arguments[0]
            New-Plan -FeatureName $featureName
        } else {
            Write-Host "Usage: sp plan [feature-name]" -ForegroundColor Yellow
        }
    }
    
    "tasks" {
        if ($Arguments.Count -eq 1) {
            $featureName = $Arguments[0]
            New-Tasks -FeatureName $featureName
        } else {
            Write-Host "Usage: sp tasks [feature-name]" -ForegroundColor Yellow
        }
    }
    
    "help" {
        Write-Host "SpeckitPlus Commands:" -ForegroundColor Green
        Write-Host "  sp spec [feature-name] [description]  - Create a new feature specification" -ForegroundColor Cyan
        Write-Host "  sp plan [feature-name]               - Create an implementation plan" -ForegroundColor Cyan
        Write-Host "  sp tasks [feature-name]              - Generate implementation tasks" -ForegroundColor Cyan
        Write-Host "  sp help                              - Show this help" -ForegroundColor Cyan
    }
    
    default {
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Write-Host "Use 'sp help' for available commands" -ForegroundColor Yellow
    }
}