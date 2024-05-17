const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,

};
app.use(require('cors')());

app.get('/api/data', async (req, res) => {
  try {
    
    await sql.connect(config);
      
    const result = await sql.query('SELECT * FROM dbo.FD_SIA_DOCENTE');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al consultar la base de datos', err.message);
    res.status(500).send('Error del servidor al obtener datos');
  } finally {
    sql.close();
  }
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
