#!/bin/bash
# Script de build para reemplazar placeholders con secrets de GitHub

set -e  # Exit on error

echo "🔧 Iniciando proceso de build..."

# Verificar que existan las variables de entorno
if [ -z "$SHEET_ID" ] || [ -z "$API_KEY" ] || [ -z "$SCRIPT_URL" ]; then
    echo "❌ Error: Faltan variables de entorno (SHEET_ID, API_KEY, SCRIPT_URL)"
    echo "SHEET_ID: ${SHEET_ID:0:10}..."
    echo "API_KEY: ${API_KEY:0:10}..."
    echo "SCRIPT_URL: ${SCRIPT_URL:0:30}..."
    exit 1
fi

echo "📝 Reemplazando placeholders en config.js..."
echo "Valores recibidos:"
echo "  SHEET_ID: ${SHEET_ID:0:20}..."
echo "  API_KEY: ${API_KEY:0:20}..."
echo "  SCRIPT_URL: ${SCRIPT_URL:0:40}..."

# Crear copia del archivo template
cp web-app/config.template.js web-app/config.js

# Usar perl en lugar de sed para reemplazo más confiable
perl -pi -e "s|__SHEET_ID__|$ENV{SHEET_ID}|g" web-app/config.js
perl -pi -e "s|__API_KEY__|$ENV{API_KEY}|g" web-app/config.js
perl -pi -e "s|__SCRIPT_URL__|$ENV{SCRIPT_URL}|g" web-app/config.js

echo "✅ Build completado exitosamente"
echo "📦 Archivo config.js generado con credenciales"
echo "🔍 Verificando reemplazo..."

if grep -q "__SHEET_ID__" web-app/config.js; then
    echo "❌ ERROR: SHEET_ID no fue reemplazado"
    exit 1
else
    echo "✓ SHEET_ID reemplazado correctamente"
fi

if grep -q "__API_KEY__" web-app/config.js; then
    echo "❌ ERROR: API_KEY no fue reemplazado"
    exit 1
else
    echo "✓ API_KEY reemplazado correctamente"
fi

if grep -q "__SCRIPT_URL__" web-app/config.js; then
    echo "❌ ERROR: SCRIPT_URL no fue reemplazado"
    exit 1
else
    echo "✓ SCRIPT_URL reemplazado correctamente"
fi

echo "📄 Primeras líneas del config.js generado:"
head -20 web-app/config.js
