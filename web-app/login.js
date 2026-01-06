// ============================================
// SISTEMA DE AUTENTICACIÓN
// ============================================

let usuarios = [];

// Cargar usuarios desde Google Sheets
async function cargarUsuarios() {
    try {
        const url = `${CONFIG.API_BASE_URL}/${CONFIG.SHEET_ID}/values/${CONFIG.SHEETS.USERS}?key=${CONFIG.API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al cargar usuarios');
        }

        const data = await response.json();

        if (!data.values || data.values.length < 2) {
            throw new Error('No hay usuarios disponibles');
        }

        // Convertir a objetos
        // Estructura: ID_User | Nombre_Usuario | Email | Contraseña | Rol | Estado | Fecha_Creacion | Ultima_Actualizacion
        const headers = data.values[0];
        console.log('📋 Headers encontrados:', headers);

        usuarios = data.values.slice(1).map((row, index) => {
            const user = {
                id: row[0] ? row[0].trim() : '',
                nombre: row[1] ? row[1].trim() : '',
                email: row[2] ? row[2].trim() : '',
                password: row[3] ? row[3].trim() : '',
                rol: row[4] ? row[4].trim() : 'usuario',
                estado: row[5] ? row[5].trim() : 'Activo'
            };
            console.log(`👤 Usuario ${index + 1}:`, {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                tienePassword: user.password ? 'Sí' : 'No',
                longitudPassword: user.password.length,
                rol: user.rol,
                estado: user.estado
            });
            return user;
        });

        console.log(`✅ ${usuarios.length} usuarios cargados`);
        return true;
    } catch (error) {
        console.error('❌ Error al cargar usuarios:', error);
        mostrarError('Error al conectar con el servidor. Por favor, intente más tarde.');
        return false;
    }
}

// Validar credenciales
function validarCredenciales(email, password) {
    console.log('🔍 Intentando login con:', {
        email: email,
        password: '***' + password.substring(password.length - 3),
        longitudPassword: password.length
    });

    console.log('📚 Usuarios disponibles:');
    usuarios.forEach((u, i) => {
        const emailMatch = u.email.toLowerCase() === email.toLowerCase();
        const passMatch = u.password === password;
        const estadoActivo = u.estado === 'Activo';
        console.log(`  ${i + 1}. Email: ${u.email} (match: ${emailMatch}), Password match: ${passMatch}, Estado: ${u.estado} (activo: ${estadoActivo})`);
    });

    const usuario = usuarios.find(u =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.estado === 'Activo'
    );

    if (usuario) {
        console.log('✅ Usuario encontrado:', usuario.nombre);
    } else {
        console.log('❌ No se encontró usuario con esas credenciales o usuario inactivo');
    }

    return usuario;
}

// Iniciar sesión
async function iniciarSesion(email, password) {
    const usuario = validarCredenciales(email, password);

    if (usuario) {
        // Guardar sesión en localStorage
        const sesion = {
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('sesion_ram', JSON.stringify(sesion));

        // Registrar login en Logs (opcional)
        await registrarLogin(usuario);

        // Redirigir al dashboard
        window.location.href = 'index.html';
        return true;
    } else {
        return false;
    }
}

// Registrar login en la hoja de Logs
async function registrarLogin(usuario) {
    try {
        const logData = {
            fecha: new Date().toISOString(),
            usuario: usuario.nombre,
            email: usuario.email,
            accion: 'LOGIN',
            detalles: 'Inicio de sesión exitoso'
        };

        // Aquí podrías llamar al Apps Script para registrar el log
        console.log('📝 Login registrado:', logData);
    } catch (error) {
        console.error('Error al registrar login:', error);
    }
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('sesion_ram');
    window.location.href = 'login.html';
}

// Verificar si hay sesión activa
function verificarSesion() {
    const sesion = localStorage.getItem('sesion_ram');

    if (!sesion) {
        return null;
    }

    try {
        return JSON.parse(sesion);
    } catch (error) {
        console.error('Error al parsear sesión:', error);
        return null;
    }
}

// Mostrar error en el formulario
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('loginError');
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = mensaje;
    errorDiv.classList.add('show');

    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

// Manejar envío del formulario
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const button = document.getElementById('loginButton');
    const errorDiv = document.getElementById('loginError');

    // Ocultar errores previos
    errorDiv.classList.remove('show');

    // Validar campos
    if (!email || !password) {
        mostrarError('Por favor, complete todos los campos');
        return;
    }

    // Mostrar loading
    button.classList.add('loading');
    button.disabled = true;

    try {
        // Intentar iniciar sesión
        const exito = await iniciarSesion(email, password);

        if (!exito) {
            mostrarError('Correo o contraseña incorrectos');
            button.classList.remove('loading');
            button.disabled = false;
        }
    } catch (error) {
        console.error('Error en login:', error);
        mostrarError('Error al iniciar sesión. Por favor, intente nuevamente.');
        button.classList.remove('loading');
        button.disabled = false;
    }
});

// Cargar usuarios al iniciar la página
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔐 Iniciando sistema de login...');

    // Verificar si ya hay sesión activa
    const sesionActiva = verificarSesion();
    if (sesionActiva) {
        console.log('✅ Sesión activa encontrada, redirigiendo...');
        window.location.href = 'index.html';
        return;
    }

    // Cargar usuarios
    await cargarUsuarios();
});

// Permitir Enter para enviar formulario
document.getElementById('password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});
