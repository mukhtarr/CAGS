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
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: doc });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  remove: async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
});

function getPopulateFields(Model) {
  const schema = Model.schema.obj;
  return Object.keys(schema)
    .filter(k => schema[k] && schema[k].ref)
    .join(' ');
}

module.exports = crudController;
