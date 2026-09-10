import { type Listing } from "../../data";
import { Icon } from "./Icon";

type Props = {
  item: Listing;
  onSelect: (id: number) => void;
  onAddToCart: (item: Listing) => void;
  onAddToFavorites: (item: Listing) => void;
  favorites: number[];
};

export function ListingCard({ item, onSelect, onAddToCart, onAddToFavorites, favorites }: Props) {
  const isFav = favorites.includes(item.id);

  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <img
          src={item.img}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={() => onSelect(item.id)}
        />
        {item.tag && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white uppercase shadow-sm" style={{ backgroundColor: "var(--accent)" }}>
            {item.tag}
          </span>
        )}
        {/* Permite salvar o anúncio sem abrir sua página de detalhes. */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToFavorites(item);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow hover:scale-110 transition"
          aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFav}
        >
          <Icon name="heart" filled={isFav} className={isFav ? "text-gray-900" : "text-gray-500"} />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{item.category}</p>
        <h3>
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className="text-left text-lg font-bold text-gray-900 leading-tight line-clamp-2 w-full"
          >
            {item.title}
          </button>
        </h3>
        <p className="text-2xl font-black" style={{ color: "var(--accent)" }}>{item.price}</p>
        
        <div className="text-xs text-gray-500 flex items-center gap-3 pt-2 border-t border-gray-100">
          <span className="flex items-center gap-1"><Icon name="location" size={14} /> {item.location}</span>
          <span>·</span>
          <span>{item.time}</span>
        </div>
        
        {/* Adiciona o anúncio ao carrinho sem alterar a página atual. */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          className="mt-3 w-full py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition inline-flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <Icon name="cart" size={16} className="text-white" />
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}