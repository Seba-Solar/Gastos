const db = require('../db/connection');

exports.obtenerTodas = async () => {
  const [rows] = await db.query('SELECT * FROM CATEGORIA_GASTO');
  return rows;
};

exports.obtenerPorId = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM CATEGORIA_GASTO WHERE idCategoria_Gasto = ?',
    [id]
  );
  return rows[0];
};

exports.crear = async (nombreCategoria) => {
  await db.query(
    'INSERT INTO CATEGORIA_GASTO (nombreCategoria) VALUES (?)',
    [nombreCategoria]
  );
};

exports.actualizar = async (idCategoria_Gasto, nombreCategoria) => {
  await db.query(
    'UPDATE CATEGORIA_GASTO SET nombreCategoria = ? WHERE idCategoria_Gasto = ?',
    [nombreCategoria, idCategoria_Gasto]
  );
};

exports.eliminar = async (idCategoria_Gasto) => {
  await db.query(
    'DELETE FROM CATEGORIA_GASTO WHERE idCategoria_Gasto = ?',
    [idCategoria_Gasto]
  );
};