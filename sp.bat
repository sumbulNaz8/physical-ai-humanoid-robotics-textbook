@echo off
REM SpeckitPlus Command Router (Windows Batch)

REM Pass all arguments to the PowerShell script
powershell -ExecutionPolicy Bypass -File ".specify\scripts\powershell\sp.ps1" %*