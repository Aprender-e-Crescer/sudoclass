import { FaBook } from "react-icons/fa";


interface LessonPlanningProps {
  title: string;
  question: string;
  date: string;
}

function LessonPlanning({ title, question, date }: LessonPlanningProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center py-2 px-6">
        <div className="flex items-center space-x-3">
          <FaBook className="h-5 w-5 text-gray-800" />
          <span className="font-medium text-lg text-gray-900">{title}</span>
        </div>

        <div className="text-base font-semibold text-gray-800">
          {question}
        </div>

        <div className="text-sm font-semibold text-gray-600">{date}</div>
      </div>
    </div>
  );
}

export default LessonPlanning;
