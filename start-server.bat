@echo off
echo ========================================
echo  GESTOR DE RECURSOS - Servidor Local
echo ========================================
echo.
echo Iniciando servidor en http://localhost:3000
echo.
echo Para acceder a la aplicacion:
echo   http://localhost:3000
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

cd /d "%~dp0"
npm run dev
