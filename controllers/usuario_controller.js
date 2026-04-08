const usuarioModel = require('../models/usuario_model');
const bcrypt = require('bcrypt');

exports.crearUsuario = async (req,res ) => {
    try{
        const { nombreUsuario, nombrePerfil, pwUsuario, mailUsuario } = req.body;

        const saltRounds = 10;
        let passwordHash = await bcrypt.hash(pwUsuario, saltRounds);

        const crearCategoria = await usuarioModel.crear(
            nombreUsuario,
            nombrePerfil,
            passwordHash,
            mailUsuario
        );
        
        res.status(200).send('Usuario creado con exito')
    }catch(error){
        console.error(error);
        return res.status(500).send('Error del servidor al llamar crear Usuario')
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const idNum = Number(id);

        const { nombreUsuario, nombrePerfil, pwUsuario, mailUsuario } = req.body;

        if (!id || isNaN(idNum)) {
            return res.status(400).send('Error en el ID');
        }

        const camposActualizar = {};

        if (nombreUsuario !== undefined && nombreUsuario.trim() !== '') {
            camposActualizar.nombreUsuario = nombreUsuario.trim();
        }

        if (nombrePerfil !== undefined && nombrePerfil.trim() !== '') {
            camposActualizar.nombrePerfil = nombrePerfil.trim();
        }

        if (mailUsuario !== undefined && mailUsuario.trim() !== '') {
            camposActualizar.mailUsuario = mailUsuario.trim();
        }

        if (pwUsuario !== undefined && pwUsuario.trim() !== '') {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(pwUsuario.trim(), saltRounds);
            camposActualizar.pwUsuario = passwordHash;
        }

        await usuarioModel.actualizar(idNum, camposActualizar);

        return res.redirect('/usuarios');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error del servidor al actualizar Usuario');
    }
};

exports.borrarUsuario = async (req, res) => {

    try{
        const { id } = req.params;

        const idNum = Number(id);

        if (!id || isNaN(idNum)) {
            return res.status(400).send('Error: ID inválido');
        }

        const eliminarUsuario = await usuarioModel.eliminar(id);

        return res.redirect('/usuarios');
        
    }catch(error){
        return res.status(500).send('Error al eliminar usuario')
    }
}

exports.listarUsuarios = async (req, res) => {

    try{

        const usuarios = await usuarioModel.obtenerUsuarios();
        return res.send({usuarios});
    }catch(error){
        return res.status(500).send('Error al listar usuarios')
    }
}