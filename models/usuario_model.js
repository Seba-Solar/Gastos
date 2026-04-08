const db = require('../db/connection');

exports.obtenerUsuarios = async () => {
  const [rows] = await db.query('SELECT * FROM usuario');
  return rows;
};


exports.crear = async (nombreUsuario,nombrePerfil,passwordHash,mailUsuario) => {
  await db.query(
    'INSERT INTO usuario (nombreUsuario,nombrePerfil,pwUsuario,mailUsuario) VALUES (?,?,?,?)',
    [nombreUsuario,nombrePerfil,passwordHash,mailUsuario]
  );
};

exports.actualizar = async (idUsuario, datos) => {
  const campos = [];
  const valores = [];

  if (datos.nombreUsuario !== undefined) {
    campos.push('nombreUsuario = ?');
    valores.push(datos.nombreUsuario);
  }

  if (datos.mailUsuario !== undefined) {
    campos.push('mailUsuario = ?');
    valores.push(datos.mailUsuario);
  }

  if (datos.pwUsuario !== undefined) {
    campos.push('pwUsuario = ?');
    valores.push(datos.pwUsuario);
  }

  if (datos.nombrePerfil !== undefined) {
    campos.push('nombrePerfil = ?');
    valores.push(datos.nombrePerfil);
  }

  if (campos.length === 0) {
    throw new Error('No hay campos para actualizar');
  }

  valores.push(idUsuario);

  const sql = `
    UPDATE USUARIO
    SET ${campos.join(', ')}
    WHERE idUsuario = ?
  `;

  await db.query(sql, valores);
};


exports.eliminar = async (idusuario) => {
  await db.query(
    'DELETE FROM usuario WHERE idusuario = ?',
    [idusuario]
  );
};