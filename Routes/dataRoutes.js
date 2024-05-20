// routes/data.js
const express = require('express');
const router = express.Router();
const dataController = require('../Controller/dataController');

router.get('/api/docentes', dataController.getDocentes);
router.get('/api/docentes-asignaturas', dataController.getDocentesAsignaturas);
router.get('/api/asignaturas-grupos',dataController.getAsignaturasGrupos);

module.exports = router;
