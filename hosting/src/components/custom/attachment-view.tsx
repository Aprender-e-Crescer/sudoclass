import { Link } from '@tanstack/react-router';

interface PropsAttachment {
  url: string;
  imageUrl: string;
  title: string;
  linkText: string;
}

export function AttachmentView({ url, imageUrl, title, linkText }: PropsAttachment) {
  return (
    <div className="border border-gray-300 rounded-lg flex items-center w-[379.71px] h-[78.14px]">
      <Link to={url} className="flex items-center gap-2 m-4 hover:underline">
        <div className="w-[105px] h-[70px]">
          <img src={imageUrl} alt="Imagem do anexo" />
        </div>
        <div>
          <h1 className="text-[23px]">{title}</h1>
          <Link to={url} className="hover:underline text-sm">
            {linkText}
          </Link>
        </div>
      </Link>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

AttachmentView.defaultProps = {
  url: "https://quizizz.com/?lng=pt-BR",
  imageUrl: "https://i.imgur.com/bEzh3oE.png",
  title: "Desafio",
  linkText: "https://quizizz.com/?lng=pt-BR",
};
