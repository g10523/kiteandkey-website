import ConsultationForm from "./ConsultationForm";
import { getAvailableSlots } from "./actions";

// This is now a Server Component
export const dynamic = 'force-dynamic';

export default async function ConsultationPage() {
  const availableSlots = await getAvailableSlots();

  return <ConsultationForm availableSlots={availableSlots} />;
}