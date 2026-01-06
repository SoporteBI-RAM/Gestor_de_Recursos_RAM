# 📋 HEADERS PARA GOOGLE SHEETS

## ✅ COPIAR Y PEGAR ESTOS HEADERS EN CADA HOJA

---

## 1️⃣ HOJA: `Clientes`

```
ID_Cliente	Nombre_Cliente	Estado	Fecha_Creacion	Ultima_Actualizacion	Actualizado_Por
```

**Ejemplo de datos:**
```
1	Coca-Cola Company	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
2	PepsiCo	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
```

---

## 2️⃣ HOJA: `Marcas`

```
ID_Marca	ID_Cliente	Nombre_Marca	Estado	Fecha_Creacion	Ultima_Actualizacion	Actualizado_Por
```

**Ejemplo de datos:**
```
1	1	Coca-Cola	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
2	1	Sprite	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
3	1	Fanta	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
```

---

## 3️⃣ HOJA: `Entregables` ⭐ **MÁS IMPORTANTE**

```
ID_Entregable	ID_Cliente	ID_Marca	Nombre_Entregable	Tipo_Entregable	Frecuencia_Validacion	Dia_Validacion	URLs_Fuentes	Instrucciones_Tecnicas	Notas_Troubleshooting	Estado	Fecha_Creacion	Ultima_Actualizacion	Actualizado_Por
```

**Ejemplo de datos:**
```
1	1	1	Dashboard Ventas Meta	Power BI	Diario	Todos	Supermetrics: https://app.supermetrics.com/...
Google Sheet: https://docs.google.com/spreadsheets/d/xyz/	Se actualiza automáticamente a las 6 AM. Conecta a Supermetrics para Meta Ads.	Si no hay datos: revisar Supermetrics > Accounts. Si Sheet falla: verificar permisos.	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin

2	1	2	Reporte Mensual Marketing	Reporte Excel	Mensual	1	BigQuery: proyecto.dataset.conversiones
GA4: Property 123456789	El reporte se genera manualmente el día 1 de cada mes usando datos de BigQuery.	Si BigQuery falla: revisar Query History en GCP Console.	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
```

**Nota:** Los campos `URLs_Fuentes`, `Instrucciones_Tecnicas` y `Notas_Troubleshooting` pueden tener múltiples líneas.

---

## 4️⃣ HOJA: `Validaciones` ⭐ **NUEVA - CREAR**

```
ID_Validacion	ID_Entregable	Fecha_Validacion	Estado_Validacion	Comentarios	Validado_Por	Fecha_Registro
```

**Ejemplo de datos:**
```
1	1	2026-01-04	Actualizado		Juan Perez	2026-01-04T08:30:00.000Z
2	1	2026-01-03	Con Error	Supermetrics no conectó, revisar credenciales	Juan Perez	2026-01-03T08:15:00.000Z
3	2	2026-01-01	Entregado	Reporte enviado por email a cliente	Maria Lopez	2026-01-01T17:00:00.000Z
```

**Estados válidos:**
- `Actualizado` ✅
- `Con Error` ❌
- `Pendiente` ⏳
- `Entregado` 📤

---

## 5️⃣ HOJA: `Tipos_Entregable`

```
ID_Tipo	Nombre_Tipo	Descripcion	Estado	Fecha_Creacion	Ultima_Actualizacion	Actualizado_Por
```

**Ejemplo de datos:**
```
1	Power BI	Dashboards interactivos de Microsoft Power BI	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
2	Looker Studio	Dashboards de Google Looker Studio	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
3	Reporte Excel	Reportes en formato Excel	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
4	Dashboard Tableau	Dashboards de Tableau	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
5	Presentación	Presentaciones en PowerPoint o Google Slides	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
```

---

## 6️⃣ HOJA: `Herramientas_Catalogo` (OPCIONAL - SIMPLIFICADO)

```
ID_Herramienta	Nombre_Herramienta	Categoria	URL_Oficial	Descripcion	Estado	Fecha_Creacion	Ultima_Actualizacion	Actualizado_Por
```

**Ejemplo de datos:**
```
1	Supermetrics	Extracción de Datos	https://supermetrics.com	Conecta múltiples fuentes de datos a hojas y BI	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
2	Google Analytics	Analítica Web	https://analytics.google.com	Plataforma de analítica web de Google	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
3	BigQuery	Almacenamiento	https://cloud.google.com/bigquery	Data warehouse de Google Cloud	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
```

---

## 7️⃣ HOJA: `Categorias_Herramientas`

```
ID_Categoria	Nombre_Categoria	Descripcion	Estado	Fecha_Creacion	Ultima_Actualizacion	Actualizado_Por
```

**Ejemplo de datos:**
```
1	Extracción de Datos	Herramientas para extraer datos de fuentes externas	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
2	Visualización	Herramientas para crear dashboards y visualizaciones	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
3	Almacenamiento	Bases de datos y almacenamiento de datos	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
4	Transformación	ETL y procesamiento de datos	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z	Admin
```

---

## 8️⃣ HOJA: `Logs_Cambios`

```
ID_Log	Fecha_Hora	Tabla	Operacion	Descripcion	Usuario
```

**Ejemplo de datos:**
```
1	2026-01-04T10:00:00.000Z	Clientes	INSERT	ID: 1	Admin
2	2026-01-04T10:05:00.000Z	Marcas	INSERT	ID: 1	Admin
3	2026-01-04T10:10:00.000Z	Entregables	UPDATE	ID: 5	Juan Perez
4	2026-01-04T10:15:00.000Z	Validaciones	INSERT	ID: 10	Maria Lopez
```

**Nota:** Esta hoja se llena automáticamente cuando haces cambios en el sistema (crear, editar, eliminar).

---

## 9️⃣ HOJA: `Users`

```
ID_User	Nombre_Usuario	Email	Rol	Estado	Fecha_Creacion	Ultima_Actualizacion
```

**Ejemplo de datos:**
```
1	Admin	admin@rangle.ec	Administrador	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z
2	Ejemplo Usuario	ejemplo@rangle.ec	Usuario	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z
3	Ejemplo Editor	editor@rangle.ec	Editor	Activo	2026-01-04T10:00:00.000Z	2026-01-04T10:00:00.000Z
```

**Nota:** Esta hoja es para autenticación futura (opcional).

---

## ❌ HOJAS A ELIMINAR

**IMPORTANTE:** Borra estas hojas de Google Sheets:

1. ❌ `Recursos_Conectividad`
2. ❌ `Origenes_Datos`
3. ❌ `Recurso_Origen`
4. ❌ `Recursos_Usados`

---

## 📝 PASOS PARA ACTUALIZAR GOOGLE SHEETS

### PASO 1: Eliminar hojas innecesarias
1. Ve a tu Google Sheet
2. Haz clic derecho en las pestañas: `Recursos_Conectividad`, `Origenes_Datos`, `Recurso_Origen`, `Recursos_Usados`
3. Selecciona "Eliminar"

### PASO 2: Verificar hoja `Clientes`
- Si ya existe, déjala como está
- Si no existe, créala con los headers arriba

### PASO 3: Verificar/Crear hoja `Marcas`
- Si ya existe, verifica que tenga los headers correctos
- Si no existe, créala nueva

### PASO 4: Modificar hoja `Entregables`
1. Si ya existe, crea una nueva pestaña llamada `Entregables_OLD` y copia los datos viejos ahí (backup)
2. Crea una nueva hoja `Entregables` con los nuevos headers
3. Migra manualmente los datos importantes (si hay)

### PASO 5: Crear hoja `Validaciones`
- Crea una hoja nueva con ese nombre
- Copia los headers exactos de arriba

### PASO 6: Verificar `Tipos_Entregable`
- Actualiza los headers si es necesario
- Simplifica las filas (solo 5-6 tipos principales)

### PASO 7: Verificar hojas de catálogo
- `Herramientas_Catalogo`: Actualizar headers
- `Categorias_Herramientas`: Ya debería estar bien

---

## ✅ CUANDO TERMINES

Avísame y continuamos con actualizar el código (config.js y la interfaz).
