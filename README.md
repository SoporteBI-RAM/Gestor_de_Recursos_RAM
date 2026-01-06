# 📊 Sistema de Gestión de Recursos

Sistema web para la gestión y validación de entregables, clientes y marcas. Integrado con Google Sheets como base de datos.

## ✨ Características

- **Gestión de Clientes y Marcas**: Organización jerárquica de clientes con sus marcas asociadas
- **Entregables**: Control completo de entregables con herramientas, automatización y validaciones
- **Validaciones Diarias**: Dashboard de validaciones con seguimiento del día
- **Historial de Validaciones**: Registro completo de todas las validaciones realizadas
- **Administración**: Gestión de catálogos (Users, Tipos de Entregable, Herramientas, Categorías)
- **Sincronización en Tiempo Real**: Actualización automática con Google Sheets
- **UI Optimista**: Cambios instantáneos sin esperar respuesta del servidor

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Google Apps Script
- **Base de Datos**: Google Sheets
- **API**: JSONP para bypass de CORS
- **Deployment**: GitHub Actions + GitHub Pages
- **Seguridad**: GitHub Secrets para protección de credenciales

## 📋 Estructura del Proyecto

```
web-app/
├── index.html              # Página principal
├── styles.css              # Estilos globales
├── config.js              # Configuración y conexión con Google Sheets
├── app.js                 # Lógica principal de la aplicación
├── admin-functions.js     # Funciones de administración de catálogos
├── categorias-functions.js # Funciones de categorías
├── validaciones-functions.js # Lógica de validaciones
└── icon-picker.js         # Selector de iconos
```

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/SoporteBI-RAM/Gestror_de_Recursos.git
```

2. Configura tu Google Apps Script:
   - Crea un nuevo proyecto en Google Apps Script
   - Copia el código del backend (proporcionado por separado)
   - Despliega como Web App
   - Copia la URL del deployment

3. Actualiza `config.js`:
```javascript
const CONFIG = {
    SCRIPT_URL: 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI',
    // ...
};
```

4. Abre `index.html` en tu navegador o despliega en un servidor web

## 📊 Estructura de Google Sheets

El sistema requiere las siguientes hojas en tu Google Spreadsheet:

- **Clientes**: ID_Cliente, Nombre_Cliente, Estado, Fecha_Creacion
- **Marcas**: ID_Marca, ID_Cliente, Nombre_Marca, Estado
- **Entregables**: ID_Entregable, ID_Cliente, ID_Marca, Nombre_Entregable, Tipo_Entregable, Frecuencia_Validacion, Dia_Validacion, URLs_Fuentes, Automatizado, Proceso_Automatizacion, Instrucciones_Tecnicas, Notas_Troubleshooting, Estado
- **Validaciones**: ID_Validacion, ID_Entregable, Fecha_Validacion, Resultado, Observaciones
- **Users**: ID_User, Nombre_Usuario, Email, Rol, Estado
- **Tipos_Entregable**: ID_Tipo, Nombre_Tipo, Descripcion, Estado
- **Herramientas_Catalogo**: ID_Herramienta, Nombre_Herramienta, Categoria, Descripcion, URL_Oficial, Estado
- **Categorias_Herramientas**: ID_Categoria, Nombre_Categoria, Descripcion, Estado

## 🎯 Funcionalidades Principales

### Gestión de Entregables
- Crear, editar y eliminar entregables
- Asignar herramientas con URLs/comentarios (tabla dinámica)
- Marcar como automatizado con descripción del proceso
- Selección múltiple de días para validaciones semanales
- Vista jerárquica: Cliente > Marca > Entregables

### Validaciones
- Dashboard con validaciones pendientes del día
- Registro de validaciones (Exitosa, Fallida, Pendiente)
- Historial completo con filtros
- Alertas automáticas

### Administración
- CRUD completo de todos los catálogos
- Actualización optimista (UI instantánea)
- Sincronización automática con Google Sheets
- Cache inteligente (60 segundos)

## 🔄 Actualización Optimista

El sistema utiliza actualización optimista para proporcionar una experiencia instantánea:

1. El cambio se aplica inmediatamente en la UI
2. Se sincroniza con Google Sheets en segundo plano
3. Si hay error, se notifica al usuario pero el cambio ya es visible

## 👨‍💻 Desarrollo

**Desarrollado por**: Analítica RAM by Santiago Tito

## 📝 Versión

**Versión actual**: v113

## 📄 Licencia

Este proyecto es de uso interno de Analítica RAM.
