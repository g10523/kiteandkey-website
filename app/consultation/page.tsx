import ConsultationFormV2 from "./ConsultationFormV2";
import { getAvailableSlotsV2 } from "./actions-v2";

// This is now a Server Component
export const dynamic = 'force-dynamic';

export default async function ConsultationPage() {
  const availableSlots = await getAvailableSlotsV2();

  return <ConsultationFormV2 availableSlots={availableSlots} />;
}