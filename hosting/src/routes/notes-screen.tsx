import { createFileRoute } from '@tanstack/react-router'
import { HeaderNotes } from '@/components/custom/header-notes'
import { NotesTable } from '@/components/custom/notes-table'
import { Avatar }  from '@/components/ui/avatar';
import Avatarimg from '@/assets/avatar.png';


export const Route = createFileRoute('/notes-screen')({
  component: () => {
    return (
    <>
      <div>
        <Avatar/>
      </div>

      <div className="flex flex-col md:flex-row items-start">
        <div className="border border-[#DBDBDB] w-72 h-24 flex flex-col items-center">
        </div>
          <HeaderNotes
            subtitle="sem data de entrega"
            title="Atividade 1"
            totalNote="De 100"
          />
          <HeaderNotes
            subtitle="Para cada aluno"
            title="Média Geral"
            totalNote="De 100"
          />
          <div className="border border-[#DBDBDB] w-52 h-24 flex flex-col items-center">
          </div>
          <div className="border border-[#DBDBDB] w-52 h-24 flex flex-col items-center">
          </div>

        </div>

        <div className="flex flex-col md:flex-col font-medium">
          <NotesTable 
          />
        <div className='flex items-center'>  
          <NotesTable
          name='Média Geral'
          />
        </div>
          <NotesTable
            name="Ronald Richards"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Marvin McKinney"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Jerome Bell"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Kathryn Murphy"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Jacob Jones"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Kristin Watson"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Kristin Watson"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Kristin Watson"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
          <NotesTable
            name="Kristin Watson"
            overallRating="_/100"
            rating="_/100"
            avatar={Avatarimg}
          />
        </div>
    </>
    );
  }
});
