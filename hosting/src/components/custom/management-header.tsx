import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

interface ManagementHeaderProps {
  title: string
  Subtitle?: string
  buttonText?: string
  buttonRedirection?: string
  onCreate?: () => void
}

export default function ManagementHeader({
  title,
  Subtitle,
  buttonText,
  onCreate,
  buttonRedirection,
}: ManagementHeaderProps) {
  return (
    <div className="border-b-2">
      <div className="flex items-center mx-6 my-10">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl text-[#0D062D] font-medium">
            {title}{Subtitle ? ' - ' : null}{Subtitle}
          </h1>
        </div>
        <Link to={buttonRedirection}>
          <Button onClick={onCreate} variant="blueButton" size="medium" className="py-1">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  )
}
