import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import ViewModal from '../components/ViewModal';
import { getByBatch } from '../services/attendance.service';

const COLS = [
  { key: 'id', label: 'ID', className: 'w-16' },
  { key: 'studentName', label: 'Student' },
  { key: 'rollNumber', label: 'Roll Number' },
  { key: 'attendanceDate', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'markedBy', label: 'Marked By' },
  { key: 'remarks', label: 'Remarks' },
];

export default function Attendance() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [batchId, setBatchId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewing, setViewing] = useState(null);

  const load = async () => {
    if (!batchId) return;
    setLoading(true); setError('');
    try {
      const res = await getByBatch(batchId, date);
      setItems(res.data || []);
    } catch (e) { setError(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [batchId, date]);

  const viewFields = [
    { key: 'id', label: 'ID' }, { key: 'studentName', label: 'Student' },
    { key: 'rollNumber', label: 'Roll Number' }, { key: 'attendanceDate', label: 'Date' },
    { key: 'status', label: 'Status' }, { key: 'markedBy', label: 'Marked By' },
    { key: 'remarks', label: 'Remarks' },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Attendance</h1>
      <div className="flex gap-2">
        <input type="number" placeholder="Batch ID" value={batchId} onChange={(e) => setBatchId(e.target.value)} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm" />
        <button onClick={load} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Load</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <DataTable columns={COLS} data={items} loading={loading} error={error} />
      <ViewModal open={!!viewing} title="Attendance Details" record={viewing} fields={viewFields} onClose={() => setViewing(null)} />
    </div>
  );
}
