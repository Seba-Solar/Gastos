const db = require('../db/connection');

exports.obtenerTodas = async () => {
  const [rows] = await db.query('SELECT * FROM metodo_pago');
  return rows;
};

exports.obtenerPorId = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM metodo_pago WHERE idmetodo_pago = ?',
    [id]
  );
  return rows[0];
};

exports.crear = async (tipoPago) => {
  await db.query(
    'INSERT INTO metodo_pago (tipoPago) VALUES (?)',
    [tipoPago]
  );
};

exports.actualizar = async (id, tipoPago) => {
  await db.query(
    'UPDATE metodo_pago SET tipoPago = ? WHERE idmetodo_pago = ?',
    [tipoPago, id]
  );
};

exports.eliminar = async (idmetodo_pago) => {
  await db.query(
    'DELETE FROM metodo_pago WHERE idmetodo_pago = ?',
    [idmetodo_pago]
  );
};