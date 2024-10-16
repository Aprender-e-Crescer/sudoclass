import React from 'react';

const FormHeader: React.FC<{ imagemUrl: string; nome: string }> = ({ imagemUrl, nome }) => {
  return (
    <div style={styles.container}>
      <img src={imagemUrl} alt={nome} style={styles.imagem} />
      <span style={styles.nome}>{nome}</span>
    </div>
  );
};

const styles = { // Renomeado de 'style' para 'styles'
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '36px',
  },
  imagem: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover' as 'cover',
  },
  nome: {
    fontSize: '20px',
    fontWeight: 600,
  },
};

export default FormHeader;
