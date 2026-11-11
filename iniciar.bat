@echo off

title EOM - Extrator de Chaves NF

cd /d "%~dp0"

echo =====================================
echo       EOM - EXTRATOR DE CHAVES NF
echo =====================================
echo.

if not exist ".venv\Scripts\python.exe" (

    echo Criando ambiente Python...

    py -m venv .venv

    if errorlevel 1 (
        echo Erro ao criar ambiente Python.
        pause
        exit /b 1
    )

    echo Instalando dependencias...

    .venv\Scripts\python.exe -m pip install -r requirements.txt

    if errorlevel 1 (
        echo Erro ao instalar dependencias.
        pause
        exit /b 1
    )

)

echo.
echo Iniciando aplicacao...
echo.

.venv\Scripts\python.exe app.py

REM O conteúdo dessa linha não será executado como um comando.
REM pause