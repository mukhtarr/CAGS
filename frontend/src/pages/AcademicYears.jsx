import { useEffect, useState } from 'react';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import api from '../api/axios';
import Modal from '../components/Modal';
import Table from '../components/Table';

const defaultForm = { year: '', startDate: '', endDate: '', isActive: false };

const columns = [
  { key: 'year', label: 'Year' },
  { key: 'startDate', label: 'Start Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
  { key: 'endDate', label: 'End Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
  {
    key: 'isActive', label: 'Status',
    render: (v) => v ? <span className="badge badge-success">Active</span> : <span className="badge badge-secondary">Inactive</span>
  },
];

export default function AcademicYears() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get('/academic-years');
      setData(res.data.data || []);
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
      year: row.year || '',
      startDate: row.startDate ? row.startDate.split('T')[0] : '',
      endDate: row.endDate ? row.endDate.split('T')[0] : '',
      isActive: row.isActive || false,
    });
    setEditId(row._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/academic-years/${editId}`, form);
      } else {
        await api.post('/academic-years', form);
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
    if (!window.confirm('Delete this academic year?')) return;
    try {
      await api.delete(`/academic-years/${id}`);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Academic Years</h2>
          <p>Manage academic year records</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <FaPlus /> Add Academic Year
        </button>
      </div>
      <div className="page-body">
        <div className="card">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Table columns={columns} data={data} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Academic Year' : 'Add Academic Year'}>
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label>Year *</label>
              <input className="form-control" placeholder="e.g. 2024-25" required value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" className="form-control" value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="date" className="form-control" value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
              </div>
            </div>
            <div className="form-check">
              <input type="checkbox" id="isActive" checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <label htmlFor="isActive">Mark as Active</label>
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
