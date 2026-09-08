import { FEATURED, RECENT, type Listing, type Page } from "../data";
import { ListingCard } from "../components/ui/ListingCard";
import { type IconName, Icon } from "../components/ui/Icon";

type HomeProps = {
  onNavigate: (p: Page) => void;
  onAddToCart: (item: Listing) => void;
  onAddToFavorites: (item: Listing) => void;
  favorites: number[];
};

const CATEGORIES = [
  { icon: "car", label: "Carros", count: "2.4M", page: "veiculos" },
  { icon: "motorcycle", label: "Motos", count: "890K", page: "veiculos" },
  { icon: "home", label: "Imóveis", count: "1.1M", page: null },
  { icon: "phone", label: "Celulares", count: "1.1M", page: null },
  { icon: "laptop", label: "Informática", count: "540K", page: null },
  { icon: "sofa", label: "Móveis", count: "720K", page: null },
  { icon: "dress", label: "Moda", count: "180K", page: null },
  { icon: "gamepad", label: "Games", count: "210K", page: null },
];

export default function Home({ onNavigate, onAddToCart, onAddToFavorites, favorites }: HomeProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Destaque inicial com busca rápida e contraste adequado para o texto. */}
      <div className="relative rounded-2xl overflow-hidden h-72 shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200" 
          alt="Pessoa procurando ofertas" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl font-bold mb-2">O que você procura?</h1>
          <p className="text-gray-200 mb-6">Milhares de ofertas perto de você.</p>
          
          <div className="w-full max-w-xl bg-white rounded-full flex items-center p-2 shadow-lg">
            <input 
              type="text" 
              placeholder="Conte-nos o que você busca..." 
              className="flex-1 bg-transparent outline-none px-4 text-sm text-gray-700 placeholder-gray-400"
            />
            <button className="px-8 py-3 rounded-full text-white font-bold transition hover:opacity-90" style={{ backgroundColor: "var(--accent)" }}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Atalhos para as categorias mais procuradas. */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Explore por categoria</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => cat.page && onNavigate({ name: cat.page as Page["name"] })}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition group"
            >
              <Icon name={cat.icon as IconName} size={28} className="text-gray-500 group-hover:scale-110 transition-transform" />
              <span className="text-left">
                <span className="block font-semibold text-gray-800">{cat.label}</span>
                <span className="block text-xs text-gray-500">{cat.count} anúncios</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Anúncios selecionados para a página inicial. */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Destaques</h2>
          <button className="text-sm font-bold" style={{ color: "var(--accent)" }}>
            Ver todos →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((item) => (
            <ListingCard 
              key={item.id} 
              item={item} 
              onSelect={(id) => onNavigate({ name: "anuncio", id })}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
              favorites={favorites}
            />
          ))}
        </div>
      </div>

      {/* Anúncios publicados recentemente. */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Publicados recentemente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECENT.map((item) => (
            <ListingCard 
              key={item.id} 
              item={item} 
              onSelect={(id) => onNavigate({ name: "anuncio", id })}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
              favorites={favorites}
            />
          ))}
        </div>
      </div>
    </div>
  );
}