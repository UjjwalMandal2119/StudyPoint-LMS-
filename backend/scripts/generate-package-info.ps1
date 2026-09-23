# Generates package-info.java documentation files for the enterprise package structure.
$base = 'd:\StudyPoint\backend\src\main\java\com\studypoint\backend'

$map = [ordered]@{
  'config'              = 'Spring configuration classes (Security, OpenAPI, async, and infrastructure wiring).'
  'constants'           = 'Shared constants and enumerated types used across the domain.'
  'controller'          = 'REST presentation layer: thin controllers delegating to services and returning ApiResponse wrappers.'
  'controller.admin'    = 'Admin-scoped REST endpoints grouped by role.'
  'controller.auth'     = 'Authentication endpoints (login, register, refresh, logout).'
  'controller.common'   = 'Cross-cutting REST endpoints shared by all roles.'
  'controller.student'  = 'Student-scoped REST endpoints.'
  'controller.teacher'  = 'Teacher-scoped REST endpoints.'
  'dto'                 = 'Data Transfer Objects: request, response and auth payloads decouple the API contract from entities.'
  'dto.auth'            = 'Authentication and token request/response DTOs.'
  'dto.request'         = 'Request payloads for create/update operations backed by Bean Validation annotations.'
  'dto.response'        = 'Response payloads, including ApiResponse and page-aware list responses.'
  'entity'              = 'JPA entities mapping the relational schema.'
  'exception'           = 'Domain exceptions and the global exception handler producing consistent error contracts.'
  'mapper'              = 'MapStruct mappers translating between entities and DTOs.'
  'notification'        = 'Notification delivery abstraction (email, push, SMS) - reserved for expansion.'
  'repository'          = 'Spring Data JPA repositories forming the data-access layer.'
  'scheduler'           = 'Scheduled background jobs (reporting, reminders, maintenance) - reserved for expansion.'
  'security'            = 'JWT service, authentication filter and UserDetails implementation.'
  'service'             = 'Service interfaces defining business use-cases.'
  'service.admin'       = 'Admin-only business use-case interfaces.'
  'service.auth'        = 'Authentication business-logic interface.'
  'service.impl'        = 'Concrete service implementations (+Service, +Transactional).'
  'service.student'     = 'Student-scoped business use-case interfaces.'
  'service.teacher'     = 'Teacher-scoped business use-case interfaces.'
  'util'                = 'Stateless helper utilities (pagination, date/time, formatting).'
  'validator'           = 'Reusable Bean Validation constraints and composable validators.'
  'websocket'           = 'WebSocket configuration and message handling - reserved for expansion.'
}

foreach ($key in $map.Keys) {
  $relDir = $key.Replace('.', [System.IO.Path]::DirectorySeparatorChar)
  $dir = Join-Path $base $relDir
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $pkg = 'com.studypoint.backend.' + $key
  $desc = $map[$key]
  $content = @"
/**
 * $desc
 *
 * <p>This package is part of the Study Point enterprise architecture
 * (see {@code docs/architecture/enterprise-structure.md} for the full
 * layered architecture, naming conventions and package responsibilities).
 */
package $pkg;
"@
  [System.IO.File]::WriteAllText((Join-Path $dir 'package-info.java'), $content,
    (New-Object System.Text.UTF8Encoding($false)))
  Write-Host ("created " + $pkg)
}