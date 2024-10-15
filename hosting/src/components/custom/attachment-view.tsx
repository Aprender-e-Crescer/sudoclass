import { Link } from '@tanstack/react-router';
import  PropsAttachment from '@/components/custom/props-attachment';

interface PropsAttachment {
  url: string
  imageUrl: string
  title: string
  linkText: string
}


export function AttachmentView({ url, imageUrl, title, linkText }: PropsAttachment) {
  return (
    <div className="border border-gray-300 rounded-lg flex items-center w-[379.71px] h-[78.14px]">
      <Link
        to={url} // Usando a prop 'url' para o link externo
        className="flex items-center gap-2 m-4 hover:underline"
      >
        <div className="w-[105px] h-[70px]">
          <img
            src={imageUrl} // Usando a prop 'imageUrl' para a imagem
            alt="Imagem do anexo"
          />
        </div>
        <div className="">
          <div className="">
            <h1 className="text-[23px]">
              {title} {/* Usando a prop 'title' para o título */}
            </h1>
          </div>
          <div className="">
            <Link
              to={url} // Usando a prop 'url' para o link interno
              className="hover:underline text-sm"
            >
              {linkText} {/* Usando a prop 'linkText' para o texto do link */}
            </Link>
          </div>
        </div>
      </Link>

      <button className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

