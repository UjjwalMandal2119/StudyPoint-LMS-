$env:JAVA_HOME='d:\tools\jdk21\jdk-21.0.12+8'
$env:Path = $env:JAVA_HOME + '\bin;d:\tools\maven\apache-maven-3.9.9\bin;' + $env:Path

# Stop backend occupying port 8080
Write-Output 'Stopping backend on 8080...'
try {
  $lines = netstat -ano | Select-String ':8080'
  foreach ($l in $lines) {
    $p = $l.ToString().Split()[-1]
    if ($p -match '^\d+$') { taskkill /PID $p /F > $null 2>&1 }
  }
} catch {}
Start-Sleep -Seconds 3

Set-Location 'd:\StudyPoint\backend'
Write-Output 'Building backend jar...'
$build = mvn -f pom.xml clean package -DskipTests 2>&1
$build | Out-File -Encoding utf8 'd:\StudyPoint\build-clean.log'
"BUILD_EXIT=$LASTEXITCODE" | Out-File -Append -Encoding utf8 'd:\StudyPoint\build-clean.log'
Write-Output "mvn package exit code $LASTEXITCODE"
Get-Content 'd:\StudyPoint\build-clean.log' -Tail 15

if ($LASTEXITCODE -eq 0) {
  Write-Output 'Relaunching backend...'
  cmd /c start /b '' cmd /c "java -jar d:\StudyPoint\backend\target\studypoint-backend-1.0.0.jar > d:\StudyPoint\backend-run.log 2>&1"
  Start-Sleep -Seconds 4
  Write-Output 'Health check:'
  try { (Invoke-WebRequest -Uri http://localhost:8080/api/actuator/health -UseBasicParsing).Content } catch { "health request failed: $_" }
}
'DONE'
