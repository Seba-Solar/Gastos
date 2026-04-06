const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const pool = require('./db/connection');

// Configurar motor de vistas
app.set('view engine', 'ejs');

// Carpeta de vistas (opcional si usas /views)
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Gasto App Puerto: http://localhost:${port}`)
})

app.get('/gastos',(req,res)=> {
  const gastos = [];
  const totalGastos = 0;
  res.render('gastos', { gastos, totalGastos });
})