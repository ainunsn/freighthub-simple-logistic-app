type Props = {
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  onConfirm: () => void
  onClose: () => void
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='text-lg font-semibold'>
          {title}
        </h2>

        {description && (
          <p className='mt-2 text-sm text-gray-600'>
            {description}
          </p>
        )}

        <div className='mt-6 flex justify-end gap-2'>
          <button
            type='button'
            onClick={onClose}
            disabled={loading}
            className='rounded border px-4 py-2'
          >
            {cancelText}
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={loading}
            className='rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50'
          >
            {loading ? 'Cancelling...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}