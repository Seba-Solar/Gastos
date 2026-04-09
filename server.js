const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const pool = require('./db/connection');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Configurar motor de vistas
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use('/categorias', require('./routes/categoria_gasto_route'));
app.use('/usuarios' , require('./routes/usuario_route'));
app.use('/gastos' , require('./routes/gasto_route'));
app.use('/metodo_pago' , require('./routes/metodo_pago_route'));

app.get('/hello_world', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Gasto App Puerto: http://localhost:${port}`)
})

//Solo para cargar el template, es temporal
app.get('/gastos',(req,res)=> {
  const gastos = [];
  const totalGastos = 0;
  res.render('gastos', { gastos, totalGastos });
})