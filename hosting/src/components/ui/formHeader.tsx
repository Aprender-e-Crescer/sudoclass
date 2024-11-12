import React from 'react';
import { Button } from '@/components/ui/button';
import { LuPencilLine } from "react-icons/lu";

interface FormHeaderProps {
  nome: string;
  imagemUrl: string;  
}

const FormHeader: React.FC<FormHeaderProps> = ({ nome, imagemUrl }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-300">
      <div className="flex items-center">
        <img
          src={imagemUrl}  
          alt={`${nome}'s avatar`}
          className="mr-8 w-12 h-12 rounded-full"
        />
        <h1 className="text-lg font-normal m-0">
          {nome}  
        </h1>
      </div>
      <Button type="submit" className='flex items-center space-x-2 px-4 py-2' icon={<LuPencilLine />}  >
        Editar 
      </Button>
    </div>
  );
};

export default FormHeader;
