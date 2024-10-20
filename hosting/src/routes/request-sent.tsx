import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/request-sent')({
  component: RequestSent,
})

export default function RequestSent() {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full md:h-[600px] bg-[#1A73E8] shadow-lg rounded-[27px] mx-4 lg:mx-0">
      <div className="flex justify-center">
        <img
          src="https://i.imgur.com/H0PBQy2.png"
          alt="foi n"
          className="w-[500px] h-auto lg:w-[577px] lg:rounded-r-[27px]"
        />
      </div>
      <div className="flex flex-col justify-center items-center border w-full lg:w-[697px] bg-[#FFFFFF] lg:rounded-r-[27px] p-4">
        <h1 className="text-[40px] text-[#0C408F] font-bold">
          Solicitação Enviada!
        </h1>
        <p className="text-[26px] text-[#1A73E8] font-semibold text-center mt-4 px-4">
          Sua solicitação foi enviada com sucesso. Espere o retorno da
          coordenação.
        </p>
        <Button
          className="w-full max-w-[400px] h-[67px] mt-[20px] flex justify-center px-4"
          variant="blueButton"
          size="large"
        >
          Retornar ao menu
        </Button>
      </div>
    </div>
  )
}
