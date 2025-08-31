import React from 'react'
import { siteConfig } from '../../config'

function Footer() {
  return (
    <footer className="p-6 border-t-4 bg-background text-foreground text-sm">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {siteConfig.name}
              </h2>
              <p className="mt-2">{siteConfig.tagline}</p>
            </div>

            <div>
              <h3 className="text-md font-medium text-foreground">
                Link utili
              </h3>
              <ul className="mt-2 space-y-1">
                {siteConfig.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-md font-medium text-foreground">Contatti</h3>
              <p className="mt-2">📍 {siteConfig.address}</p>
              <p>📞 {siteConfig.phone}</p>
              <p>✉️ {siteConfig.email}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti
            riservati.
          </div>
        </footer>  )
}

export default Footer