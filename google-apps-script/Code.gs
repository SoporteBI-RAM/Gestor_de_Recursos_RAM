// ========================================
// GOOGLE APPS SCRIPT - API GENÉRICA
// ========================================

const SHEET_ID = '1uTMjJ_4_uXfZ2u0P9CTMy4pzMBY60e0tzWkM6xnglTk';

function doGet(e) {
  try {
    const action = e.parameter.action;
    const sheetName = e.parameter.sheetName;

    // Si se solicita leer datos de una hoja
    if (action === 'read' && sheetName) {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(sheetName);

      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Hoja no encontrada: ' + sheetName
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*');
      }

      const data = sheet.getDataRange().getValues();

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: data
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
    }

    // Respuesta por defecto
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'API funcionando',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
  }
}

/**
 * FUNCIÓN CRÍTICA PARA CORS - Maneja peticiones OPTIONS (preflight)
 * Sin esta función, los POST desde localhost NO funcionarán
 */
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

function doPost(e) {
  try {
    const request = JSON.parse(e.postData.contents);
    const { action, sheetName, data, rowId, user } = request;

    let result;

    switch(action) {
      case 'add':
        result = addRow(sheetName, data, user || 'Web App');
        break;
      case 'update':
        result = updateRow(sheetName, rowId, data, user || 'Web App');
        break;
      case 'delete':
        result = deleteRow(sheetName, rowId, user || 'Web App');
        break;
      default:
        throw new Error('Acción no válida');
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: result
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
  }
}

// ========================================
// OPERACIONES GENÉRICAS
// ========================================

function addRow(sheetName, data, user) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) throw new Error('Hoja no encontrada: ' + sheetName);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const lastRow = sheet.getLastRow();
  const newId = lastRow > 1 ? parseInt(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
  const now = new Date().toISOString();

  // DEBUG: Log para ver qué datos llegan
  Logger.log('Headers: ' + JSON.stringify(headers));
  Logger.log('Data recibida: ' + JSON.stringify(data));

  // Determinar cuál es la columna de ID principal de esta hoja
  const primaryIdColumn = headers[0]; // Primera columna es siempre el ID principal (ID_Marca, ID_Cliente, etc.)

  const newRow = headers.map(header => {
    // Solo asignar el newId a la columna de ID PRINCIPAL, no a todas las que empiezan con ID_
    if (header === primaryIdColumn) return newId;

    // Para otros campos ID_ (como ID_Cliente en la tabla Marcas), usar el valor del data
    if (header.startsWith('ID_') && data[header] !== undefined) return data[header];

    if (header === 'Fecha_Creacion' || header === 'Ultima_Actualizacion') return now;
    if (header === 'Actualizado_Por') return user;

    // DEBUG: Log cada campo
    const value = data[header] || '';
    Logger.log('Header: ' + header + ' = ' + value);

    return value;
  });

  Logger.log('NewRow: ' + JSON.stringify(newRow));
  sheet.appendRow(newRow);
  logChange(sheetName, 'INSERT', `ID: ${newId}`, user);

  return { id: newId };
}

function updateRow(sheetName, rowId, data, user) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) throw new Error('Hoja no encontrada: ' + sheetName);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] == rowId) {
      const now = new Date().toISOString();

      headers.forEach((header, colIndex) => {
        if (header === 'Ultima_Actualizacion') {
          sheet.getRange(i + 1, colIndex + 1).setValue(now);
        } else if (header === 'Actualizado_Por') {
          sheet.getRange(i + 1, colIndex + 1).setValue(user);
        } else if (data[header] !== undefined && !header.startsWith('ID_') && header !== 'Fecha_Creacion') {
          sheet.getRange(i + 1, colIndex + 1).setValue(data[header]);
        }
      });

      logChange(sheetName, 'UPDATE', `ID: ${rowId}`, user);
      return { message: 'Actualizado' };
    }
  }

  throw new Error('Registro no encontrado');
}

function deleteRow(sheetName, rowId, user) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) throw new Error('Hoja no encontrada: ' + sheetName);

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] == rowId) {
      sheet.deleteRow(i + 1);
      logChange(sheetName, 'DELETE', `ID: ${rowId}`, user);
      return { message: 'Eliminado' };
    }
  }

  throw new Error('Registro no encontrado');
}

function logChange(tabla, operacion, descripcion, usuario) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Logs_Cambios');
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    const newId = lastRow > 1 ? parseInt(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;

    sheet.appendRow([
      newId,
      new Date().toISOString(),
      tabla,
      operacion,
      descripcion,
      usuario
    ]);
  } catch (error) {
    console.error('Error log:', error);
  }
}
