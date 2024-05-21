// models/data.js
const sql = require("mssql");
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
  },
};

const getDocentes = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM dbo.FD_SIA_DOCENTE");
    return result.recordset;
  } catch (err) {
    console.error("Error al consultar la base de datos", err.message);
  } finally {
    sql.close();
  }
};

const getDocentesAsignaturas = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query(`EXEC dbo.spDocentesAsignaturas;;`);
    return result.recordset;
  } catch (err) {
    console.error("Error al consultar la base de datos", err.message);
  } finally {
    sql.close();
  }
};

const getAsignaturasGrupos = async () => {
    try{
        await sql.connect(config);
        const resultado = await sql.query(`
        EXEC dbo.spAsignaturasGrupos;`);
        return resultado.recordset;
    } catch(error){
        console.error("Error al obtener los datos",error.message);
    } finally{
        sql.close();
    }
  
};

const getAlumnosCalificaciones = async()=>{
    try{
        await sql.connect(config);
        const resultado = await sql.query(`
        EXEC dbo.spAlumnosCalificaciones;`);
        return resultado.recordset;
    } catch(error){
        console.error("Error al obtener los datos",error.message);
    } finally{
        sql.close();
    }
};

//Agrega calificacion a un alumno
const addCalificacion = async (idAlumno, idAsignatura, calificacion) => {
    try {
      await sql.connect(config);
      const result = await sql.query(`
        INSERT INTO dbo.CA_SIA_CALIFICACIONES (idAlumno, idAsignatura, calificacion)
        VALUES ('${idAlumno}', '${idAsignatura}', ${calificacion})
      `);
      return result.rowsAffected[0]; 
    } catch (err) {
      console.error('Error al insertar la calificación', err.message);
    } finally {
      sql.close();
    }
  };

module.exports = { getDocentes, getDocentesAsignaturas, getAsignaturasGrupos, getAlumnosCalificaciones, addCalificacion };
