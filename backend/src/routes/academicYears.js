const express = require('express');
const router = express.Router();
const AcademicYear = require('../models/AcademicYear');
const ctrl = require('../controllers/crudController')(AcademicYear);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
