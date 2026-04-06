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