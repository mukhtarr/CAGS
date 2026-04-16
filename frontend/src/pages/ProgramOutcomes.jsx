import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import api from '../api/axios';
import Modal from '../components/Modal';
import Table from '../components/Table';

const defaultForm = { code: '', description: '', department: 'Computer Engineering' };

const standardPOs = [
  { code: 'PO1', description: 'Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.' },
  { code: 'PO2', description: 'Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.' },
  { code: 'PO3', description: 'Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety.' },
  { code: 'PO4', description: 'Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.' },
  { code: 'PO5', description: 'Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities.' },
  { code: 'PO6', description: 'The engineer and society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
  { code: 'PO7', description: 'Environment and sustainability: Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
  { code: 'PO8', description: 'Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.' },
  { code: 'PO9', description: 'Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
  { code: 'PO10', description: 'Communication: Communicate effectively on complex engineering activities with the engineering community and with society at large.' },
  { code: 'PO11', description: 'Project management and finance: Demonstrate knowledge and understanding of the engineering and management principles and apply these to one\'s own work, as a member and leader in a team.' },
  { code: 'PO12', description: 'Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' },
];

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'description', label: 'Description', render: (v) => <span title={v}>{v?.length > 80 ? v.slice(0, 80) + '…' : v}</span> },
  { key: 'department', label: 'Department' },
];

export default function ProgramOutcomes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get('/program-outcomes');
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
    setForm({ code: row.code || '', description: row.description || '', department: row.department || 'Computer Engineering' });
    setEditId(row._id);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/program-outcomes/${editId}`, form);
      } else {
        await api.post('/program-outcomes', form);
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
    if (!window.confirm('Delete this program outcome?')) return;
    try {
      await api.delete(`/program-outcomes/${id}`);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleBulkAdd = async () => {
    if (!window.confirm('This will add all 12 standard POs (PO1-PO12). Continue?')) return;
    setBulkLoading(true);
    try {
      for (const po of standardPOs) {
        await api.post('/program-outcomes', { ...po, department: 'Computer Engineering' });
      }
      fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setBulkLoading(false);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Program Outcomes</h2>
          <p>Manage Program Outcomes (POs)</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={handleBulkAdd} disabled={bulkLoading}>
            {bulkLoading ? 'Adding...' : 'Add Standard POs (PO1-PO12)'}
          </button>
          <button className="btn btn-primary" onClick={openAdd}><FaPlus /> Add PO</button>
        </div>
      </div>
      <div className="page-body">
        <div className="card">
          {loading ? <div className="loading">Loading...</div> : (
            <Table columns={columns} data={data} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Program Outcome' : 'Add Program Outcome'}>
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label>Code *</label>
                <input className="form-control" required value={form.code} onChange={set('code')} placeholder="e.g. PO1" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input className="form-control" value={form.department} onChange={set('department')} />
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea className="form-control" required rows="4" value={form.description} onChange={set('description')} placeholder="Program outcome description..." />
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
