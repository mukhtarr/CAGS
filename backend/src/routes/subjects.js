const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const ctrl = require('../controllers/crudController')(Subject);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
