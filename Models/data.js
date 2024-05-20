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
    const result = await sql.query(`
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
            SELECT
                a.idAsignatura,
                a.nomAsignatura,
                g.idGrupo,
                g.numAlumnos,
                g.periodo
            FROM CA_SIA_ASIGNATURA a 
            INNER JOIN dbo.CA_SIA_ASIGNATURA_GRUPO ag ON a.idAsignatura = ag.idAsignatura
            INNER JOIN dbo.CT_SIA_GRUPO g ON ag.idGrupo = g.idGrupo`);
        return resultado.recordset;
    } catch(error){
        console.error("Error al obtener los datos",error.message);
    } finally{
        sql.close();
    }
  
};

module.exports = { getDocentes, getDocentesAsignaturas, getAsignaturasGrupos };
