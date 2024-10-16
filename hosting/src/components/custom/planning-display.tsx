import LessonPlanning from "@/components/custom/lesson-planning";

function PlanningDisplay() {
  return (
    <div className="app-container">
      <LessonPlanning 
        title="Algoritmo nº6" 
        question="O que é If e Else?" 
        date="08 / 09 / 2025" 
      />
    </div>
  );
}

export default PlanningDisplay;
