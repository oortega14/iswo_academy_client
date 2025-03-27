import { ComponentPropsWithoutRef } from 'react'
import ReactPlayer from 'react-player'

// Definimos un tipo para las props para evitar problemas de linting
interface VideoPlayerProps
  extends ComponentPropsWithoutRef<typeof ReactPlayer> {
  url: string
}

const VideoPlayer = ({ url, ...props }: VideoPlayerProps) => {
  return (
    <div className='relative aspect-video h-full w-full overflow-hidden rounded-lg'>
      <ReactPlayer
        url={url}
        controls={true}
        width='100%'
        height='100%'
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
          file: {
            attributes: { controlsList: 'nodownload' },
          },
        }}
        {...props}
      />
    </div>
  )
}

export default VideoPlayer
