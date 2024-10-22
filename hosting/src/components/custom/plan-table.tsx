
import { cn } from '@/lib/utils'
import circlecheckbig from '@/assets/circle-check-big.png'
import circlex from '@/assets/circle-x.png'

const inconsvariants: Record<'undefined' | 'checked' | 'nochecked', string | null> = {
  undefined: null,
  checked: circlecheckbig,  
  nochecked: circlex, 
};
interface Props{
  curso?: string;
  turma?: string;
  turno?: string;
  altura?: string;
  variant?: 'undefined' | 'checked' | 'nochecked' 
};
 
export function PlanTable({ curso, turma, turno, altura= 'h-24', variant }: Props) {
      
  const Icon = inconsvariants[variant || 'undefined'];

  return (
    <div className="flex">
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-64 ${altura}`}>
        {curso}
      </div>
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-64 ${altura}`}>
        {turma}
      </div>
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-40 ${altura}`}>
        {turno}
      </div>
      <div className={`flex items-center justify-center border border-[#DBDBDB] w-40 ${altura}`}>
      {Icon && <img src={Icon} alt="" className="flex items-center justify-center w-8 h-8" />}
      </div>
      </div>
    
  );
}