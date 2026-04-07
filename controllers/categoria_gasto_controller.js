const { render } = require('ejs');
const categoriaModel = require('../models/categoria_gasto_model');

exports.listar = async (req, res) => {
  try {
    const categorias = await categoriaModel.obtenerTodas();
    res.send({ categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar categorías');
  }
};

exports.actualizarCategoria = async (req, res) => {

    try{

        const { id } = req.params;
        const { nombreCategoria } = req.body;

        const actualizarCategoria = await categoriaModel.actualizar(id,nombreCategoria);
        res.send('Categoria Actualizada')

    }catch (error) {
        console.error(error);
        res.status(500).send('Error al Actualizar la categoria del lado del servidor')
    }

}

exports.crearCategoria = async (req,res ) => {
    try{
        const { nombreCategoria } = req.body;
        
        if (typeof nombreCategoria !== 'string' || nombreCategoria.trim() === '') {
            return res.status(400).send('Error: No se puede crear categoria sin nombre')
        }

        const crearCategoria = await categoriaModel.crear(nombreCategoria);

        return res.redirect('/categorias');
        
    }catch(error){
        console.error(error);
        return res.status(500).send('Error del servidor al llamar crear Categoria')
    }
}

exports.llamarCategoriaId = async (req, res) => {

    try{
        const {id} = req.params;
        const categoria_registro = await categoriaModel.obtenerPorId(id);
        res.send({ categoria_registro });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor al llamar por ID')
    }
}

exports.eliminarCategoriaId = async (req,res) => {


    try{

       const { id } = req.params;

        const idNum = Number(id);

        if (!id || isNaN(idNum)) {
            return res.status(400).send('Error: ID inválido');
        }

        const categoria_eliminar = await categoriaModel.eliminar(id);

        return res.redirect('/categorias')

    }catch(error) {
        console.error(error);
        return res.status(500).send('Error del sistema al borrar Categoria')
    }

}