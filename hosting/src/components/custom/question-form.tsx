export function QuestionForm({ question }: { question: string }) {
  return (
<div className="flex flex-col min-h-screen bg-gray-100 p-4">
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-blue-300">
    <p className="text-xl font-semibold mb-4 border-b border-blue-300 pb-4 w-full">
      {question}
    </p>
    <div className="flex flex-col space-y-4 pb-3">
      <div className="flex items-center">
        <input type="radio" name="question1" className="form-radio h-4 w-4 text-blue-600" />
        <span className="ml-2">Verdadeiro</span>
      </div>
      <div className="flex items-center mb-2"> 
        <input type="radio" name="question1" className="form-radio h-4 w-4 text-blue-600" />
        <span className="ml-2">Falso</span>
      </div>
    </div>
  </div>
</div>
  );
}