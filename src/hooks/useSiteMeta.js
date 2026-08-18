import { useState, useEffect } from 'react';
import api from '../services/api';

let cache = null;
export default function useSiteMeta() {
  const [meta, setMeta] = useState(cache || {});
  const [loading, setLoading] = useState(!cache);
  useEffect(() => {
    if (cache) return;
    let mounted = true;
    api.get('/meta/site').then(r => r.data).then(data => {
      if (!mounted) return;
      const safeData = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
      cache = safeData;
      setMeta(safeData);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);
  return { meta, loading };
}
