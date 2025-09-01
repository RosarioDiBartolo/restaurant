import { siteConfig } from "../config"
import { AlertTriangle } from "lucide-react"

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ table?: string }>
}) {
  const table = (await searchParams).table ?? "sconosciuto"

  return (
    <html lang="it">
      <body className="bg-pattern flex min-h-screen items-center justify-center px-4">
        <main className="w-full max-w-lg rounded-2xl bg-white/80 shadow-xl p-8 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-red-600">Tavolo chiuso</h1>
          </div>

          <p className="text-lg text-foreground leading-relaxed">
            Il tavolo <strong>{table}</strong> è stato chiuso, non è possibile
            modificare o aggiungere altri ordini.
          </p>

          <p className="mt-4 text-muted-foreground">
            Per favore contatta lo staff per completare l’attivazione e poter
            accedere ai servizi.
          </p>

          <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti
            riservati.
          </div>
        </main>
      </body>
    </html>
  )
}
