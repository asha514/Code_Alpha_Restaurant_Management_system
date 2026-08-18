import { useState, useEffect } from 'react';
import { tables as tablesApi } from '../services/api';

const normalizeTable = (table) => ({ ...table, id: String(table.id ?? table._id ?? '') });

export default function useTables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    tablesApi.list().then(data => {
      if (!mounted) return;
      const safeData = Array.isArray(data) ? data.map(normalizeTable) : [];
      setTables(safeData);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { tables, loading };
}
