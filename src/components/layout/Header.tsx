import { useState } from "react"
import { type Page, type Listing } from "../../data"
import { Icon } from "../ui/Icon"

type HeaderProps = {
  page: Page
  cart: Listing[]
  favorites: number[]
  onNavigate: (p: Page) => void
  onCart: () => void
  onFavorites: () => void
  onLogin: () => void
  showSearch?: boolean // Prop adicionada
}

export function Header({ page, cart, favorites, onNavigate, onCart, onFavorites, onLogin, showSearch = true }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const navItems = [
    "Veículos",
    "Imóveis",
    "Eletrônicos",
    "Moda",
    "Móveis",
    "Serviços",
    "Animais",
    "Mais",
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Identidade visual e acesso à página inicial. */}
        <button
          onClick={() => onNavigate({ name: "home" })}
          className="flex-shrink-0 flex items-center gap-2"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[11px] tracking-widest"
            style={{ background: "var(--accent)" }}
          >
            BZR
          </div>
          <div className="leading-none">
            <span
              className="font-extrabold text-xl tracking-tight block"
              style={{ color: "var(--accent)" }}
            >
              BZR
            </span>
            <span className="text-[9px] text-gray-400 font-medium tracking-[0.18em] uppercase block">
              Bazaar
            </span>
          </div>
        </button>

        {/* Pesquisa por anúncios e seleção de localização. */}
        {showSearch && page.name !== "home" && (
          <div
            className={`flex-1 max-w-2xl relative flex items-center rounded-xl border-2 bg-white transition-colors ${
              searchFocused
                ? "border-[var(--accent-border)] shadow-[0_0_0_3px_rgba(217,95,2,0.15)]"
                : "border-gray-200"
            }`}
          >
            <Icon name="search" className="ml-3 text-gray-400" />
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <select className="pr-3 pl-2 py-2.5 text-sm text-gray-500 bg-transparent border-l border-gray-200 outline-none cursor-pointer">
              <option>Brasil</option>
              <option>São Paulo</option>
              <option>Rio de Janeiro</option>
              <option>Belo Horizonte</option>
            </select>
          </div>
        )}

        {/* Ações principais do usuário. */}
        <div className="ml-auto flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onFavorites}
            className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            title="Favoritos"
          >
            <Icon name="heart" className="text-gray-500" />
            {favorites.length > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={onCart}
            className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            title="Carrinho"
          >
            <Icon name="cart" className="text-gray-500" />
            {cart.length > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={onLogin}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Entrar
          </button>
          <button
            className="text-sm font-bold text-white px-4 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--accent)" }}
          >
            + Anunciar
          </button>
        </div>
      </div>

      {/* Categorias disponíveis na navegação principal. */}
      {page.name === "home" && (
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto py-2 text-xs text-gray-500 font-medium">
            {navItems.map((n) => (
              <button
                key={n}
                onClick={() =>
                  n === "Veículos" && onNavigate({ name: "veiculos" })
                }
                className="whitespace-nowrap transition-colors pb-0.5 border-b-2 border-transparent hover:text-[var(--accent)] hover:border-[var(--accent-border)]"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}