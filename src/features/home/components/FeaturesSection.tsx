import { motion } from 'framer-motion'
import React from 'react'
import { IconCertificate, IconCoin, IconDeviceDesktop, IconNote, IconSettings, IconUsers } from '@tabler/icons-react'
import { FeatureCard } from './FeatureCard'
const FeaturesSection = ({ featuresRef }: { featuresRef: React.RefObject<HTMLElement> }) => {
  return (
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
  )
}

export default FeaturesSection