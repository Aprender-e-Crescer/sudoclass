import FormHeader from '@/components/ui/formHeader';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { RiEditLine } from "react-icons/ri";


export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <FormHeader 
          imagemUrl="https://via.placeholder.com/60"
          nome="Aluno tal" 
        />
        <Button icon={<RiEditLine />} size="small">
          Editar
        </Button>
      </div>
    </div>
  );
}

export default Index;
