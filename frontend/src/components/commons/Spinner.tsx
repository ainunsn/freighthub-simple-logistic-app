type Props = {
  size?: number
}

export default function Spinner({ size = 40 }: Props) {
  return (
    <div
      className='animate-spin rounded-full border-2 border-gray-300 border-t-teal-600'
      style={{
        width: size,
        height: size,
      }}
    />
  )
}