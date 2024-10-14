interface Props {
  Note: number
  MaxGrade: number
}

export default function NoteValue({ Note, MaxGrade }: Props) {
  return (
    <div className="flex justify-center items-center">
      {Note}/{MaxGrade}
    </div>
  )
}
