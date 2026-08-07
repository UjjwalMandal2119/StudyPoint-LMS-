$env:JAVA_HOME='d:\tools\jdk21\jdk-21.0.12+8'
$env:Path = $env:JAVA_HOME + '\bin;d:\tools\maven\apache-maven-3.9.9\bin;' + $env:Path

# Stop any backend already listening on 8080
Write-Output "Stopping existing backend on 8080..."
try {
  $lines = netstat -ano | Select-String ':8080'
  foreach ($l in $lines) {
    $parts = $l.ToString().Split()
    $p = $parts[$parts.Length - 1]
    if ($p -match '^\d+$') { taskkill /PID $p /F > $null 2>&1 }
  }
} catch {}
Start-Sleep -Seconds 3

# Rebuild backend jar
Write-Output "Rebuilding backend..."
Set-Location d:\StudyPoint
mvn -f d:\StudyPoint\backend/pom.xml clean package -DskipTests -Dmaven.test.skip=true > d:\StudyPoint\backend-rebuild.log 2>&1
$ec = $LASTEXITCODE
"MVN_EXITCODE=$ec" | Out-File -FilePath d:\StudyPoint\backend-rebuild-status.txt -Encoding ascii
Write-Output "mvn exit code $ec"

if ($ec -eq 0) {
  # Relaunch backend detached
  cmd /c start /b "" cmd /c "java -jar d:\StudyPoint\backend\target\studypoint-backend-1.0.0.jar > d:\StudyPoint\backend-run.log 2>&1"
  Write-Output "Backend relaunched."
}
"REBUILD_DONE=$ec"
