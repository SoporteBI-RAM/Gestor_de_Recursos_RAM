// ========================================
// SELECTOR DE ICONOS (EMOJI PICKER)
// ========================================

const ICONOS_DISPONIBLES = {
    'Documentos': ['📄', '📃', '📋', '📑', '📊', '📈', '📉', '🗂️', '📁', '📂'],
    'Datos': ['📦', '💾', '🗄️', '💿', '📀', '🔢', '📊', '📈', '📉', '🔍'],
    'Análisis': ['📊', '📈', '📉', '🔍', '🔎', '🧮', '📐', '📏', '🎯', '💡'],
    'Técnico': ['🔌', '⚙️', '🛠️', '🔧', '🖥️', '💻', '⌨️', '🖱️', '🔗', '📡'],
    'Presentación': ['📑', '🎤', '🎥', '📹', '📷', '🖼️', '🎨', '🖌️', '✏️', '📝'],
    'Web': ['🌐', '🌍', '🌎', '🌏', '💻', '📱', '🖥️', '⌨️', '🖱️', '🔗'],
    'Comunicación': ['📧', '💬', '📞', '📟', '📠', '📮', '📬', '📭', '📪', '📫'],
    'Otros': ['⭐', '✨', '🎯', '🎁', '🎉', '🎊', '🔔', '🔕', '🔖', '📌']
};

// Inicializar el selector de iconos
function initIconPicker() {
    const iconPicker = document.getElementById('icon-picker');
    if (!iconPicker) return;

    const grid = iconPicker.querySelector('div');
    grid.innerHTML = '';

    // Crear categorías de iconos
    Object.entries(ICONOS_DISPONIBLES).forEach(([categoria, iconos]) => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.style.cssText = 'margin-bottom: 15px;';

        const titulo = document.createElement('div');
        titulo.style.cssText = 'font-size: 12px; color: #5F6368; margin-bottom: 8px; font-weight: 500;';
        titulo.textContent = categoria;
        categoriaDiv.appendChild(titulo);

        const iconosGrid = document.createElement('div');
        iconosGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)); gap: 8px;';

        iconos.forEach(icono => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = icono;
            btn.style.cssText = `
                font-size: 28px;
                padding: 8px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                width: 100%;
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            btn.onmouseover = function() {
                this.style.borderColor = '#4285F4';
                this.style.background = '#E8F0FE';
                this.style.transform = 'scale(1.1)';
            };

            btn.onmouseout = function() {
                this.style.borderColor = '#e0e0e0';
                this.style.background = 'white';
                this.style.transform = 'scale(1)';
            };

            btn.onclick = function() {
                selectIcon(icono);
            };

            iconosGrid.appendChild(btn);
        });

        categoriaDiv.appendChild(iconosGrid);
        grid.appendChild(categoriaDiv);
    });
}

// Seleccionar un icono
function selectIcon(icono) {
    const input = document.getElementById('icono-input');
    input.value = icono;
    toggleIconPicker(); // Cerrar el selector
}

// Mostrar/ocultar el selector
function toggleIconPicker() {
    const picker = document.getElementById('icon-picker');
    const isVisible = picker.style.display !== 'none';

    if (isVisible) {
        picker.style.display = 'none';
    } else {
        picker.style.display = 'block';
        // Inicializar solo la primera vez
        if (picker.querySelector('div').children.length === 0) {
            initIconPicker();
        }
    }
}

// Cerrar al hacer click fuera
document.addEventListener('click', function(event) {
    const picker = document.getElementById('icon-picker');
    const input = document.getElementById('icono-input');
    const button = event.target.closest('button[onclick="toggleIconPicker()"]');

    if (picker && !picker.contains(event.target) && event.target !== input && !button) {
        picker.style.display = 'none';
    }
});

// También permitir click en el input para abrir
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('icono-input');
    if (input) {
        input.addEventListener('click', toggleIconPicker);
    }
});

// ========================================
// SELECTOR DE ICONOS PARA CATEGORÍAS
// ========================================

function toggleIconPickerCategoria() {
    console.log('toggleIconPickerCategoria called');
    const picker = document.getElementById('icon-picker-categoria');
    if (!picker) {
        console.error('Icon picker categoria not found');
        return;
    }

    console.log('Picker found, current display:', picker.style.display);
    const isVisible = picker.style.display === 'block';

    if (isVisible) {
        picker.style.display = 'none';
        console.log('Hiding picker');
    } else {
        picker.style.display = 'block';
        console.log('Showing picker');
        const innerDiv = picker.querySelector('div');
        console.log('Inner div:', innerDiv, 'Children length:', innerDiv ? innerDiv.children.length : 'null');
        // Verificar si no tiene elementos reales (solo comentarios no cuentan como children, pero textNodes sí)
        if (innerDiv && (innerDiv.children.length === 0 || !innerDiv.querySelector('.icon-grid'))) {
            console.log('Initializing icon picker categoria');
            initIconPickerCategoria();
        }
    }
}

function initIconPickerCategoria() {
    console.log('initIconPickerCategoria called');
    const iconPicker = document.getElementById('icon-picker-categoria');
    if (!iconPicker) {
        console.error('iconPicker not found in initIconPickerCategoria');
        return;
    }

    const grid = iconPicker.querySelector('div');
    if (!grid) {
        console.error('grid div not found');
        return;
    }

    grid.innerHTML = '';
    grid.className = 'icon-grid'; // Agregar clase para detectar inicialización

    console.log('Creating icon categories...');
    Object.entries(ICONOS_DISPONIBLES).forEach(([categoria, iconos]) => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.style.cssText = 'margin-bottom: 15px;';

        const titulo = document.createElement('div');
        titulo.style.cssText = 'font-size: 12px; color: #5F6368; margin-bottom: 8px; font-weight: 500;';
        titulo.textContent = categoria;
        categoriaDiv.appendChild(titulo);

        const iconosGrid = document.createElement('div');
        iconosGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)); gap: 8px;';

        iconos.forEach(icono => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = icono;
            btn.style.cssText = `
                font-size: 28px;
                padding: 8px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                width: 100%;
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            btn.onmouseover = function() {
                this.style.borderColor = '#4285F4';
                this.style.background = '#E8F0FE';
                this.style.transform = 'scale(1.1)';
            };

            btn.onmouseout = function() {
                this.style.borderColor = '#e0e0e0';
                this.style.background = 'white';
                this.style.transform = 'scale(1)';
            };

            btn.onclick = function() {
                selectIconCategoria(icono);
            };

            iconosGrid.appendChild(btn);
        });

        categoriaDiv.appendChild(iconosGrid);
        grid.appendChild(categoriaDiv);
    });
    console.log('Icon picker categoria initialized with', Object.keys(ICONOS_DISPONIBLES).length, 'categories');
}

function selectIconCategoria(icono) {
    const input = document.getElementById('icono-categoria-input');
    input.value = icono;
    toggleIconPickerCategoria();
}

// ========================================
// SELECTOR DE ICONOS PARA HERRAMIENTAS
// ========================================

function toggleIconPickerHerramienta() {
    const picker = document.getElementById('icon-picker-herramienta');
    const isVisible = picker.style.display !== 'none';

    if (isVisible) {
        picker.style.display = 'none';
    } else {
        picker.style.display = 'block';
        if (picker.querySelector('div').children.length === 0) {
            initIconPickerHerramienta();
        }
    }
}

function initIconPickerHerramienta() {
    const iconPicker = document.getElementById('icon-picker-herramienta');
    if (!iconPicker) return;

    const grid = iconPicker.querySelector('div');
    grid.innerHTML = '';

    Object.entries(ICONOS_DISPONIBLES).forEach(([categoria, iconos]) => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.style.cssText = 'margin-bottom: 15px;';

        const titulo = document.createElement('div');
        titulo.style.cssText = 'font-size: 12px; color: #5F6368; margin-bottom: 8px; font-weight: 500;';
        titulo.textContent = categoria;
        categoriaDiv.appendChild(titulo);

        const iconosGrid = document.createElement('div');
        iconosGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)); gap: 8px;';

        iconos.forEach(icono => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = icono;
            btn.style.cssText = `
                font-size: 28px;
                padding: 8px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                width: 100%;
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            btn.onmouseover = function() {
                this.style.borderColor = '#4285F4';
                this.style.background = '#E8F0FE';
                this.style.transform = 'scale(1.1)';
            };

            btn.onmouseout = function() {
                this.style.borderColor = '#e0e0e0';
                this.style.background = 'white';
                this.style.transform = 'scale(1)';
            };

            btn.onclick = function() {
                selectIconHerramienta(icono);
            };

            iconosGrid.appendChild(btn);
        });

        categoriaDiv.appendChild(iconosGrid);
        grid.appendChild(categoriaDiv);
    });
}

function selectIconHerramienta(icono) {
    const input = document.getElementById('icono-herramienta-input');
    input.value = icono;
    toggleIconPickerHerramienta();
}
