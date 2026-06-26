export type Column<T> = {
  header: string
  accessor?: keyof T
  render?: (row: T) => React.ReactNode
}

type Props<T> = {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyText?: string
  onRowClick?: (row: T) => void
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyText = 'No Records',
  onRowClick,
}: Props<T>) {
  return (
    <table className='w-full table-fixed text-sm'>
      <thead>
        <tr className='text-left border-b text-gray-500 border-teal-600'>
          {columns.map((col, i) => (
            <th key={i} className='py-3 px-2'>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className='text-center py-6'>
              Loading...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className='text-center py-6 text-gray-400'>
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-teal-600 hover:bg-gray-50 transition ${onRowClick ? 'cursor-pointer' : ''
                }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className='py-3 px-2'>
                  {col.render
                    ? col.render(row)
                    : String(row[col.accessor as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}