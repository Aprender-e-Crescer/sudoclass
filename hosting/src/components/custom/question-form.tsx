interface Props {
  question: string
  options: string[]
  radioId: string
}

export function QuestionForm({ question, options, radioId }: Props) {
  return (
    <div className="flex flex-col bg-white">
      <div className="bg-white p-6 border-2 rounded-xl shadow-md w-full max-w-[620px] border-[#0C408F]">
        <p className="text-xl font-semibold mb-4 border-b border-blue-300 pb-4">{question}</p>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input type="radio" name={radioId} className="form-radio h-4 w-4 text-blue-600" />
              <span className="ml-2">{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
