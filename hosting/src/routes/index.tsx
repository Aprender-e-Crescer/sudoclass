import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { FaCheck } from 'react-icons/fa';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className="flex gap-2.5">
        <Button variant="blueButton" size="large">
          Confirmar
        </Button>

        <Button variant="lightTextBlack" size="large">
          Cancelar
        </Button>
      </div>

      <div className="mt-2.5">
        <Button variant="copyButton" icon={<FaCheck />} size="fixed">
          Copiar
        </Button>
      </div>

      <div className="mt-2.5">
        <Button variant="blueButton" size="medium">
          Escolher Foto
        </Button>

        <Button variant="lightTextRed" size="medium">
          Apargar Foto
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
        <Button variant="ghostBlack" icon={<FaCheck />} iconPosition='left' size="small">
          Enviar
        </Button>

        <Button variant="ghostBlack" icon={<FaCheck />} iconPosition='left' notificationCount={10} size="small">
          Respostas
        </Button>
      </div>
    </div>
  );
}

export default Index;
