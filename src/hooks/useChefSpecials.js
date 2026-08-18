import { useState, useEffect } from 'react';
import { chefSpecials as specialsApi } from '../services/api';

const normalizeSpecial = (special) => ({ ...special, id: String(special.id ?? special._id ?? '') });

export default function useChefSpecials(today = false) {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const apiCall = today ? specialsApi.today : specialsApi.list;
    apiCall()
      .then(data => {
        if (!mounted) return;
        const safeData = Array.isArray(data) ? data.map(normalizeSpecial) : [];
        setSpecials(safeData);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.response?.data?.message || err?.message || 'Could not fetch chef specials');
        setLoading(false);
      });

    return () => { mounted = false; };
  }, [today]);

  return { specials, loading, error };
}
