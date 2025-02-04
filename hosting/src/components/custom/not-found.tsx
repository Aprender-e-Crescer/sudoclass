import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import notFoundImage from '@/assets/not-found.png'

interface notFoundComponent {
  title: string
  description: string
  whiteButtonText: string
  blueButtonText: string
  linkToWhiteButton?: string
  linkToBlueButton?: string
}

export default function NotFound({
  title,
  description,
  whiteButtonText,
  blueButtonText,
  linkToWhiteButton,
  linkToBlueButton,
}: notFoundComponent) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={notFoundImage} alt="Not Found Image" />
      <div className="flex flex-col items-center justify-center gap-y-14">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-4xl font-semibold text-gray-950">{title}</h1>
          <p className="text-gray-400 text-xl">{description}</p>
        </div>
        <div className="flex gap-x-3">
          <Link to={linkToWhiteButton}>
            <Button variant="cancelButton" size="large" className="font-medium text-black">
              {whiteButtonText}
            </Button>
          </Link>
          <Link to={linkToBlueButton}>
            <Button variant="blueButton" size="large" className="font-normal">
              {blueButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
