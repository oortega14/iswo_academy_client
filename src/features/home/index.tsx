import { useEffect, useRef, useState } from 'react'
import {
  IconBook,
  IconCertificate,
  IconCoin,
  IconDeviceDesktop,
  IconNote,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { motion, useScroll } from 'framer-motion'
import ReactPlayer from 'react-player'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { FeatureCard } from './components/FeatureCard'
import { HomeHeader } from './components/HomeHeader'
import { PricingCard } from './components/PricingCard'
import { StepCard } from './components/StepCard'
import VideoPlayer from '@/components/video-player'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    container: containerRef,
  })

  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 10)
    })
  }, [scrollY])

  return (
    <div className='flex h-svh flex-col'>
      <HomeHeader scrolled={scrolled} />

      {/* ===== Content ===== */}
      <Main ref={containerRef} className='flex-1 overflow-auto pt-16'>
        <div className='flex flex-col space-y-12 md:space-y-16'>
          {/* Hero Section */}
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
              academia online. Tú enseñas, nosotros nos encargamos de todo lo
              demás.
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
              className='mt-10 flex h-48 w-full max-w-5xl items-center justify-center rounded-xl bg-muted sm:h-60 md:mt-16 md:h-80'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <VideoPlayer url='https://www.youtube.com/watch?v=2NSdrVS0MFc&list=PLAEEYg4AUFM63CU30TMmgZReW_Gj8nFyA&ab_channel=%F0%9F%92%A1SIGISWOSoftware%2CelmejorparaCalidad%26HSEQ' />
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            ref={featuresRef}
            className='px-4 py-10 sm:py-12 md:py-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='mb-10 text-center sm:mb-12 md:mb-16'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='mb-3 text-2xl font-bold sm:text-3xl'>
                Todo lo que necesitas para tu academia online
              </h2>
              <p className='mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl'>
                Herramientas poderosas y fáciles de usar para crear una
                experiencia de aprendizaje excepcional
              </p>
            </motion.div>

            <div className='grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  icon: (
                    <IconDeviceDesktop className='h-10 w-10 text-primary sm:h-12 sm:w-12' />
                  ),
                  title: 'Clases grabadas',
                  description:
                    'Crea y organiza contenido educativo en video con facilidad. Accesible en cualquier dispositivo.',
                },
                {
                  icon: (
                    <IconCertificate className='h-10 w-10 text-primary sm:h-12 sm:w-12' />
                  ),
                  title: 'Certificados personalizados',
                  description:
                    'Otorga certificados de finalización automáticamente. Personalízalos con tu marca.',
                },
                {
                  icon: (
                    <IconNote className='h-10 w-10 text-primary sm:h-12 sm:w-12' />
                  ),
                  title: 'Tareas y evaluaciones',
                  description:
                    'Configura tareas, cuestionarios y evaluaciones para medir el progreso de tus alumnos.',
                },
                {
                  icon: (
                    <IconCoin className='h-10 w-10 text-primary sm:h-12 sm:w-12' />
                  ),
                  title: 'Monetización directa',
                  description:
                    'Recibe pagos directamente en tu cuenta. Tú estableces los precios y los planes.',
                },
                {
                  icon: (
                    <IconUsers className='h-10 w-10 text-primary sm:h-12 sm:w-12' />
                  ),
                  title: 'Gestión de alumnos',
                  description:
                    'Administra fácilmente a tus estudiantes, sus progresos y comunicaciones.',
                },
                {
                  icon: (
                    <IconSettings className='h-10 w-10 text-primary sm:h-12 sm:w-12' />
                  ),
                  title: 'Personalización total',
                  description:
                    'Adapta la plataforma a tu marca y estilo. Configura todo como desees.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section
            ref={howItWorksRef}
            className='rounded-xl bg-muted/50 px-4 py-10 sm:py-12 md:py-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='mb-10 text-center sm:mb-12 md:mb-16'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='mb-3 text-2xl font-bold sm:text-3xl'>
                Cómo funciona
              </h2>
              <p className='mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl'>
                En solo 3 sencillos pasos podrás tener tu academia online
                funcionando
              </p>
            </motion.div>

            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3'>
              {[
                {
                  number: '1',
                  title: 'Regístrate',
                  description:
                    'Crea tu cuenta gratuita y configura tu perfil de academia.',
                },
                {
                  number: '2',
                  title: 'Crea tu contenido',
                  description:
                    'Sube tus videos, materiales y configura tus cursos a tu gusto.',
                },
                {
                  number: '3',
                  title: 'Empieza a enseñar',
                  description:
                    'Comparte tu academia, recibe alumnos y cobra por tu conocimiento.',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <StepCard
                    number={step.number}
                    title={step.title}
                    description={step.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Pricing Section */}
          <motion.section
            ref={pricingRef}
            className='px-4 py-10 sm:py-12 md:py-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='mb-10 text-center sm:mb-12 md:mb-16'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='mb-3 text-2xl font-bold sm:text-3xl'>
                Planes simples y transparentes
              </h2>
              <p className='mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl'>
                Solo pagas una pequeña comisión por cada venta. Sin cuotas
                mensuales ni sorpresas.
              </p>
            </motion.div>

            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
              {[
                {
                  title: 'Básico',
                  price: '5%',
                  description: 'Para creadores que están empezando',
                  features: [
                    'Hasta 3 cursos',
                    'Hasta 100 estudiantes',
                    'Certificados básicos',
                    'Soporte por email',
                  ],
                  buttonText: 'Comenzar gratis',
                  highlighted: false,
                },
                {
                  title: 'Pro',
                  price: '10%',
                  description: 'Para academias en crecimiento',
                  features: [
                    'Cursos ilimitados',
                    'Estudiantes ilimitados',
                    'Certificados personalizados',
                    'Soporte prioritario',
                    'Dominio personalizado',
                  ],
                  buttonText: 'Elegir plan Pro',
                  highlighted: true,
                },
                {
                  title: 'Empresarial',
                  price: 'Personalizado',
                  description: 'Para grandes organizaciones',
                  features: [
                    'Todo lo de Pro',
                    'API personalizada',
                    'Integración con LMS',
                    'Gestor de cuenta dedicado',
                    'Acuerdo de nivel de servicio',
                  ],
                  buttonText: 'Contactar ventas',
                  highlighted: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <PricingCard
                    title={plan.title}
                    price={plan.price}
                    description={plan.description}
                    features={plan.features}
                    buttonText={plan.buttonText}
                    highlighted={plan.highlighted}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            ref={ctaRef}
            className='rounded-xl bg-primary/10 px-4 py-10 text-center sm:py-12 md:py-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className='mb-4 text-2xl font-bold sm:text-3xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              ¿Listo para empezar tu academia?
            </motion.h2>
            <motion.p
              className='mx-auto mb-6 max-w-2xl text-base text-muted-foreground sm:mb-8 sm:text-lg md:text-xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Únete a cientos de educadores que ya están compartiendo su
              conocimiento y generando ingresos con nuestra plataforma.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button size='lg' className='w-full px-8 text-lg sm:w-auto'>
                Crear mi academia ahora
              </Button>
            </motion.div>
          </motion.section>

          {/* Footer */}
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
        </div>
      </Main>
    </div>
  )
}
