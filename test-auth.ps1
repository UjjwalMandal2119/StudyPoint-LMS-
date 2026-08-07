# End-to-end auth test against the StudyPoint backend.
# JSON bodies are written to temp files as clean JSON (no shell backslash escaping)
# and POSTed via curl --data-binary @file so Jackson receives well-formed JSON.
$ErrorActionPreference = 'Continue'
$api = 'http://localhost:8080/api'
$tmp = $env:TEMP

function Post-Json {
    param([string]$Url, [string]$File)
    $resp = Join-Path $tmp ('sp-resp-' + (Get-Random) + '.json')
    $code = & curl.exe -s -m 30 -o $resp -w '%{http_code}' -X POST $Url -H 'Content-Type: application/json' --data-binary "@$File"
    $body = if (Test-Path $resp) { Get-Content $resp -Raw } else { '' }
    Remove-Item $resp -Force -ErrorAction SilentlyContinue
    return $body, $code
}

# ---- Register ----
$regJson = '{"username":"alice","email":"alice@example.com","password":"password123","firstName":"Alice","lastName":"Smith","phone":"","role":"STUDENT"}'
$regFile = Join-Path $tmp 'studypoint-reg.json'
Set-Content -Path $regFile -Value $regJson -Encoding ascii -NoNewline

$regBody, $regStatus = Post-Json -Url "$api/auth/register" -File $regFile
$reg = $regBody | ConvertFrom-Json -ErrorAction SilentlyContinue
Write-Output ("REGISTER: status=" + $regStatus + " success=" + ($reg.success) + " message=" + ($reg.message))
if ($reg.data) {
    Write-Output ("  accessToken present: " + (-not [string]::IsNullOrEmpty($reg.data.accessToken)))
    Write-Output ("  role=" + ($reg.data.role))
} else {
    Write-Output ("  REG RAW: " + $regBody)
}

# ---- Login (alice should now exist) ----
$loginJson = '{"usernameOrEmail":"alice","password":"password123"}'
$loginFile = Join-Path $tmp 'studypoint-login.json'
Set-Content -Path $loginFile -Value $loginJson -Encoding ascii -NoNewline

$loginBody, $loginStatus = Post-Json -Url "$api/auth/login" -File $loginFile
$login = $loginBody | ConvertFrom-Json -ErrorAction SilentlyContinue
Write-Output ("LOGIN: status=" + $loginStatus + " success=" + ($login.success) + " message=" + ($login.message))
$token = $login.data.accessToken
Write-Output ("  hasToken=" + (-not [string]::IsNullOrEmpty($token)))

# ---- Protected endpoint with JWT ----
if (-not [string]::IsNullOrEmpty($token)) {
    $countOut = & curl.exe -s -m 20 "$api/users/count/role/ADMIN" -H "Authorization: Bearer $token"
    Write-Output ("PROTECTED /users/count/role/ADMIN: " + $countOut)
}

"AUTH_TEST_DONE" | Out-File -FilePath 'd:\StudyPoint\auth-test-result.txt' -Encoding ascii
"AUTH_TEST_DONE"
