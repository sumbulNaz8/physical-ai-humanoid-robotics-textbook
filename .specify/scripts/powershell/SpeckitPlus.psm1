# SpeckitPlus PowerShell Helper Functions

function New-Spec {
    param(
        [string]$FeatureName,
        [string]$Description
    )
    
    Write-Host "Creating new specification for: $FeatureName" -ForegroundColor Green
    
    # Create feature directory
    $featurePath = "specs\$FeatureName"
    if (!(Test-Path $featurePath)) {
        New-Item -ItemType Directory -Path $featurePath | Out-Null
        Write-Host "Created directory: $featurePath" -ForegroundColor Cyan
    }
    
    # Copy spec template
    $specPath = "$featurePath\spec.md"
    $templatePath = ".specify\templates\spec-template.md"
    
    if (Test-Path $templatePath) {
        $specContent = Get-Content $templatePath -Raw
        $specContent = $specContent -replace '\[FEATURE NAME\]', $FeatureName
        $specContent = $specContent -replace '\[DATE\]', (Get-Date -Format "yyyy-MM-dd")
        $specContent = $specContent -replace '\$ARGUMENTS', $Description
        
        $specContent | Out-File -FilePath $specPath -Encoding UTF8
        Write-Host "Created spec: $specPath" -ForegroundColor Cyan
    } else {
        Write-Host "Template not found: $templatePath" -ForegroundColor Red
    }
}

function New-Plan {
    param(
        [string]$FeatureName
    )
    
    Write-Host "Creating implementation plan for: $FeatureName" -ForegroundColor Green
    
    $featurePath = "specs\$FeatureName"
    $specPath = "$featurePath\spec.md"
    $planPath = "$featurePath\plan.md"
    
    if (Test-Path $specPath) {
        if (Test-Path ".specify\templates\plan-template.md") {
            $planContent = Get-Content ".specify\templates\plan-template.md" -Raw
            $planContent = $planContent -replace '\[FEATURE\]', $FeatureName
            $planContent = $planContent -replace '\[DATE\]', (Get-Date -Format "yyyy-MM-dd")
            
            # Extract input from spec file
            $specContent = Get-Content $specPath -Raw
            $planContent = $planContent -replace '\[link\]', "specs/$FeatureName/spec.md"
            
            $planContent | Out-File -FilePath $planPath -Encoding UTF8
            Write-Host "Created plan: $planPath" -ForegroundColor Cyan
        } else {
            Write-Host "Plan template not found" -ForegroundColor Red
        }
    } else {
        Write-Host "Spec file not found: $specPath" -ForegroundColor Red
    }
}

function New-Tasks {
    param(
        [string]$FeatureName
    )
    
    Write-Host "Creating task list for: $FeatureName" -ForegroundColor Green
    
    $featurePath = "specs\$FeatureName"
    $tasksPath = "$featurePath\tasks.md"
    
    if (Test-Path ".specify\templates\tasks-template.md") {
        $tasksContent = Get-Content ".specify\templates\tasks-template.md" -Raw
        $tasksContent = $tasksContent -replace '\[FEATURE NAME\]', $FeatureName
        
        $tasksContent | Out-File -FilePath $tasksPath -Encoding UTF8
        Write-Host "Created tasks: $tasksPath" -ForegroundColor Cyan
    } else {
        Write-Host "Tasks template not found" -ForegroundColor Red
    }
}

# Export the functions
Export-ModuleMember -Function New-Spec, New-Plan, New-Tasks