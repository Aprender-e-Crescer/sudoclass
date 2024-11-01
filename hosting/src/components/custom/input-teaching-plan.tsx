import { Button } from "../ui/button"


interface Props {
  contentLabel: string
  methodologyLabel: string
  resourcesLabel: string
}

export function InputTeachingPlans({
  contentLabel,
  methodologyLabel,
  resourcesLabel,
}: Props) {
  return (
    <>
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 w-full">
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-md lg:max-w-3xl">
      <form>
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-bold mb-1 sm:mb-2">
            {contentLabel}
            <span className="text-[#0C408F]">*</span>
          </label>
          <textarea
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Insira um texto..."
          />
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-bold mb-1 sm:mb-2">
            {methodologyLabel}
            <span className="text-[#0C408F]">*</span>
          </label>
          <textarea
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Insira um texto..."
          />
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-bold mb-1 sm:mb-2">
            {resourcesLabel}
            <span className="text-[#0C408F]">*</span>
          </label>
          <textarea
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Insira um texto..."
          />
        </div>

        <div className="flex justify-end">
          <Button
          
          variant = {'blueButton'}>
            Salvar</Button>
        </div>
      </form>
    </div>
  </div>
  </>
  )
}
