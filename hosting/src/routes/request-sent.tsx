import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/request-sent')({
  component: RequestSent,
});

export default function RequestSent() {
  return (
    <div className='flex justify-center'>
    <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full md:h-[600px] bg-[#1A73E8] shadow-lg rounded-[27px]">
      <div className="flex justify-center items-center flex-grow">
        <img
          src="https://i.imgur.com/H0PBQy2.png"
          alt="imagem"
          className="w-[500px] h-auto lg:w-[577px] lg:rounded-r-[27px] md:h-[500px]"
        />
      </div>
      <div className="flex-col text-center border w-full lg:w-[697px] bg-[#FFFFFF] lg:rounded-r-[27px]">
        <h1 className="text-[40px] text-[#0C408F] font-bold mt-[100px]">
          Solicitação Enviada!
        </h1>
        <p className="text-[26px] text-[#1A73E8] font-semibold p-10 mt-[90px]">
          Sua solicitação foi enviada com sucesso. Espere o retorno da
          coordenação.
        </p>
        <Button
          className="w-full max-w-[400px] h-[67px] mt-[20px]"
          variant="blueButton"
          size="large"
        >
          Retornar ao menu
        </Button>
      </div>
    </div>
    </div>
  );
}
