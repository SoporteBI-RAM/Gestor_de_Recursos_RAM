# 🔐 Configuración de Secrets en GitHub

Para que la aplicación funcione correctamente en GitHub Pages, necesitas configurar los siguientes secrets en tu repositorio.

## 📋 Secrets Requeridos

Necesitas agregar **3 secrets** en GitHub:

1. **SHEET_ID** - El ID de tu Google Spreadsheet
2. **API_KEY** - Tu API Key de Google Cloud
3. **SCRIPT_URL** - La URL de tu Google Apps Script deployment

## 🚀 Cómo Configurar los Secrets

### Paso 1: Ve a la configuración del repositorio

1. Abre tu repositorio en GitHub: https://github.com/SoporteBI-RAM/Gestror_de_Recursos
2. Click en **Settings** (configuración)
3. En el menú lateral izquierdo, ve a **Secrets and variables** → **Actions**
4. Click en **New repository secret**

### Paso 2: Agrega cada secret

#### Secret 1: SHEET_ID

- **Name**: `SHEET_ID`
- **Secret**: `1uTMjJ_4_uXfZ2u0P9CTMy4pzMBY60e0tzWkM6xnglTk`
- Click en **Add secret**

#### Secret 2: API_KEY

- **Name**: `API_KEY`
- **Secret**: `AIzaSyC8llGU58K1JmLPsH1XAS-El3Px2sTf6-E`
- Click en **Add secret**

⚠️ **IMPORTANTE**: Considera regenerar esta API Key en Google Cloud Console y restringirla a tu dominio de GitHub Pages para mayor seguridad.

#### Secret 3: SCRIPT_URL

- **Name**: `SCRIPT_URL`
- **Secret**: `https://script.google.com/macros/s/AKfycbyOzVFHt0XUjut7tTDREuTEvpvNmpKpHQxC3liutNAn9tbbhdPOD0eZ-OaWUHz0fsIm/exec`
- Click en **Add secret**

### Paso 3: Verifica la configuración

Una vez agregados los 3 secrets, deberías ver:

```
SHEET_ID     ✓
API_KEY      ✓
SCRIPT_URL   ✓
```

### Paso 4: Re-ejecuta el workflow

1. Ve a la pestaña **Actions**
2. Click en el workflow más reciente
3. Click en **Re-run all jobs**

El workflow ahora usará los secrets para generar el archivo `config.js` con tus credenciales.

## 🔒 Seguridad

### ¿Por qué usar secrets?

- **Protección**: Tus credenciales no están visibles en el código fuente público
- **Renovación fácil**: Puedes actualizar las credenciales sin modificar el código
- **Auditoría**: GitHub registra cuándo se usan los secrets

### Recomendaciones adicionales

1. **Restringe la API Key** en Google Cloud Console:
   - Ve a https://console.cloud.google.com/apis/credentials
   - Edita tu API Key
   - En "Application restrictions", selecciona "HTTP referrers"
   - Agrega: `https://soportebi-ram.github.io/*`
   - En "API restrictions", selecciona "Google Sheets API"

2. **Apps Script**: Asegúrate de que tenga las restricciones de acceso correctas

## 🛠️ Desarrollo Local

Si quieres trabajar localmente sin esperar al deployment:

1. Crea un archivo `web-app/config.local.js` (este archivo está en .gitignore):

```javascript
const CONFIG = {
    SHEET_ID: '1uTMjJ_4_uXfZ2u0P9CTMy4pzMBY60e0tzWkM6xnglTk',
    API_KEY: 'AIzaSyC8llGU58K1JmLPsH1XAS-El3Px2sTf6-E',
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyOzVFHt0XUjut7tTDREuTEvpvNmpKpHQxC3liutNAn9tbbhdPOD0eZ-OaWUHz0fsIm/exec',
    SHEETS: {
        CLIENTES: 'Clientes',
        MARCAS: 'Marcas',
        ENTREGABLES: 'Entregables',
        VALIDACIONES: 'Validaciones',
        TIPOS_ENTREGABLE: 'Tipos_Entregable',
        HERRAMIENTAS: 'Herramientas_Catalogo',
        CATEGORIAS_HERRAMIENTAS: 'Categorias_Herramientas',
        LOGS: 'Logs_Cambios',
        USERS: 'Users'
    },
    API_BASE_URL: 'https://sheets.googleapis.com/v4/spreadsheets'
};
```

2. En `index.html`, carga este archivo después de `config.js`:

```html
<script src="web-app/config.js"></script>
<script src="web-app/config.local.js"></script> <!-- Solo para desarrollo local -->
```

El archivo `config.local.js` sobreescribirá los placeholders cuando trabajes localmente.

## ❓ Preguntas Frecuentes

**P: ¿Los secrets son visibles en el código desplegado?**
R: No, los secrets solo existen durante el proceso de build en el servidor de GitHub. El código final ya tiene los valores reemplazados.

**P: ¿Puedo cambiar los secrets después?**
R: Sí, puedes editar los secrets en cualquier momento desde Settings → Secrets and variables → Actions.

**P: ¿Qué pasa si no configuro los secrets?**
R: La aplicación mostrará un mensaje de error indicando que faltan las credenciales.

## 📚 Recursos

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Google Cloud Console](https://console.cloud.google.com)
- [Google Apps Script](https://script.google.com)
