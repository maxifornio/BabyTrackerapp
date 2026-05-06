/**
 * Parsea cualquier formato de fecha a objeto Date en hora LOCAL (no UTC).
 * 
 * Problema: new Date("2024-01-15") interpreta como UTC 00:00
 * En Uruguay (UTC-3) eso es las 21:00 del día anterior → bug de filtrado.
 * 
 * Formatos soportados:
 *   - "2024-01-15"           (solo fecha, del input type="date")
 *   - "2024-01-15 14:30:00"  (fecha + hora con espacio, formato BD)
 *   - "2024-01-15T14:30:00"  (formato ISO)
 *   - objeto Date
 *   - timestamp número
 */
export const parsearFecha = (fecha) => {
  if (!fecha) return null;
  if (fecha instanceof Date) return fecha;
  if (typeof fecha === 'number') return new Date(fecha);

  if (typeof fecha === 'string') {
    const normalizada = fecha.replace(' ', 'T');

    // Solo fecha sin hora → forzar hora local 00:00:00 para evitar problema UTC
    if (/^\d{4}-\d{2}-\d{2}$/.test(normalizada)) {
      const [anio, mes, dia] = normalizada.split('-').map(Number);
      return new Date(anio, mes - 1, dia, 0, 0, 0); // mes es 0-indexed
    }

    // Tiene hora → parsear normalmente
    return new Date(normalizada);
  }

  return new Date(fecha);
};
