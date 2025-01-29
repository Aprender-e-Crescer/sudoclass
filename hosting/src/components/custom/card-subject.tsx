import { Link } from '@tanstack/react-router';

interface CardSubjectProps {
  id: string;
  name: string;
  color: string;
  idCourse: string;
  idClass?: string;
  isClassView?: boolean; 
}

export function CardSubject({ id, name, color, idClass, idCourse, isClassView = false }: CardSubjectProps) {
  const path = isClassView || !idClass
    ? `/courses/${idCourse}/classes/`
    : `/courses/${idCourse}/classes/${idClass}/subjects/${id}/mural`;

  return (
    <Link to={path}>
      <div
        className="w-[200px] md:w-[400px] h-[200px] rounded-lg shadow-lg flex flex-col justify-between"
        style={{ backgroundColor: color }}
      >
        <div className="flex justify-between m-6">
          <div className="flex flex-col">
            <div className="text-white font-bold text-xl mr-5 mb-1">{name}</div>
          </div>
        </div>
        <div className="bg-white w-full rounded-b-lg py-6"></div>
      </div>
    </Link>
  );
}
