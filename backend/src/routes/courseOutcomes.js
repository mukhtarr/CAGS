const express = require('express');
const router = express.Router();
const CourseOutcome = require('../models/CourseOutcome');
const ctrl = require('../controllers/crudController')(CourseOutcome);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
