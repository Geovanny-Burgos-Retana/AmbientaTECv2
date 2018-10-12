const express = require('express');
const router = express.Router();

// Modelo de Campaña
const Campana = require('../../models/campana');

// Obtener campañas visibles para los usuarios normales
router.get('/', async (req, res) => {
	const campanas = await Campana.find({'habilitada': true});
    res.json(campanas);
});

// Obtener campañas no visibles a los usuarios normales
router.get('/get_camps_inv', async (req, res) => {
	const campanas = await Campana.find({'habilitada': true});
    res.json(campanas);
});

// Crear una campaña que necesita permisos de visualización por SU
router.post('/', (req, res) => {
	const newCampana = new Campana({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		organizador: req.body.organizador,
		fecha: req.body.fecha,
		telefono: req.body.telefono,
		email: req.body.email,
		descripcion: req.body.descripcion,
		habilitada: req.body.habilitada,
		hashtag: req.body.hashtag
	});
	newCampana.save().then(campana => res.json(campana));
});

// Eliminar campaña
router.delete('/:id', (req, res) => {
  Campana.findById(req.params.id)
    .then(campana => campana.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;