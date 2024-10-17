import { createFileRoute } from '@tanstack/react-router'
import { HeaderNotes } from '@/components/custom/header-notes'

export const Route = createFileRoute('/notes-screen')({
  component: () =>

<>
<div className="flex">
    <HeaderNotes
    subtitle='sem data de entrega'
    title='Atividade 1'
    totalNote='De 100'/>
    <HeaderNotes
    subtitle='Para cada aluno'
    title='Média Geral'
    totalNote='De 100'/>
</div>
<div className="flex h-screen">    
        <tbody>
          <tr>
            <td className="border border-[#DBDBDB] px-20 py-6">Ronald Richards</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
          </tr>
          <tr>
            <td className="border border-[#DBDBDB] px-20 py-6">Marvin McKinney</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
          </tr>
          <tr>
            <td className="border border-[#DBDBDB] px-20 py-6">Jerome Bell</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
          </tr>
          <tr>
            <td className="border border-[#DBDBDB] px-20 py-2">Kathryn Murphy</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
          </tr>
          <tr>
            <td className="border border-[#DBDBDB] px-20 py-6">Jacob Jones</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
          </tr>
          <tr>
            <td className="border border-[#DBDBDB] px-20 py-6">Kristin Watson</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
            <td className="border border-[#DBDBDB] px-20 py-6">__/100</td>
          </tr>
        </tbody>
    </div>
    </>    
})