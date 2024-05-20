// controllers/dataController.js
const dataModel = require("../Models/data");

const getDocentes = async (req, res) => {
  try {
    const data = await dataModel.getDocentes();
    res.json(data);
  } catch (err) {
    console.error("Error al obtener los datos", err.message);
    res.status(500).send("Error del servidor al obtener datos");
  }
};

const getDocentesAsignaturas = async (req, res) => {
  try {
    const data = await dataModel.getDocentesAsignaturas();
    res.json(data);
  } catch (err) {
    console.error("Error al obtener los datos", err.message);
    res.status(500).send("Error del servidor al obtener datos");
  }
};

const getAsignaturasGrupos = async (req, res) => {
  try {
    const datos = await dataModel.getAsignaturasGrupos();
    res.json(datos);
  } catch (error) {
    console.error("Ocurrio un error al obtener los datos", error.message);
    res.status(500).send("Error en el servidos");
  }
};
const getAlumnosCalificaciones = async (req,res) => {
  try {
    const consulta = await dataModel.getAlumnosCalificaciones();
    res.json(consulta);
  } catch (error) {
    console.error("Ocurrio un error al obtener los datos", error.message);
    res.status(500).send("Error en el servidor");
  }
};

const postCalificacion = async (req, res) => {
    try {
      const { idAlumno, idAsignatura, calificacion } = req.body;
      const rowsAffected = await dataModel.addCalificacion(idAlumno, idAsignatura, calificacion);
      if (rowsAffected > 0) {
        res.status(201).send('Calificación agregada con éxito');
      } else {
        res.status(500).send('Error del servidor al agregar la calificación');
      }
    } catch (err) {
      console.error('Error al agregar la calificación', err.message);
      res.status(500).send('Error del servidor al agregar la calificación');
    }
  };
  


module.exports = {
  getDocentes,
  getDocentesAsignaturas,
  getAsignaturasGrupos,
  getAlumnosCalificaciones,
  postCalificacion,
};
