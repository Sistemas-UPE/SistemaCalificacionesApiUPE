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
  options: {
    trustServerCertificate: true
  }
};
app.use(require('cors')());

//Obtener al docente
app.get('/api/data', async (req, res) => {
  try {
    
    await sql.connect(config);
      
    const result = await sql.query('SELECT * FROM dbo.FD_SIA_DOCENTE');
    res.json(result.recordset);
    console.log(result);
  } catch (err) {
    console.error('Error al consultar la base de datos', err.message);
    res.status(500).send('Error del servidor al obtener datos');
  } finally {
    sql.close();
  }
});
//Obtener las materias
app.get('/api/docentes-asignaturas',async (req,res)=>{
  try{
    await sql.connect(config);
    const resultado = await sql.query(`
      SELECT 
        d.idDocente, 
        d.idPersona,
        per.nombre,
		    per.aPaterno,
		    per.aMaterno,
        a.idAsignatura,
        a.nomAsignatura
      FROM  
        dbo.FD_SIA_DOCENTE d
      INNER JOIN dbo.DP_SIA_PERSONA per ON d.idPersona = per.idPersona
      INNER JOIN
        dbo.CA_SIA_ASIGNATURA_DOCENTE ad ON d.idDocente = ad.idDocente
      INNER JOIN
        dbo.CA_SIA_ASIGNATURA a ON ad.idAsignatura = a.idAsignatura`);
    res.json(resultado.recordset);
  } catch(error){
    console.error('Error al consultar la base de datos', error.message);
    res.status(500).send('Error del servidor al obtener los datos');
  } finally{
    sql.close();
  }
})


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
