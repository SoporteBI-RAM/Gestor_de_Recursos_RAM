// ============================================
// PROTECCIÓN DE PÁGINAS - VERIFICAR SESIÓN
// ============================================

// Verificar sesión al cargar cualquier página protegida
(function() {
    const sesionStr = localStorage.getItem('sesion_ram');

    if (!sesionStr) {
        // No hay sesión, redirigir al login
        console.log('⚠️ No hay sesión activa, redirigiendo a login...');
        window.location.href = 'login.html';
        return;
    }

    try {
        const sesion = JSON.parse(sesionStr);

        // Verificar que la sesión tenga los datos necesarios
        if (!sesion.email || !sesion.nombre) {
            console.log('⚠️ Sesión inválida, redirigiendo a login...');
            localStorage.removeItem('sesion_ram');
            window.location.href = 'login.html';
            return;
        }

        // Sesión válida - actualizar UI
        console.log('✅ Sesión activa:', sesion.nombre);

        // Actualizar nombre de usuario en el header cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => actualizarUsuarioUI(sesion));
        } else {
            actualizarUsuarioUI(sesion);
        }

    } catch (error) {
        console.error('❌ Error al parsear sesión:', error);
        localStorage.removeItem('sesion_ram');
        window.location.href = 'login.html';
    }
})();

// Actualizar UI con datos del usuario
function actualizarUsuarioUI(sesion) {
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.textContent = sesion.nombre;
    }

    // Agregar botón de cerrar sesión si no existe
    agregarBotonCerrarSesion();
}

// Agregar botón de cerrar sesión
function agregarBotonCerrarSesion() {
    const userInfo = document.querySelector('.user-info');

    if (userInfo && !document.getElementById('logoutButton')) {
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logoutButton';
        logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        logoutButton.style.cssText = `
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            margin-left: 12px;
            transition: all 0.2s;
            font-size: 14px;
        `;

        logoutButton.addEventListener('mouseover', () => {
            logoutButton.style.background = 'var(--danger-color)';
            logoutButton.style.color = 'white';
            logoutButton.style.borderColor = 'var(--danger-color)';
        });

        logoutButton.addEventListener('mouseout', () => {
            logoutButton.style.background = 'transparent';
            logoutButton.style.color = 'var(--text-secondary)';
            logoutButton.style.borderColor = 'var(--border-color)';
        });

        logoutButton.addEventListener('click', cerrarSesion);
        logoutButton.title = 'Cerrar sesión';

        userInfo.appendChild(logoutButton);
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
        localStorage.removeItem('sesion_ram');
        window.location.href = 'login.html';
    }
}

// Obtener datos de la sesión actual
function obtenerSesion() {
    const sesionStr = localStorage.getItem('sesion_ram');
    if (!sesionStr) return null;

    try {
        return JSON.parse(sesionStr);
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
}

// Exportar funciones para uso global
window.obtenerSesion = obtenerSesion;
window.cerrarSesion = cerrarSesion;
