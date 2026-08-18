import { useState, useEffect, useCallback } from 'react';
import { reservations as reservationsApi } from '../services/api';

const normalizeReservation = (reservation) => ({
  ...reservation,
  id: String(reservation.id ?? reservation._id ?? ''),
  status: reservation.status || 'pending',
  table: reservation.table || null,
  user: reservation.user || null,
});

export default function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await reservationsApi.list();
      const safeData = Array.isArray(data) ? data.map(normalizeReservation) : [];
      setReservations(safeData);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load reservations right now.');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!mounted) return;
      await refresh();
    };
    run();
    return () => { mounted = false; };
  }, [refresh]);

  return { reservations, loading, error, refresh };
}
