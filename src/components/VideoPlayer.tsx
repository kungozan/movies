import { useRef } from 'react'
import VideoControls from './VideoControls'

type VideoPlayerProps = {
  src: string,
  controls: 'default' | 'custom'
}

export default function VideoPlayer({ src, controls }: VideoPlayerProps) {
  const videoEl = useRef(null)

  return (
    <div>
      <video
        ref={videoEl}
        src={src}
        controls={controls === 'default'}
        autoPlay
        width={800}
        height={450}
      />
      {controls === 'custom' && <VideoControls videoEl={videoEl} show={true} />}

      <style jsx>{`
        div {
          position: relative;
        }

        video {
          display: block;
          max-width: 100%;
          background-color: black;
        }
      `}</style>
    </div>
  )
}
