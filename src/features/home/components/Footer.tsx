import { IconBook } from '@tabler/icons-react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      className='border-t px-4 py-8 sm:py-10 md:py-12'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
        <div>
          <h3 className='flex items-center justify-center gap-2 text-xl font-bold md:justify-start'>
            <IconBook className='h-6 w-6' /> ISWO Academy
          </h3>
          <p className='mt-2 text-center text-muted-foreground md:text-left'>
            Tu plataforma para enseñar al mundo
          </p>
        </div>
        <div className='grid grid-cols-2 gap-6 text-center sm:flex sm:gap-8 sm:text-left md:text-left'>
          <div>
            <h4 className='mb-3 font-medium'>Plataforma</h4>
            <ul className='space-y-2 text-muted-foreground'>
              <li>Características</li>
              <li>Precios</li>
              <li>Testimonios</li>
            </ul>
          </div>
          <div>
            <h4 className='mb-3 font-medium'>Compañía</h4>
            <ul className='space-y-2 text-muted-foreground'>
              <li>Sobre nosotros</li>
              <li>Blog</li>
              <li>Contacto</li>
            </ul>
          </div>
          <div className='col-span-2 sm:col-auto'>
            <h4 className='mb-3 font-medium'>Legal</h4>
            <ul className='space-y-2 text-muted-foreground'>
              <li>Términos</li>
              <li>Privacidad</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='mt-8 text-center text-sm text-muted-foreground sm:mt-10 md:mt-12'>
        © {new Date().getFullYear()} ISWO Academy. Todos los derechos
        reservados.
      </div>
    </motion.footer>
  )
}

export default Footer
