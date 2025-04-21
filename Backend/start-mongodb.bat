@echo off
echo Starting MongoDB...
net start MongoDB
if %errorlevel% equ 0 (
    echo MongoDB started successfully!
) else (
    echo Failed to start MongoDB.
    echo Please make sure MongoDB is installed and the service is configured.
    echo You can install MongoDB from: https://www.mongodb.com/try/download/community
)
pause 