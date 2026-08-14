import Link from "next/link";
import { VintageHeadline } from "@/components/ui/VintageHeadline";
import { getProductsForLanding } from "@/lib/products.server";
import { SuccessContent } from "./SuccessContent";


interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string; access?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId, access: accessToken } = await searchParams;
  const { individualBooks } = await getProductsForLanding();

  if (!sessionId && !accessToken) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center bg-parchment-texture min-h-[60vh] flex flex-col items-center justify-center">
        <VintageHeadline as="h1" className="text-3xl">
          Etwas ist schiefgelaufen
        </VintageHeadline>
        <p className="mt-4 text-navy/70">
          Keine Zahlungssitzung gefunden. Falls Sie einen Kauf abgeschlossen
          haben, prüfen Sie Ihre E-Mails auf Download-Links oder verwenden Sie
          Ihre gespeicherte Erfolgsseite.
        </p>
        <Link href="/" className="btn-vintage mt-8 inline-flex">
          Zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <SuccessContent
      sessionId={sessionId}
      accessToken={accessToken}
      individualBooks={individualBooks}
    />
  );
}
