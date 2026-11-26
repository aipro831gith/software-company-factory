@echo off
setlocal
cd /d "C:\dev\software-company-factory"
if exist "C:\Program Files\nodejs\node.exe" set "PATH=C:\Program Files\nodejs;%PATH%"

powershell -NoProfile -Command "try { $c = New-Object Net.Sockets.TcpClient('127.0.0.1', 4173); $c.Close(); exit 0 } catch { exit 1 }"
if %errorlevel%==0 (
  echo Boss Dashboard is already running on http://localhost:4173. Opening browser...
  start "" "http://localhost:4173"
  exit /b 0
)

echo Starting Software Company Factory - Live Boss Dashboard...
start "Software Company Factory - Live Boss Dashboard" /D "C:\dev\software-company-factory" cmd /k "title Software Company Factory - Live Boss Dashboard && node dashboard\server.mjs"
timeout /t 2 /nobreak >nul
start "" "http://localhost:4173"
exit /b 0
