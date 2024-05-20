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
        per.nombre as Docente,
        per.aPaterno as ApellidoPaterno,
        per.aMaterno as APellidoMaterno,
        a.idAsignatura,
        a.nomAsignatura as NombreAsignaturas
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
                a.nomAsignatura as NombreAsignatura,
                g.idGrupo,
                g.numAlumnos as NumeroTotalAlumnos,
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

const getAlumnosCalificaciones = async()=>{
    try{
        await sql.connect(config);
        const resultado = await sql.query(`
            SELECT a.idAlumno,
                p.nombre,
                p.aPaterno,
                p.aMaterno,
                a.idAsignatura,
                m.nomAsignatura,
                a.calificacion 
            FROM CA_SIA_CALIFICACIONES a
            INNER JOIN CA_SIA_ASIGNATURA m ON a.idAsignatura = m.idAsignatura
            INNER JOIN FD_SIA_ALUMNO al ON a.idAlumno = al.idAlumno
            INNER JOIN DP_SIA_PERSONA p ON al.idPersona = p.idPersona`);
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
