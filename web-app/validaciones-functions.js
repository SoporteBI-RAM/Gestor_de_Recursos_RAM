// ========================================
// DASHBOARD DE VALIDACIÓN DIARIA
// ========================================

// Cargar entregables que requieren validación HOY
async function cargarDashboardValidacion() {
    const container = document.getElementById('dashboard-validacion-container');
    if (!container) return;

    try {
        container.innerHTML = '<div class="loading">Cargando entregables...</div>';

        // Cargar entregables y validaciones
        const [entregablesData, validacionesData, clientesData, marcasData] = await Promise.all([
            leerHoja(CONFIG.SHEETS.ENTREGABLES),
            leerHoja(CONFIG.SHEETS.VALIDACIONES),
            leerHoja(CONFIG.SHEETS.CLIENTES),
            leerHoja(CONFIG.SHEETS.MARCAS)
        ]);

        const entregables = convertirAObjetos(entregablesData);
        const validaciones = convertirAObjetos(validacionesData);
        const clientes = convertirAObjetos(clientesData);
        const marcas = convertirAObjetos(marcasData);

        // Guardar en estado global
        if (!window.appState) window.appState = {};
        const appState = window.appState;
        appState.entregables = entregables;
        appState.validaciones = validaciones;
        appState.clientes = clientes;
        appState.marcas = marcas;
        // Filtrar entregables que requieren validación HOY
        const hoy = new Date();
        const entregablesHoy = filtrarEntregablesDelDia(entregables, hoy);

        renderizarDashboardValidacion(entregablesHoy, validaciones, clientes, marcas, hoy);

    } catch (error) {
        console.error('Error al cargar dashboard:', error);
        container.innerHTML = '<div class="error">Error al cargar dashboard de validaciones</div>';
    }
}

// Filtrar entregables que requieren validación HOY
function filtrarEntregablesDelDia(entregables, fecha) {
    const dia = fecha.getDate();
    const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][fecha.getDay()];

    return entregables.filter(ent => {
        if (ent.Estado !== 'Activo') return false;

        const frecuencia = ent.Frecuencia_Validacion;
        const diaValidacion = ent.Dia_Validacion;

        if (frecuencia === 'Diario' || diaValidacion === 'Todos') {
            return true;
        }

        if (frecuencia === 'Semanal' && diaValidacion === diaSemana) {
            return true;
        }

        if (frecuencia === 'Quincenal' && (diaValidacion == dia || (diaValidacion == 1 && dia == 1) || (diaValidacion == 15 && dia == 15))) {
            return true;
        }

        if (frecuencia === 'Mensual' && diaValidacion == dia) {
            return true;
        }

        return false;
    });
}

// Renderizar dashboard
function renderizarDashboardValidacion(entregables, validaciones, clientes, marcas, fecha) {
    const container = document.getElementById('dashboard-validacion-container');
    if (!container) return;

    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (entregables.length === 0) {
        container.innerHTML = `
            <div class="dashboard-header">
                <h2>📊 Validaciones del Día</h2>
                <p>${fechaFormateada}</p>
            </div>
            <div class="empty-state">
                ✅ No hay entregables para validar hoy
            </div>
        `;
        return;
    }

    // Obtener validaciones de HOY
    const fechaHoyStr = fecha.toISOString().split('T')[0];
    const validacionesHoy = validaciones.filter(v =>
        v.Fecha_Validacion && v.Fecha_Validacion.startsWith(fechaHoyStr)
    );

    const html = `
        <div class="dashboard-header">
            <h2>📊 Validaciones del Día</h2>
            <p>${fechaFormateada}</p>
            <div class="dashboard-stats">
                <div class="stat-card">
                    <span class="stat-number">${entregables.length}</span>
                    <span class="stat-label">Total a Validar</span>
                </div>
                <div class="stat-card stat-success">
                    <span class="stat-number">${validacionesHoy.filter(v => v.Estado_Validacion === 'Actualizado').length}</span>
                    <span class="stat-label">Actualizados</span>
                </div>
                <div class="stat-card stat-danger">
                    <span class="stat-number">${validacionesHoy.filter(v => v.Estado_Validacion === 'Con Error').length}</span>
                    <span class="stat-label">Con Error</span>
                </div>
                <div class="stat-card stat-info">
                    <span class="stat-number">${validacionesHoy.filter(v => v.Estado_Validacion === 'Entregado').length}</span>
                    <span class="stat-label">Entregados</span>
                </div>
            </div>
        </div>

        <div class="validaciones-lista">
            ${entregables.map(ent => {
        const cliente = clientes.find(c => c.ID_Cliente == ent.ID_Cliente);
        const marca = marcas.find(m => m.ID_Marca == ent.ID_Marca);
        const validacionHoy = validacionesHoy.find(v => v.ID_Entregable == ent.ID_Entregable);

        return `
                    <div class="validacion-card ${validacionHoy ? 'validado' : ''}">
                        <div class="validacion-header">
                            <div class="validacion-titulo">
                                <h3>${ent.Nombre_Entregable}</h3>
                                <span class="badge">${ent.Tipo_Entregable}</span>
                                ${ent.Frecuencia_Validacion ? `<span class="badge badge-secondary">${ent.Frecuencia_Validacion}</span>` : ''}
                            </div>
                            <div class="validacion-meta">
                                <span><i class="fas fa-building"></i> ${cliente?.Nombre_Cliente || 'Sin cliente'}</span>
                                ${marca ? `<span><i class="fas fa-tag"></i> ${marca.Nombre_Marca}</span>` : ''}
                            </div>
                        </div>

                        ${validacionHoy ? `
                            <div class="validacion-estado">
                                <div class="estado-badge estado-${validacionHoy.Estado_Validacion.replace(' ', '-').toLowerCase()}">
                                    ${getEstadoIcon(validacionHoy.Estado_Validacion)} ${validacionHoy.Estado_Validacion}
                                </div>
                                ${validacionHoy.Comentarios ? `<p class="comentario"><i class="fas fa-comment"></i> ${validacionHoy.Comentarios}</p>` : ''}
                                <small>Validado por ${validacionHoy.Validado_Por} a las ${new Date(validacionHoy.Fecha_Registro).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</small>
                            </div>
                        ` : `
                            <div class="validacion-acciones">
                                <button class="btn-validar btn-success" onclick="registrarValidacion(${ent.ID_Entregable}, 'Actualizado')">
                                    <i class="fas fa-check"></i> Actualizado
                                </button>
                                <button class="btn-validar btn-danger" onclick="mostrarFormularioError(${ent.ID_Entregable})">
                                    <i class="fas fa-times"></i> Con Error
                                </button>
                                <button class="btn-validar btn-info" onclick="registrarValidacion(${ent.ID_Entregable}, 'Entregado')">
                                    <i class="fas fa-paper-plane"></i> Entregado
                                </button>
                            </div>
                        `}

                        <div class="validacion-detalles">
                            ${ent.URLs_Fuentes ? `
                                <details>
                                    <summary><i class="fas fa-link"></i> URLs de Fuentes</summary>
                                    <div class="detalles-content">
                                        <pre>${ent.URLs_Fuentes}</pre>
                                    </div>
                                </details>
                            ` : ''}
                            ${ent.Instrucciones_Tecnicas ? `
                                <details>
                                    <summary><i class="fas fa-book"></i> Instrucciones Técnicas</summary>
                                    <div class="detalles-content">
                                        <pre>${ent.Instrucciones_Tecnicas}</pre>
                                    </div>
                                </details>
                            ` : ''}
                            ${ent.Notas_Troubleshooting ? `
                                <details>
                                    <summary><i class="fas fa-wrench"></i> Troubleshooting</summary>
                                    <div class="detalles-content">
                                        <pre>${ent.Notas_Troubleshooting}</pre>
                                    </div>
                                </details>
                            ` : ''}
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;

    container.innerHTML = html;
}

// Obtener icono según estado
function getEstadoIcon(estado) {
    switch (estado) {
        case 'Actualizado': return '✅';
        case 'Con Error': return '❌';
        case 'Entregado': return '📤';
        case 'Pendiente': return '⏳';
        default: return '📋';
    }
}

// Registrar validación
async function registrarValidacion(idEntregable, estado, comentarios = '') {
    try {
        const validacionData = {
            ID_Entregable: idEntregable,
            Fecha_Validacion: new Date().toISOString().split('T')[0],
            Estado_Validacion: estado,
            Comentarios: comentarios,
            Validado_Por: window.appState?.currentUser || 'Usuario',
            Fecha_Registro: new Date().toISOString()
        };

        const payload = {
            action: 'add',
            sheetName: CONFIG.SHEETS.VALIDACIONES,
            data: validacionData
        };

        const result = await enviarAlScript(payload);

        if (result.status === 'success') {
            mostrarNotificacion(`Validación registrada: ${estado}`, 'success');
            cargarDashboardValidacion(); // Recargar dashboard
        } else {
            throw new Error(result.message || 'Error desconocido');
        }

    } catch (error) {
        console.error('Error al registrar validación:', error);
        mostrarNotificacion('Error al registrar validación: ' + error.message, 'error');
    }
}

// Mostrar formulario para registrar error
function mostrarFormularioError(idEntregable) {
    const comentario = prompt('Describe el error encontrado:');
    if (comentario && comentario.trim()) {
        registrarValidacion(idEntregable, 'Con Error', comentario.trim());
    }
}

// ========================================
// HISTORIAL DE VALIDACIONES
// ========================================

async function cargarHistorialValidaciones() {
    const container = document.getElementById('historial-validaciones-container');
    if (!container) return;

    try {
        container.innerHTML = '<div class="loading">Cargando historial...</div>';

        const [validacionesData, entregablesData, clientesData, marcasData] = await Promise.all([
            leerHoja(CONFIG.SHEETS.VALIDACIONES),
            leerHoja(CONFIG.SHEETS.ENTREGABLES),
            leerHoja(CONFIG.SHEETS.CLIENTES),
            leerHoja(CONFIG.SHEETS.MARCAS)
        ]);

        const validaciones = convertirAObjetos(validacionesData);
        const entregables = convertirAObjetos(entregablesData);
        const clientes = convertirAObjetos(clientesData);
        const marcas = convertirAObjetos(marcasData);

        renderizarHistorialValidaciones(validaciones, entregables, clientes, marcas);

    } catch (error) {
        console.error('Error al cargar historial:', error);
        container.innerHTML = '<div class="error">Error al cargar historial</div>';
    }
}

function renderizarHistorialValidaciones(validaciones, entregables, clientes, marcas) {
    const container = document.getElementById('historial-validaciones-container');
    if (!container) return;

    if (validaciones.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay validaciones registradas</div>';
        return;
    }

    // Ordenar por fecha más reciente
    const validacionesOrdenadas = validaciones.sort((a, b) => {
        return new Date(b.Fecha_Registro) - new Date(a.Fecha_Registro);
    });

    const html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Entregable</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Comentarios</th>
                    <th>Validado Por</th>
                </tr>
            </thead>
            <tbody>
                ${validacionesOrdenadas.map(val => {
        const entregable = entregables.find(e => e.ID_Entregable == val.ID_Entregable);
        const cliente = clientes.find(c => c.ID_Cliente == entregable?.ID_Cliente);

        return `
                        <tr>
                            <td>${val.Fecha_Validacion ? new Date(val.Fecha_Validacion).toLocaleDateString('es-ES') : '-'}</td>
                            <td><strong>${entregable?.Nombre_Entregable || 'Desconocido'}</strong></td>
                            <td>${cliente?.Nombre_Cliente || '-'}</td>
                            <td>
                                <span class="badge badge-${val.Estado_Validacion === 'Actualizado' ? 'success' :
                val.Estado_Validacion === 'Con Error' ? 'danger' :
                    val.Estado_Validacion === 'Entregado' ? 'info' : 'secondary'
            }">
                                    ${getEstadoIcon(val.Estado_Validacion)} ${val.Estado_Validacion}
                                </span>
                            </td>
                            <td>${val.Comentarios || '-'}</td>
                            <td>${val.Validado_Por || '-'}</td>
                        </tr>
                    `;
    }).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}
