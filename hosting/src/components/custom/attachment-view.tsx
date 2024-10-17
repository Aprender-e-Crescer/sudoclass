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
    <div className="border border-gray-300 rounded-lg flex items-center justify-between p-4 w-full max-w-[379.71px] h-auto sm:h-[78.14px]">
      <Link to={url} className="flex items-center gap-2 flex-1 sm:flex-none mb-4 sm:mb-0 hover:underline">
        <div className="w-[105px] h-[70px] sm:w-[105px] sm:h-[70px] mb-2 sm:mb-0">
          <img src={imageUrl} alt="Imagem do anexo" className="w-full h-full object-cover rounded" />
        </div>
        <div>
          <h1 className="text-[18px] sm:text-[23px]">{title}</h1>
          <Link to={url} className="hover:underline text-xs sm:text-sm">
            {linkText}
          </Link>
        </div>
      </Link>

      <button className="ml-4 p-2 sm:p-0 flex items-center justify-center hover:bg-gray-200 rounded-full">
        <IoMdClose className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}