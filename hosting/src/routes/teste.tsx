import { createFileRoute } from '@tanstack/react-router';
import { FormHeaders } from '@/components/ui/form-header'; // Certifique-se de que o nome está correto (capitalizado)

export const Route = createFileRoute('/teste')({
  component: () =>
  <div>
    <form>
      <FormHeaders>
        Enviar
      </FormHeaders>
    </form>
  </div>
});

