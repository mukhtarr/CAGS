import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../api/axios';
import Modal from '../components/Modal';
import Table from '../components/Table';

const defaultForm = { name: '', division: '', year: '', academicYear: '', classTeacher: '' };
const yearOptions = ['FY', 'SY', 'TY', 'Final Year'];

export default function Classes() {
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
      const [classRes, ayRes, facRes] = await Promise.all([
        api.get('/classes'),
        api.get('/academic-years'),
        api.get('/faculties'),
      ]);
      setData(classRes.data.data || []);
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
      division: row.division || '',
      year: row.year || '',
      academicYear: row.academicYear?._id || row.academicYear || '',
      classTeacher: row.classTeacher?._id || row.classTeacher || '',
    });
    setEditId(row._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/classes/${editId}`, form);
      } else {
        await api.post('/classes', form);
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
    if (!window.confirm('Delete this class?')) return;
    try {
      await api.delete(`/classes/${id}`);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const columns = [
    { key: 'name', label: 'Class Name' },
    { key: 'division', label: 'Division' },
    { key: 'year', label: 'Year' },
    { key: 'academicYear', label: 'Academic Year', render: (v) => v?.year || v || '—' },
    { key: 'classTeacher', label: 'Class Teacher', render: (v) => v?.name || v || '—' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Classes</h2>
          <p>Manage class records</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><FaPlus /> Add Class</button>
      </div>
      <div className="page-body">
        <div className="card">
          {loading ? <div className="loading">Loading...</div> : (
            <Table columns={columns} data={data} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Class' : 'Add Class'}>
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label>Class Name *</label>
                <input className="form-control" required value={form.name} onChange={set('name')} placeholder="e.g. SE-A" />
              </div>
              <div className="form-group">
                <label>Division</label>
                <input className="form-control" value={form.division} onChange={set('division')} placeholder="e.g. A" />
              </div>
            </div>
            <div className="form-group">
              <label>Year *</label>
              <select className="form-control" required value={form.year} onChange={set('year')}>
                <option value="">Select Year</option>
                {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Academic Year *</label>
              <select className="form-control" required value={form.academicYear} onChange={set('academicYear')}>
                <option value="">Select Academic Year</option>
                {academicYears.map((ay) => <option key={ay._id} value={ay._id}>{ay.year}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Class Teacher</label>
              <select className="form-control" value={form.classTeacher} onChange={set('classTeacher')}>
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
