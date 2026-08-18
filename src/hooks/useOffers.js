import { useState, useEffect } from 'react';
import { offers as offersApi } from '../services/api';

const normalizeOffer = (offer) => ({ ...offer, id: String(offer.id ?? offer._id ?? '') });

export default function useOffers(active = false) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const apiCall = active ? offersApi.active : offersApi.list;
    apiCall()
      .then(data => {
        if (!mounted) return;
        const safeData = Array.isArray(data) ? data.map(normalizeOffer) : [];
        setOffers(safeData);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.response?.data?.message || err?.message || 'Could not fetch offers');
        setLoading(false);
      });

    return () => { mounted = false; };
  }, [active]);

  return { offers, loading, error };
}
