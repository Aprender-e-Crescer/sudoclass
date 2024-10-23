interface Props {
  question: string
  trueText: string
  falseText: string
  radioId: string
}

export function QuestionForm({ question, trueText, falseText, radioId }: Props) {
  return (
    <div className="flex flex-col justify-center items-center bg-white p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[620px] border  border-blue-300 ">
        <p className="text-xl font-semibold mb-4 border-b border-blue-300 pb-4">{question}</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="radio" name={radioId} className="form-radio h-4 w-4 text-blue-600" />
            <span className="ml-2">{trueText}</span>
          </div>
          <div className="flex items-center">
            <input type="radio" name={radioId} className="form-radio h-4 w-4 text-blue-600" />
            <span className="ml-2">{falseText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
