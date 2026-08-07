$env:JAVA_HOME='d:\tools\jdk21\jdk-21.0.12+8'
$env:Path = $env:JAVA_HOME + '\bin;' + $env:Path
Stop-Process -Name mvn -Force -ErrorAction SilentlyContinue
Stop-Process -Name java -Force -ErrorAction SilentlyContinue
Set-Location 'd:\StudyPoint\backend'
& 'd:\tools\maven\apache-maven-3.9.9\bin\mvn.cmd' clean compile -q -DskipTests 1> compile2.log 2> compile2_err.log
$ec = $LASTEXITCODE
"EXITCODE=$ec" | Out-File -Append 'd:\StudyPoint\build_result.txt'
Get-Content 'd:\StudyPoint\backend\compile2_err.log' -Tail 30 | Out-File -Append 'd:\StudyPoint\build_result.txt'
"DONE" | Out-File -Append 'd:\StudyPoint\build_result.txt'