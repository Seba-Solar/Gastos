const gastoModel = require('../models/gasto_model.js');
const categoriaModel = require('../models/categoria_gasto_model.js');
const metodoModel = require('../models/metodo_pago_model.js');

exports.crearGasto = async (req, res) => {
    try {
        const { idMetodoPago, idCategoriaGasto, nombreGasto, descripcionGasto, montoGasto } = req.body;

        await gastoModel.crearGasto(
            nombreGasto,
            descripcionGasto,
            montoGasto,
            idCategoriaGasto,
            idMetodoPago
        );

        return res.redirect('/gastos');

    } catch (error) {
        console.error(error);
        return res.status(500).send('Problemas con el servidor para crear el Gasto: ' + error.message);
    }
};

exports.crearGastoView = async (req,res) => {
    try{
        const categoria = await categoriaModel.obtenerTodas();
        const metodo = await metodoModel.obtenerTodas();

        res.render('gastos_crear',{categoria,metodo})
    }catch(error){
        res.status(500).send('Error: '+error.message);
    }

}

exports.actualizarGastoView = async (req, res) => {
  try {
    const { idGasto } = req.params;
    const gasto = await gastoModel.obtenerPorId(idGasto);
    const categoria = await categoriaModel.obtenerTodas();
    const metodo = await metodoModel.obtenerTodas();
    return res.render('gastos_actualizar',{gasto,categoria,metodo})

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.obtenerPorId = async (req,res) => {

    try{
        const { id } = req.params;

        const objetoID = await gastoModel.obtenerPorId(id);

        return res.json({objetoID});

    }catch(error){
        return res.status(500).send('Error del servidor al traer registro por ID')
    }
}

exports.obtenerTodos = async (req,res) => {

    try{

        const objetoGastos = await gastoModel.obtenerTodas();

        return res.render('gasto', { objetoGastos });
        //return res.json({});
    }catch(error){
        return res.status(500).send('Error del servidor para llamar todos los objetos')
    }
}

exports.eliminarGasto = async (req,res) => {
    try{

        const { id } = req.params;
        let idNumber = Number(id);

        if (!id || isNaN(idNumber)) {
            return res.status(400).send('Error: ID inválido');
        }

        const eliminarGasto = await gastoModel.eliminar(id);

        return res.redirect('/gastos');

    }catch(error){
        return res.status(500).send('Error del servidor para eliminar el gasto')
    }
}

exports.actualizarGasto = async (req, res) => {
    try {
        const { id } = req.params;
        const idNum = Number(id);

        const { idMetodoPago, idCategoriaGasto, nombreGasto, descripcionGasto, montoGasto } = req.body;

        if (!id || isNaN(idNum)) {
            return res.status(400).send('Error en el ID');
        }

        const camposActualizar = {};

        if (idMetodoPago !== undefined && idMetodoPago.trim() !== '') {
            camposActualizar.idMetodoPago = idMetodoPago.trim();
        }

        if (idCategoriaGasto !== undefined && idCategoriaGasto.trim() !== '') {
            camposActualizar.idCategoriaGasto = idCategoriaGasto.trim();
        }

        if (nombreGasto !== undefined && nombreGasto.trim() !== '') {
            camposActualizar.nombreGasto = nombreGasto.trim();
        }

        if (descripcionGasto !== undefined && descripcionGasto.trim() !== '') {
            camposActualizar.descripcionGasto = descripcionGasto;
        }

        if (montoGasto !== undefined && !Number.isNaN(Number(montoGasto))) {
            camposActualizar.montoGasto = Number(montoGasto);
        }
        await gastoModel.actualizar(idNum, camposActualizar);

        return res.redirect('/gastos');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error del servidor al actualizar Gasto');
    }
};