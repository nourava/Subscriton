import React from 'react';
import './Table.css';

export const Table = ({ columns = [], data = [], emptyMessage = "No records found" }) => {
  return (
    <div className="bl-table-container">
      <table className="bl-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={{ textAlign: col.align || 'left', width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="bl-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={row.id || rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={{ textAlign: col.align || 'left' }}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
