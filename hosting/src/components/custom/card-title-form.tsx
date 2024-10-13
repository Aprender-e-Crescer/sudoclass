interface CardTitleFormProps {
  title: string;
  sentBy: string;
}

export function CardTitleForm({ title, sentBy }: CardTitleFormProps) {
  return (
    <div
      style={{
        backgroundColor: '#0C408F',
        borderRadius: '10px',
        padding: '6px 1px 1.5px 1px',
        width: '620px',
        position: 'relative',
      }}
    >

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px 8px 0 0',
          padding: '5px 1px 1px 1px',
          width: '100%',
          height: '50px', 
          marginBottom: '1px',
        }}
      >
        <h1 style={{ fontSize: '28px', margin: '0', fontWeight: 'bold', textAlign: 'left', paddingLeft: '8px' }}>
          {title}
        </h1>
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '0 0 8px 8px',
          padding: '1px 1px 1px 1px',
          width: '100%',
          height: '70px',
          marginTop: '1px',
        }}
      >
        <div style={{ 
            fontSize: '14px', 
            color: 'black', 
            textAlign: 'left', 
            paddingLeft: '8px', 
            paddingTop: '16px',
            fontWeight: 'normal'
          }}>
          Enviado por {sentBy}
        </div>
      </div>
    </div>
  );
}
