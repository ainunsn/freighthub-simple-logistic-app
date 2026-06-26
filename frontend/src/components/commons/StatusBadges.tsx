type Props = {
  status: string
}

export default function StatusBadge({
  status,
}: Props) {
  const styles: Record<string, string> = {
    PENDING:
      'bg-yellow-100 text-yellow-800',

    IN_TRANSIT:
      'bg-blue-100 text-blue-800',

    DELIVERED:
      'bg-green-100 text-green-800',

    CANCELLED:
      'bg-red-100 text-red-800',
  }

  const labels: Record<string, string> = {
    PENDING: 'Pending',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status] ??
        'bg-gray-100 text-gray-700'
        }`}
    >
      {labels[status] ?? status}
    </span>
  )
}