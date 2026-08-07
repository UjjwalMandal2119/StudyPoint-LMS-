$env:JAVA_HOME='d:\tools\jdk21\jdk-21.0.12+8'
$env:Path = $env:JAVA_HOME + '\bin;' + $env:Path
cmd /c start /b "" cmd /c "java -jar d:\StudyPoint\backend\target\studypoint-backend-1.0.0.jar > d:\StudyPoint\backend-run.log 2>&1"
Write-Output "backend start issued"
