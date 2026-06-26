type Props = {
  prevCursor?: string | null
  nextCursor?: string | null
  onChange: (cursor: string) => void
  className?: string
}

export default function CursorPagination({
  prevCursor,
  nextCursor,
  onChange,
  className = '',
}: Props) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        disabled={!prevCursor}
        onClick={() => prevCursor && onChange(prevCursor)}
        className='px-3 py-1 border rounded disabled:opacity-50 border-teal-600'
      >
        Prev
      </button>

      <button
        disabled={!nextCursor}
        onClick={() => nextCursor && onChange(nextCursor)}
        className='px-3 py-1 border rounded disabled:opacity-50 border-teal-600'
      >
        Next
      </button>
    </div>
  )
}