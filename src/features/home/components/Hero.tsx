import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import VideoPlayer from '@/components/video-player'

const Hero = ({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) => {
  return (
    <motion.section
      ref={heroRef}
      className='flex flex-col items-center px-4 py-8 text-center sm:py-12 md:py-24'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h1
        className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Crea tu academia online{' '}
        <span className='text-primary'>sin límites</span>
      </motion.h1>
      <motion.p
        className='mb-6 max-w-3xl text-lg text-muted-foreground sm:text-xl md:mb-10 md:text-2xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        La plataforma completa para crear, gestionar y monetizar tu propia
        academia online. Tú enseñas, nosotros nos encargamos de todo lo demás.
      </motion.p>
      <motion.div
        className='flex w-full flex-col gap-3 px-4 sm:flex-row sm:justify-center sm:gap-4 sm:px-0'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button
          size='lg'
          className='w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg'
        >
          Comenzar ahora
        </Button>
        <Button
          size='lg'
          variant='outline'
          className='w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg'
        >
          Ver demostración
        </Button>
      </motion.div>

      <motion.div
        className='mt-10 flex h-48 w-full max-w-5xl items-center justify-center rounded-xl bg-muted sm:h-60 md:mt-16 md:h-auto'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <VideoPlayer url='https://www.youtube.com/watch?v=2NSdrVS0MFc&list=PLAEEYg4AUFM63CU30TMmgZReW_Gj8nFyA&ab_channel=%F0%9F%92%A1SIGISWOSoftware%2CelmejorparaCalidad%26HSEQ' />
      </motion.div>
    </motion.section>
  )
}

export default Hero
