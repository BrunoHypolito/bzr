import { useState } from "react"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import Home from "./pages/Home"
import Anuncio from "./pages/Anuncio";
import Veiculos from "./pages/Veiculos";
import Favoritos from "./pages/Favoritos";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { type Page, type Listing } from "./data"
import { FEATURED, VEHICLES } from "./data"

export default function App() {
  const [page, setPage] = useState<Page>({ name: "home" })
  const [cart, setCart] = useState<Listing[]>([])
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  const favoriteItems = [...FEATURED, ...VEHICLES].filter((i) =>
    favoriteIds.includes(i.id)
  )

  function addToCart(item: Listing) {
    setCart((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item]
    )
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  function toggleFavorite(item: Listing) {
    setFavoriteIds((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    )
  }

  function removeFavorite(id: number) {
    setFavoriteIds((prev) => prev.filter((i) => i !== id))
  }

  return (
    <div className="min-h-full bg-gray-50">
      {page.name === "login" ? (
        <Login 
          onLogin={() => setPage({ name: "home" })} 
          onBack={() => setPage({ name: "home" })} 
          onRegister={() => setPage({ name: "cadastro" })}
        />
      ) : page.name === "cadastro" ? (
        <Cadastro
          onRegister={() => setPage({ name: "login" })}
          onBack={() => setPage({ name: "home" })}
        />
      ) : (
        <>
          <Header
            page={page}
            cart={cart}
            favorites={favoriteIds}
            onNavigate={setPage}
            onCart={() => setPage({ name: "checkout" })}
            onFavorites={() => setPage({ name: "favoritos" })}
            onLogin={() => setPage({ name: "login" })}
          />

          {page.name === "home" && (
            <Home
              onNavigate={setPage}
              onAddToCart={addToCart}
              onAddToFavorites={toggleFavorite}
              favorites={favoriteIds}
            />
          )}

          {page.name === "veiculos" && (
            <Veiculos
              onSelect={(id) => setPage({ name: "anuncio", id })}
              onBack={() => setPage({ name: "home" })}
            />
          )}

          {page.name === "anuncio" && (
            <Anuncio
              id={page.id!}
              onBack={() => setPage({ name: "home" })}
              onAddToCart={addToCart}
              onAddToFavorites={toggleFavorite}
              favorites={favoriteIds}
            />
          )}

          {page.name === "favoritos" && (
            <Favoritos
              items={favoriteItems}
              onSelect={(id) => setPage({ name: "anuncio", id })}
              onRemove={removeFavorite}
              onBack={() => setPage({ name: "home" })}
              onAddToCart={addToCart}
            />
          )}

          {page.name === "checkout" && (
            <Checkout
              cart={cart}
              onRemoveFromCart={removeFromCart}
              onBack={() => setPage({ name: "home" })}
              onSuccess={() => {
                setCart([])
                setPage({ name: "home" })
              }}
            />
          )}

          {page.name === "home" && <Footer />}
        </>
      )}
    </div>
  )
}