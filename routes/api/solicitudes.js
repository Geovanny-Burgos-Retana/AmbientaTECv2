const express = require('express');
const router = express.Router();

// Campaña Model
const Solicitud = require('../../models/solicitud');


// @route   POST api/solicitudes
// @desc    Create a solicitud
// @access  Public
router.post('/', (req, res) => {
	const newSolicitud = new Solicitud({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		organizador: req.body.organizador,
		fecha: req.body.fecha,
		telefono: req.body.telefono,
		email: req.body.email,
		descripcion: req.body.descripcion
	});

	newSolicitud.save().then(solicitud => res.json(solicitud));
});


module.exports = router;