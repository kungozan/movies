import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// context
import TooltipContext from '../context/TooltipContext'

// util
import { normalize } from '../utilities/normalize'
import { isTouchDevice } from '../utilities/isTouchDevice'

type PosterProps = {
  name: string,
  image: string,
  description: string
}

export default function Poster({ name, image, description }: PosterProps) {
  const { setTooltip } = useContext(TooltipContext)

  return (
    <>
      <Link href={`/${normalize(name)}`}>
        <a>
          <Image
            src={image}
            alt={name}
            width={200}
            height={290}
            onMouseOver={() => !isTouchDevice() && setTooltip({ text: description })}
            onMouseLeave={() => !isTouchDevice() && setTooltip({ text: null })}
          />
        </a>
      </Link>
      <h2 title={name}>{name}</h2>

      <style jsx>{`
        h2 {
          margin: 10px 0 0;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          h2 {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  )
}
