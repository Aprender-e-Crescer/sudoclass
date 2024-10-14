interface CardTitleFormProps {
  title: string;
  sentBy: string;
}

export function CardTitleForm({ title, sentBy }: CardTitleFormProps) {
  return (
    <div className="bg-blue-900 rounded-lg pt-2.5 pb-0.5 pl-0.5 pr-0.5 w-[330px] sm:w-[620px] ">
      <div className="bg-white rounded-t-lg p-1 h-12 mb-0.5">
        <h1 className="text-2xl font-bold text-left pl-2 m-0">{title}</h1>
      </div>
      <div className="bg-white rounded-b-lg p-1 h-16 mt-0.5">
        <div className="text-sm text-black text-left pl-2 pt-4 font-normal">
          Enviado por {sentBy}
        </div>
      </div>
    </div>
  );
}
