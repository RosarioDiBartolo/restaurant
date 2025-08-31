import { siteConfig } from "../config";
export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ table?: string }>;
}) {
  const table = (await searchParams).table ?? "sconosciuto";

  return (
    <html lang="it">
      <body className= " bg-pattern  flex min-h-screen flex-col pb-12  ">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Attivazione Richiesta
        </h1>
        <p className="text-lg text-foreground">
          Il tavolo <strong>{table}</strong> non è stato ancora attivato.
        </p>
        <p className="mt-2 text-muted-foreground">
          Per favore contatta lo staff per completare l’attivazione e poter
          accedere ai servizi.
        </p>

        <div className="mt-6 border-t pt-4 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti
          riservati.
        </div>
      </body>
    </html>
  );
}
