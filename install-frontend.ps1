Remove-Item 'd:\StudyPoint\frontend\package-lock.json' -Force -ErrorAction SilentlyContinue
Set-Location d:\StudyPoint\frontend
npm install > d:\StudyPoint\frontend-install.log 2>&1
$ec = $LASTEXITCODE
"NPM_EXITCODE=$ec" | Out-File -Append d:\StudyPoint\frontend-install.log
"DONE_EXITCODE=$ec" | Out-File -FilePath d:\StudyPoint\frontend-install-status.txt -Encoding ascii
Write-Output "npm install finished with exit code $ec"

