@echo off

set SERVER=Run Server.bat
set CLIENT=Run Client.bat

set DIR=%~dp0
set "SERVER=%DIR%backend\Run Server.bat"
set "CLIENT=%DIR%client\Run Client.bat"

set "DONE1=%DIR%server.done"
set "DONE2=%DIR%client.done"

if exist "%DONE1%" del /q "%DONE1%"
if exist "%DONE2%" del /q "%DONE2%"

start "" cmd /c "%SERVER% && echo.>""%DONE1%"""
start "" cmd /c "%CLIENT% && echo.>""%DONE2%"""

echo Waiting for backend and client scripts to complete...
:WAIT_LOOP
if exist "%DONE1%" if exist "%DONE2%" goto BOTH_DONE
timeout /t 1 >nul
goto WAIT_LOOP

:BOTH_DONE
echo Both scripts have finished running.
del /q "%DONE1%" "%DONE2%"
pause
endlocal