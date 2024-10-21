
import { cn } from '@/lib/utils'
import circlecheckbig from '@/assets/circle-check-big.png'
import circlex from '@/assets/circle-x.png'







const inconsvariants: Record<'undefined' | 'checked' | 'nochecked', string | null> = {
  undefined: null,
  checked: circlecheckbig,  
  nochecked: circlex, 
};


interface Props{
  Curso?: string;
  Turma?: string;
  Turno?: string;
  Altura?: string;
  variant?: 'undefined' | 'checked' | 'nochecked' 
};
 
export function PlanTable({ Curso, Turma, Turno, Altura= 'h-24', variant }: Props) {
      
  const Icon = inconsvariants[variant || 'undefined'];

  return (
    <div className="flex">
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-64 ${Altura}`}>
        {Curso}
      </div>
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-64 ${Altura}`}>
        {Turma}
      </div>
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-40 ${Altura}`}>
        {Turno}
      </div>
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-40 ${Altura}`}>
      {Icon && <img src={Icon} alt="" className="flex items-center justify-center w-8 h-8" />}
      </div>
      </div>
    
  );
}


