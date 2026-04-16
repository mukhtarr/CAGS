import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../api/axios';
import Modal from '../components/Modal';
import Table from '../components/Table';

const defaultForm = {
  code: '', description: '', subject: '',
  bloomsLevel: '', programOutcomes: [], psos: []
};
const bloomsOptions = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];

export default function CourseOutcomes() {
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [pos, setPos] = useState([]);
  const [psosData, setPsosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [coRes, subRes, poRes, psoRes] = await Promise.all([
        api.get('/course-outcomes'),
        api.get('/subjects'),
        api.get('/program-outcomes'),
        api.get('/psos'),
      ]);
      setData(coRes.data.data || []);
      setSubjects(subRes.data.data || []);
      setPos(poRes.data.data || []);
      setPsosData(psoRes.data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(defaultForm); setEditId(null); setModalOpen(true); };
  const openEdit = (row) => {
    setForm({
      code: row.code || '',
      description: row.description || '',
      subject: row.subject?._id || row.subject || '',
      bloomsLevel: row.bloomsLevel || '',
      programOutcomes: (row.programOutcomes || []).map((p) => p._id || p),
      psos: (row.psos || []).map((p) => p._id || p),
    });
    setEditId(row._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/course-outcomes/${editId}`, form);
      } else {
        await api.post('/course-outcomes', form);
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course outcome?')) return;
    try {
      await api.delete(`/course-outcomes/${id}`);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleMultiSelect = (field) => (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, [field]: selected });
  };

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'description', label: 'Description', render: (v) => <span title={v}>{v?.length > 60 ? v.slice(0, 60) + '…' : v}</span> },
    { key: 'subject', label: 'Subject', render: (v) => v?.name || '—' },
    { key: 'bloomsLevel', label: "Bloom's Level" },
    { key: 'programOutcomes', label: 'POs', render: (v) => (v || []).map((p) => p.code || p).join(', ') || '—' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Course Outcomes</h2>
          <p>Manage Course Outcomes (COs)</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><FaPlus /> Add CO</button>
      </div>
      <div className="page-body">
        <div className="card">
          {loading ? <div className="loading">Loading...</div> : (
            <Table columns={columns} data={data} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Course Outcome' : 'Add Course Outcome'}>
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label>Code *</label>
                <input className="form-control" required value={form.code} onChange={set('code')} placeholder="e.g. CO1" />
              </div>
              <div className="form-group">
                <label>Bloom's Level</label>
                <select className="form-control" value={form.bloomsLevel} onChange={set('bloomsLevel')}>
                  <option value="">Select Level</option>
                  {bloomsOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea className="form-control" required rows="3" value={form.description} onChange={set('description')} placeholder="Course outcome description..." />
            </div>
            <div className="form-group">
              <label>Subject *</label>
              <select className="form-control" required value={form.subject} onChange={set('subject')}>
                <option value="">Select Subject</option>
                {subjects.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Program Outcomes (Multi-select)</label>
                <select className="form-control" multiple value={form.programOutcomes} onChange={handleMultiSelect('programOutcomes')}>
                  {pos.map((p) => <option key={p._id} value={p._id}>{p.code}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>PSOs (Multi-select)</label>
                <select className="form-control" multiple value={form.psos} onChange={handleMultiSelect('psos')}>
                  {psosData.map((p) => <option key={p._id} value={p._id}>{p.code}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
