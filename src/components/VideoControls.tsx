import { useState, useEffect, RefObject } from 'react'

type VideoControlsProps = {
  videoEl: RefObject<HTMLVideoElement>,
  show: boolean
}

export default function VideoControls({ videoEl, show }: VideoControlsProps) {
  const [progress, setProgress] = useState(0)

  const handleProgress = () => {
    setProgress((videoEl.current.currentTime / videoEl.current.duration) * 100)
  }

  const handleKeydown = event => {
    switch (event.keyCode) {
      case 77:
        videoEl.current.muted = !videoEl.current.muted
        break
      case 32:
        videoEl.current.paused ? videoEl.current.play() : videoEl.current.pause()
        break
    }
  }

  useEffect(() => {
    if (videoEl.current) {
      videoEl.current.addEventListener('timeupdate', handleProgress)
      window.addEventListener('keydown', handleKeydown)
    }

    return () => {
      if (videoEl.current) {
        videoEl.current.removeEventListener('timeupdate', handleProgress)
        window.removeEventListener('keydown', handleKeydown)
      }
    }
  }, [videoEl])

  return (
    <div>
      <button onClick={() => videoEl.current.paused ? videoEl.current.play() : videoEl.current.pause()}>Play / Pause</button>
      <button onClick={() => videoEl.current.muted = !videoEl.current.muted}>Mute / Unmute</button>
      <input
        type="range"
        value={progress || 0}
        onChange={event => videoEl.current.currentTime = (parseInt(event.currentTarget.value) / 100) * videoEl.current.duration}
        min={0}
        max={100}
      />

      <style jsx>{`
        div {
          position: absolute;
          display: flex;
          flex-wrap: nowrap;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 15px;
          visibility: ${show ? 'visible' : 'hidden'};
          z-index: 1;
        }

        button {
          margin-right: 15px;
        }

        input {
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}
