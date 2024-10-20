import React from 'react';

interface FormHeaderProps {
  imagemUrl: string;
  nome: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ imagemUrl, nome }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #ddd',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src={imagemUrl}
          alt={`${nome}'s avatar`}
          style={{
            marginRight: '10px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
        />
        <h1
          style={{
            fontSize: '1.2rem',
            fontWeight: 'normal',
            margin: '0',
          }}
        >
          {nome}
        </h1>
      </div>
    </div>
  );
};

export default FormHeader;
