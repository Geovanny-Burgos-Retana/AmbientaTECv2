const express = require('express');
const router = express.Router();

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
        email: req.body.email,
        retosParticipacion: req.body.retosParticipacion,
        retosGanados: req.body.retosGanados,
        retosPerdidos:req.body.retosPerdidos
    });
    console.log("Nuevo usuario: "+ newCuenta);

    await newCuenta.save().then(cuenta => res.json(cuenta));
});

/* UPDATE Account  retosParticipacion.append*/
router.put('/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$push: {retosParticipacion: req.body.reto}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
router.put('/ganar/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$push: {retosGanados: req.body.reto}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});

router.put('/participaPop/:id', function(req, res, next) {
    Cuenta.findByIdAndUpdate(req.params.id,
    {$pull: {retosParticipacion: req.body.reto}},
    {safe: true, upsert: true})
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
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

router.get('/unica/:id', async (req, res) => {
  await Cuenta.findById(req.params.id)
    .then(cuenta => res.json(cuenta))
    .catch(err => res.status(404).json({ success: false }));
});
  


module.exports = router;