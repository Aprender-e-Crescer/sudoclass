import { createFileRoute } from '@tanstack/react-router';
import FormHeader from "@/components/ui/formHeader"; // Importação correta

export const Route = createFileRoute('/teste')({
  component: () => (
    <div>
      <form>
        {/* Passe as propriedades necessárias para o FormHeader */}
        <FormHeader 
          nome="Professor Tal" 
        
          
        />
        {/* Agora você pode adicionar o botão ou outro conteúdo abaixo */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  ),
});
