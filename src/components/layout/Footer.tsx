export function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-8 text-xs text-gray-500">
        {[
          {
            heading: "BZR",
            links: ["Quem somos", "Carreiras", "Imprensa", "Blog"],
          },
          {
            heading: "Ajuda",
            links: [
              "Central de ajuda",
              "Segurança",
              "Denunciar anúncio",
              "Como funciona",
            ],
          },
          {
            heading: "Anuncie",
            links: ["Pessoas Físicas", "Empresas", "Planos Pro", "API"],
          },
          {
            heading: "Legal",
            links: ["Termos de uso", "Privacidade", "Cookies", "LGPD"],
          },
        ].map((col) => (
          <div key={col.heading}>
            <p className="font-bold text-gray-700 mb-3">{col.heading}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-[var(--accent)]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © 2026 BZR Comércio Digital Ltda. Todos os direitos reservados.
      </div>
    </footer>
  )
}