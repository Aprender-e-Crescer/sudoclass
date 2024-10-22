
import FormHeader from '@/components/ui/formHeader';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { RiEditLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { FaCheck } from 'react-icons/fa';
import { CoppyButton } from '@/components/custom/coppy-button'; 

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <FormHeader 
          imagemUrl="https://via.placeholder.com/60"  nome="Aluno tal" 
        />
        <Button icon={<RiEditLine />} size="small">
          Editar
        </Button>
      </div>
    </div>
  );
}

      <div className="flex gap-2.5">
        <Button variant="blueButton" size="large">
          Confirmar
        </Button>

        <Button variant="lightTextBlack" size="large">
          Cancelar
        </Button>
      </div>
      
      <div className="mt-2.5">
        <Button variant="blueButton" size="medium">
          Escolher Foto
        </Button>

        <Button variant="lightTextRed" size="medium">
          Apagar Foto
        </Button>
      </div>

      <div className="mt-2.5">
        <Button variant="ghostWhite" icon={<FaCheck />} size="small">
          Editar
        </Button>

        <Button variant="blueButton" icon={<FaCheck />} size="small">
          Editar
        </Button>
      </div>

      <div className="mt-3">
        <Button variant="ghostBlack" icon={<FaCheck />} size="small">
          Enviar
        </Button>

        <Button variant="ghostBlack" icon={<FaCheck />} iconPosition="left" notificationCount={10} size="small">
          Respostas
        </Button>
      </div>

      <div className="mt-3">
        <CoppyButton>
          Copiar Senha
        </CoppyButton>
      </div>
    </div>
  )
}
export default Index;
