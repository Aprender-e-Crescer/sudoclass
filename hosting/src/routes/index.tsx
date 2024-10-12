import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { FaCheck } from 'react-icons/fa';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="flex gap-8">
      <Button variant="blueButton" icon={<FaCheck />}>
        Copiar
      </Button>

      <Button variant="copyButton" icon={<FaCheck />} size="fixed">
        Copiar
      </Button>

      <Button variant="blueButton" icon={<FaCheck />} iconPosition='left' notificationCount={0}>
        Blue
      </Button>
      <Button variant="lightTextBlack" icon={<FaCheck />} notificationCount={10}>
        Light Text Black
      </Button>
      <Button variant="lightTextRed" icon={<FaCheck />} notificationCount={2}>
        Light Text Red
      </Button>
    </div>
  );
}

export default Index;
