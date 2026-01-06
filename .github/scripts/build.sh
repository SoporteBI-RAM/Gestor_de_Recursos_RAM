#!/bin/bash
# Script de build para reemplazar placeholders con secrets de GitHub

set -e  # Exit on error

echo "🔧 Iniciando proceso de build..."

# Verificar que existan las variables de entorno
if [ -z "$SHEET_ID" ] || [ -z "$API_KEY" ] || [ -z "$SCRIPT_URL" ]; then
    echo "❌ Error: Faltan variables de entorno (SHEET_ID, API_KEY, SCRIPT_URL)"
    exit 1
fi

echo "📝 Reemplazando placeholders en config.js..."

# Crear copia del archivo template
cp web-app/config.template.js web-app/config.js

# Reemplazar placeholders con valores reales
sed -i "s|__SHEET_ID__|${SHEET_ID}|g" web-app/config.js
sed -i "s|__API_KEY__|${API_KEY}|g" web-app/config.js
sed -i "s|__SCRIPT_URL__|${SCRIPT_URL}|g" web-app/config.js

echo "✅ Build completado exitosamente"
echo "📦 Archivo config.js generado con credenciales"
