import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../api/axios';
import Modal from '../components/Modal';
import Table from '../components/Table';

const defaultForm = {
  name: '', code: '', semester: '', credits: '',
  type: '', academicYear: '', faculty: ''
};
const typeOptions = ['Theory', 'Practical', 'Theory+Practical'];

export default function Subjects() {
  const [data, setData] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [subRes, ayRes, facRes] = await Promise.all([
        api.get('/subjects'),
        api.get('/academic-years'),
        api.get('/faculties'),
      ]);
      setData(subRes.data.data || []);
      setAcademicYears(ayRes.data.data || []);
      setFaculties(facRes.data.data || []);
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
      name: row.name || '',
      code: row.code || '',
      semester: row.semester || '',
      credits: row.credits || '',
      type: row.type || '',
      academicYear: row.academicYear?._id || row.academicYear || '',
      faculty: row.faculty?._id || row.faculty || '',
    });
    setEditId(row._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/subjects/${editId}`, form);
      } else {
        await api.post('/subjects', form);
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
    if (!window.confirm('Delete this subject?')) return;
    try {
      await api.delete(`/subjects/${id}`);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const columns = [
    { key: 'name', label: 'Subject Name' },
    { key: 'code', label: 'Code' },
    { key: 'semester', label: 'Semester' },
    { key: 'credits', label: 'Credits' },
    { key: 'type', label: 'Type' },
    { key: 'faculty', label: 'Faculty', render: (v) => v?.name || '—' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Subjects</h2>
          <p>Manage subject records</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><FaPlus /> Add Subject</button>
      </div>
      <div className="page-body">
        <div className="card">
          {loading ? <div className="loading">Loading...</div> : (
            <Table columns={columns} data={data} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Subject' : 'Add Subject'}>
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label>Subject Name *</label>
              <input className="form-control" required value={form.name} onChange={set('name')} placeholder="Subject name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Code *</label>
                <input className="form-control" required value={form.code} onChange={set('code')} placeholder="e.g. CS301" />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select className="form-control" value={form.type} onChange={set('type')}>
                  <option value="">Select Type</option>
                  {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Semester (1-8)</label>
                <input type="number" min="1" max="8" className="form-control" value={form.semester} onChange={set('semester')} />
              </div>
              <div className="form-group">
                <label>Credits</label>
                <input type="number" min="0" className="form-control" value={form.credits} onChange={set('credits')} />
              </div>
            </div>
            <div className="form-group">
              <label>Academic Year</label>
              <select className="form-control" value={form.academicYear} onChange={set('academicYear')}>
                <option value="">Select Academic Year</option>
                {academicYears.map((ay) => <option key={ay._id} value={ay._id}>{ay.year}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Faculty</label>
              <select className="form-control" value={form.faculty} onChange={set('faculty')}>
                <option value="">Select Faculty</option>
                {faculties.map((f) => <option key={f._id} value={f._id}>{f.name}</option>)}
              </select>
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
