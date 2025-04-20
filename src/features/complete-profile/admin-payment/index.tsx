import { motion } from 'framer-motion';
import { AdminPaymentForm, FormValues } from './AdminPaymentForm';
import WizardHeader from '../components/WizardHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function AdminPayment() {
  const onSubmit = async (values: FormValues) => {
    try {
      // Aquí irá la lógica para procesar el pago
      console.log(values);
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-8"
    >
      <WizardHeader />

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <Card>
          <CardHeader>
            <CardTitle>Membresía Anual</CardTitle>
            <CardDescription>
              Complete los datos necesarios para procesar su pago
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminPaymentForm onSubmit={onSubmit} />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}