const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const crudController = (Model) => ({
  getAll: async (req, res) => {
    try {
      const docs = await Model.find().populate(getPopulateFields(Model));
      res.json({ success: true, data: docs });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  getOne: async (req, res) => {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    try {
      const doc = await Model.findById(req.params.id).populate(getPopulateFields(Model));
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: doc });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const doc = new Model(req.body);
      await doc.save();
      res.status(201).json({ success: true, data: doc });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  update: async (req, res) => {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const doc = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: doc });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  remove: async (req, res) => {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const doc = await Model.findByIdAndDelete(id);
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
});

function getPopulateFields(Model) {
  const schema = Model.schema.obj;
  return Object.keys(schema).filter(k => {
    const field = schema[k];
    if (!field) return false;
    // Direct ref: { type: ObjectId, ref: '...' }
    if (field.ref) return true;
    // Array of refs: [{ type: ObjectId, ref: '...' }]
    if (Array.isArray(field) && field[0] && field[0].ref) return true;
    return false;
  }).join(' ');
}

module.exports = crudController;
