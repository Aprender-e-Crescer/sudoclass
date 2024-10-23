import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import image from '@/assets/image-request-sent.png';

export const Route = createFileRoute('/request-sent')({
  component: RequestSent,
});

export default function RequestSent() {
  return (
    <div className='flex items-center lg:m-5 m-2 flex-col lg:flex-row'>
      {/* Container da Imagem */}
      <div className="flex justify-center h-[250px] w-full lg:h-full lg:w-1/2 border bg-[#1A73E8] rounded-l-[27px] shadow-lg">
        <img
          src={image}
          alt="imagem"
          className="w-[285px] h-[285px] lg:w-[641px] lg:h-[664px]"
        />
      </div>

      {/* Container do Texto */}
      <div className="flex items-center flex-col lg:h-[664px] w-full lg:w-[1000px] border font-bold rounded-r-[27px] pb-5 shadow-lg">
        <h1 className="text-[#0C408F] lg:text-[50px] text-[40px] p-4 lg:p-20">
          Solicitação Enviada!
        </h1>

        <p className="text-[#1A73E8] lg:text-[20px] text-[17px] p-4 lg:p-20">
          Sua solicitação foi enviada com sucesso. Espere o retorno da coordenação.
        </p>

        <Button
          className="flex justify-center w-full max-w-[500px]"
          variant="blueButton"
          size='large'
        >
          Retornar ao menu
        </Button>
      </div>
    </div>
  );
}
