import { Link } from '@tanstack/react-router';
import { IoMdClose } from "react-icons/io";

interface PropsAttachment {
  url: string;
  imageUrl: string;
  title: string;
  linkText: string;
}

export function AttachmentView({ url, imageUrl, title, linkText }: PropsAttachment) {
  return (
    <div className="border border-gray-300 rounded-lg flex p-4 max-w-[380px] w-full h-[78.14px]">
      <Link to={url} className="flex items-center gap-2 hover:underline">
          <img src={imageUrl} alt="Imagem do anexo" className='w-[105px] h-[70px]'/>
        <div>
          <h1 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[23px]">{title}</h1>
          <Link to={url} className="text-[12px]">
            {linkText}
          </Link>
        </div>
      </Link>
      <button className="ml-4 p-2 flex items-center justify-center hover:bg-gray-200 rounded-full">
        <IoMdClose className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}
