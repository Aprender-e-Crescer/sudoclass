import { Link } from '@tanstack/react-router';
import { IoMdClose } from "react-icons/io";

interface PropsAttachment {
  url: string;
  imageUrl: string;
  title: string;
  linkText: string;
}

export default function AttachmentView({ url, imageUrl, title, linkText }: PropsAttachment) {
  return (
    <div className="border border-gray-300 rounded-lg flex p-2 max-w-[380px] w-full max-h-auto">
      <Link to={url} className="flex items-center gap-2 hover:underline">
          <img src={imageUrl} alt="Imagem do anexo" className='lg:w-[105px] lg:h-[70px] w-[90px] '/>
        <div>
          <h1 className="text-[20px] lg:text-[23px]">{title}</h1>
          <Link to={url} className="text-[12px]">
            {linkText}
          </Link>
        </div>
      </Link>
      <button className="lg:ml-4 ml-10 p-2 flex items-center justify-center hover:bg-gray-200 rounded-full">
        <IoMdClose className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}

//Props de teste:

           //AttachmentView.defaultProps = {
            //url: "https://quizizz.com/?lng=pt-BR",
            //imageUrl: "https://i.imgur.com/bEzh3oE.png",
            //title: "Desafio",
            //linkText: "https://quizizz.com/?lng=pt-BR",
           //};