const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Empcuentaresa Model
const Cuenta = require('../../models/cuenta');


// @route   POST api/participantes
// @desc    Create a participantes
// @access  Public
router.post('/', async (req, res) => {
    const newCuenta = new Cuenta({
        provider: req.body.provider,
        userID: req.body.userID,
        name: req.body.name,
        score: 0,
        email: req.body.email,
        retosParticipacion: req.body.retosParticipacion,
        retosGanados: req.body.retosGanados,
        retosPerdidos:req.body.retosPerdidos,
        campanias: []
    });
    await newCuenta.save().then(cuenta => res.json(cuenta));
});

//Mete un reto en los que estan en participacion
router.put('/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$push: {retosParticipacion: req.body.reto}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
//Mete un reto en los ganados
router.put('/ganar/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$push: {retosGanados: req.body.reto}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
//Aumenta el SCORE de la cuenta
router.put('/score/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$set: {score: req.body.score}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
//Quita un reto de los que estan en participacion
router.put('/participaPop/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$pull: {retosParticipacion: req.body.reto}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
//Validar si la cuenta existe
router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    await Cuenta.find(function(err, data) {
        if (err) return console.error(err);
        const resultado = data.find(function(element){
            return element.userID==req.params.id;
        });
        if(resultado){
            console.log("SERVER:Si existe el usuario en la BD");
            res.json(resultado);
        }
        else{
            console.log("SERVER: No existe el usuario en la BD");
            res.json(null);
        }
      });
  });
//Devuelve una unica cuenta
router.get('/unica/:id', async (req, res) => {
  await Cuenta.findById(req.params.id)
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
// Agregar campaña al arreglo  de identificadores de campañas
router.put('/addCampania/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$push: {campanias: req.body.campania}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
//Dejar de participar en una campaña
router.put('/noParticipation/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$pull: {campanias: req.body.campania}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});

// Eliminar campaña al arreglo de identificadores de campañas
router.put('/delCampania/:_id', async (req, res) => {
    if( req.body.campania != null){
        await Cuenta.updateOne( { _id: mongoose.Types.ObjectId(req.params._id) }, { $pull: { campanias: { $in: [ req.body.campania ] } } }, { multi: true } );    
        res.json({ status: 'Campaña eliminada de lista' });
    }else{
        res.json({ status: 'Campo campania no contemplado en el json' });
    }
});

// Obtener la lista de campañas del usuario
router.get('/getCampanias/:_id', async (req, res) => {
    const campanias = await Campana.find({ _id: mongoose.Types.ObjectId(req.params._id) }, { _id: 0, campanias: 1 });
    res.json(campanias);   
});

module.exports = router;