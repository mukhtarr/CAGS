import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../api/axios';
import Modal from '../components/Modal';
import Table from '../components/Table';

const defaultForm = {
  name: '', rollNo: '', enrollmentNo: '', email: '', phone: '',
  class: '', academicYear: '', gender: '', dateOfBirth: ''
};
const genderOptions = ['Male', 'Female', 'Other'];

export default function Students() {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [stdRes, clsRes, ayRes] = await Promise.all([
        api.get('/students'),
        api.get('/classes'),
        api.get('/academic-years'),
      ]);
      setData(stdRes.data.data || []);
      setClasses(clsRes.data.data || []);
      setAcademicYears(ayRes.data.data || []);
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
      rollNo: row.rollNo || '',
      enrollmentNo: row.enrollmentNo || '',
      email: row.email || '',
      phone: row.phone || '',
      class: row.class?._id || row.class || '',
      academicYear: row.academicYear?._id || row.academicYear || '',
      gender: row.gender || '',
      dateOfBirth: row.dateOfBirth ? row.dateOfBirth.split('T')[0] : '',
    });
    setEditId(row._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/students/${editId}`, form);
      } else {
        await api.post('/students', form);
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
    if (!window.confirm('Delete this student?')) return;
    try {
      await api.delete(`/students/${id}`);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const columns = [
    { key: 'rollNo', label: 'Roll No' },
    { key: 'name', label: 'Name' },
    { key: 'enrollmentNo', label: 'Enrollment No' },
    { key: 'email', label: 'Email' },
    { key: 'class', label: 'Class', render: (v) => v?.name || '—' },
    { key: 'gender', label: 'Gender' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Students</h2>
          <p>Manage student records</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><FaPlus /> Add Student</button>
      </div>
      <div className="page-body">
        <div className="card">
          {loading ? <div className="loading">Loading...</div> : (
            <Table columns={columns} data={data} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Student' : 'Add Student'}>
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label>Full Name *</label>
              <input className="form-control" required value={form.name} onChange={set('name')} placeholder="Student full name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Roll No *</label>
                <input className="form-control" required value={form.rollNo} onChange={set('rollNo')} placeholder="Roll number" />
              </div>
              <div className="form-group">
                <label>Enrollment No</label>
                <input className="form-control" value={form.enrollmentNo} onChange={set('enrollmentNo')} placeholder="Enrollment number" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={form.email} onChange={set('email')} placeholder="Email address" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input className="form-control" value={form.phone} onChange={set('phone')} placeholder="Phone number" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Gender</label>
                <select className="form-control" value={form.gender} onChange={set('gender')}>
                  <option value="">Select Gender</option>
                  {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" className="form-control" value={form.dateOfBirth} onChange={set('dateOfBirth')} />
              </div>
            </div>
            <div className="form-group">
              <label>Class *</label>
              <select className="form-control" required value={form.class} onChange={set('class')}>
                <option value="">Select Class</option>
                {classes.map((c) => <option key={c._id} value={c._id}>{c.name} {c.division ? `- ${c.division}` : ''}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Academic Year *</label>
              <select className="form-control" required value={form.academicYear} onChange={set('academicYear')}>
                <option value="">Select Academic Year</option>
                {academicYears.map((ay) => <option key={ay._id} value={ay._id}>{ay.year}</option>)}
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
