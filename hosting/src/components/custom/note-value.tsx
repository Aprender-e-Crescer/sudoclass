interface Props {
  note: number
  maxGrade: number
}

export default function NoteValue({ note, maxGrade }: Props) {
  return (
    <div className="flex justify-center items-center">
      {note}/{maxGrade}
    </div>
  )
}
