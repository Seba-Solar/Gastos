const metodoPagoModel = require('../models/metodo_pago_model');

exports.listar = async (req, res) => {
  try {
    const metodopago = await metodoPagoModel.obtenerTodas();
    res.send({ metodopago });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar Metodo Pago');
  }
};

exports.actualizarMetodoPago = async (req, res) => {

    try{

        const { id } = req.params;
        const { tipoPago } = req.body;

        const actualizarMetodoPago = await metodoPagoModel.actualizar(id,tipoPago);
        res.send('Categoria Actualizada')

    }catch (error) {
        console.error(error);
        res.status(500).send('Error al Actualizar la categoria del lado del servidor')
    }

}

exports.crearMetodoPago = async (req,res ) => {
    try{
        const { tipoPago } = req.body;
        
        if (typeof tipoPago !== 'string' || tipoPago.trim() === '') {
            return res.status(400).send('Error: No se puede crear tipoPago sin nombre')
        }

        const crearMetodoPago = await metodoPagoModel.crear(tipoPago);

        return res.redirect('/metodo_pago');
        
    }catch(error){
        console.error(error);
        return res.status(500).send('Error del servidor al llamar crear tipoPago')
    }
}

exports.llamarMetodoPagoId = async (req, res) => {

    try{
        const {id} = req.params;
        const tipoPago = await metodoPagoModel.obtenerPorId(id);
        res.send({ tipoPago });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor al llamar por ID')
    }
}

exports.eliminarMetodoPagoId = async (req,res) => {
    try{
       const { id } = req.params;
       const idNum = Number(id);
        if (!id || isNaN(idNum)) {
            return res.status(400).send('Error: ID inválido');
        }
        const metodopago_eliminar = await metodoPagoModel.eliminar(id);
        return res.redirect('/metodo_pago')
    }catch(error) {
        console.error(error);
        return res.status(500).send('Error del sistema al borrar Categoria')
    }
}