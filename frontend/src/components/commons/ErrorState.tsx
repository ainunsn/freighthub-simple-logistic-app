type Props = {
  title?: string
  message?: string
  onRetry?: () => void
  fullPage?: boolean
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again',
  fullPage = false,
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 ${fullPage ? 'min-h-[60vh]' : ''
        }`}
    >
      <div className='text-5xl'>⚠️</div>

      <div className='text-center'>
        <h2 className='text-lg font-semibold text-red-700'>
          {title}
        </h2>

        <p className='mt-1 text-sm text-red-600'>
          {message}
        </p>
      </div>
    </div>
  )
}