import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Table({ columns, data, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <p>No records found. Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row._id || idx}>
              <td>{idx + 1}</td>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
              <td>
                <div className="actions-cell">
                  <button className="btn btn-secondary btn-sm btn-icon" onClick={() => onEdit(row)} title="Edit">
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger btn-sm btn-icon" onClick={() => onDelete(row._id)} title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
