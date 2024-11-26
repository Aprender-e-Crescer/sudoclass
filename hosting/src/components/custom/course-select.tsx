import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonitorPlay } from 'lucide-react';

interface Course {
  id_curso: string;
  nome_curso: string;
}

export default function CourseSelect() {
  const [courses, setCourses] = useState<Course[]>([]); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/course'); 
        if (!response.ok) {
          throw new Error('Erro ao carregar os cursos');
        }
        const data: Course[] = await response.json(); 
        setCourses(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses(); 
  }, []); 

  if (loading) {
    return <div>Carregando cursos...</div>; 
  }

  if (error) {
    return <div>Erro: {error}</div>;  
  }

  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MonitorPlay className="h-4 w-4" />
          <SelectValue placeholder="Selecione o curso" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {courses.map((course) => (
            <SelectItem key={course.id_curso} value={course.id_curso}> 
              <div className="flex items-center gap-2">
                <MonitorPlay className="h-4 w-4" />
                <span>{course.nome_curso}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
