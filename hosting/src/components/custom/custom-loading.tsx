import { CircularProgress } from '@mui/material'

interface props{
  message: string
  size: number | 100
}


export function CustomLoading({ message, size }: props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="mb-4 text-lg font-semibold">{message}</h1>
      <CircularProgress color="info" size={size} />
    </div>
  );
}
