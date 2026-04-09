const db = require('../db/connection');

exports.obtenerTodas = async () => {
  const [rows] = await db.query('SELECT * FROM gasto');
  return rows;
};

exports.obtenerPorId = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM gasto WHERE idGasto = ?',
    [id]
  );
  return rows[0];
};

exports.crearGasto = async (nombreGasto,descripcionGasto,montoGasto,idCategoriaGasto,idMetodoPago) => {
  await db.query(
    'INSERT INTO gasto (nombreGasto,descripcionGasto,montoGasto,idCategoriaGasto,idMetodoPago) VALUES (?,?,?,?,?)',
    [nombreGasto,descripcionGasto,montoGasto,idCategoriaGasto,idMetodoPago]
  );
};

exports.actualizar = async (idGasto, datos) => {
  const campos = [];
  const valores = [];

  if (datos.nombreGasto !== undefined) {
    campos.push('nombreGasto = ?');
    valores.push(datos.nombreGasto);
  }

  if (datos.descripcionGasto !== undefined) {
    campos.push('descripcionGasto = ?');
    valores.push(datos.descripcionGasto);
  }

  if (datos.montoGasto !== undefined) {
    campos.push('montoGasto = ?');
    valores.push(datos.montoGasto);
  }

  if (datos.idCategoriaGasto !== undefined) {
    campos.push('idCategoriaGasto = ?');
    valores.push(datos.idCategoriaGasto);
  }

  if (datos.idMetodoPago !== undefined) {
    campos.push('idMetodoPago = ?');
    valores.push(datos.idMetodoPago);
  }
  if (campos.length === 0) {
    throw new Error('No hay campos para actualizar');
  }

  valores.push(idGasto);

  const sql = `
    UPDATE gasto
    SET ${campos.join(', ')}
    WHERE idGasto = ?
  `;

  await db.query(sql, valores);
};


exports.eliminar = async (idGasto) => {
  await db.query(
    'DELETE FROM gasto WHERE idGasto = ?',
    [idGasto]
  );
};