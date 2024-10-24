import { createFileRoute } from '@tanstack/react-router';
import { HeaderNotes } from '@/components/custom/header-notes';
import { NotesTable } from '@/components/custom/notes-table';
import { Avatar } from '@/components/ui/avatar';
import Avatarimg from '@/assets/avatar.png';

export const Route = createFileRoute('/notes-screen')({
  component: () => {
    return (
      <>
        <div className="flex-col md:hidden">
          <div>
            <Avatar />
          </div>
          <div className="flex h-full w-full">
            <div className="flex flex-col">
              <HeaderNotes />
              <HeaderNotes subtitle="sem data de entrega" title="Atividade 1" />
              <HeaderNotes subtitle="Para cada aluno" title="Média Geral" />
            </div>
            <div className="flex">
                <NotesTable name="Ronald Richards" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
                <NotesTable name="Marvin McKinney" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
                <NotesTable name="Jerome Bell" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
                <NotesTable name="Kathryn Murphy" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
                <NotesTable name="Jacob Jones" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
                <NotesTable name="Kristin Watson" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col">
  <div>
    <Avatar />
  </div>

  <div className="flex w-full">
    <div className="border border-[#DBDBDB] w-72"></div>
    <HeaderNotes subtitle="sem data de entrega" title="Atividade 1" />
    <HeaderNotes subtitle="Para cada aluno" title="Média Geral" />
  </div>

  <div className="flex flex-col font-medium">
    <div className="flex flex-col">
      <NotesTable name="Ronald Richards" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
      <NotesTable name="Marvin McKinney" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
      <NotesTable name="Jerome Bell" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
      <NotesTable name="Kathryn Murphy" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
      <NotesTable name="Jacob Jones" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
      <NotesTable name="Kristin Watson" overallRating="_/100" rating="_/100" avatar={Avatarimg} />
    </div>
  </div>
</div>
</>
    );
    },
});
