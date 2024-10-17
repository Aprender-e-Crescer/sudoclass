import { Header } from '@/components/custom/header'
import { SubHeader } from '@/components/custom/subheader'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/view-activity')({
  component: ViewActivity,
})

function ViewActivity() {
  return (
    <div>
      <Header avatarImage="" avatarFallBack="" logo="" />
      <div className="flex justify-around w-full py-4">
        <SubHeader />
        <Button variant="blueButton" size="small">
          Reunião
        </Button>
      </div>
      <hr />
    </div>
  )
}
