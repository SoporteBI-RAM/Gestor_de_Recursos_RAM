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

# Escapar caracteres especiales para sed
SHEET_ID_ESCAPED=$(echo "$SHEET_ID" | sed 's/[&/\]/\\&/g')
API_KEY_ESCAPED=$(echo "$API_KEY" | sed 's/[&/\]/\\&/g')
SCRIPT_URL_ESCAPED=$(echo "$SCRIPT_URL" | sed 's/[&/\]/\\&/g')

# Reemplazar placeholders con valores reales usando | como delimitador
sed -i "s|__SHEET_ID__|${SHEET_ID_ESCAPED}|g" web-app/config.js
sed -i "s|__API_KEY__|${API_KEY_ESCAPED}|g" web-app/config.js
sed -i "s|__SCRIPT_URL__|${SCRIPT_URL_ESCAPED}|g" web-app/config.js

echo "✅ Build completado exitosamente"
echo "📦 Archivo config.js generado con credenciales"
echo "🔍 Verificando reemplazo..."
grep -q "__SHEET_ID__" web-app/config.js && echo "⚠️ SHEET_ID no fue reemplazado" || echo "✓ SHEET_ID reemplazado"
grep -q "__API_KEY__" web-app/config.js && echo "⚠️ API_KEY no fue reemplazado" || echo "✓ API_KEY reemplazado"
grep -q "__SCRIPT_URL__" web-app/config.js && echo "⚠️ SCRIPT_URL no fue reemplazado" || echo "✓ SCRIPT_URL reemplazado"
