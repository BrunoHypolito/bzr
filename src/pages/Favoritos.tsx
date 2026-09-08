import { type Listing } from "../data";
import { Icon } from "../components/ui/Icon";

type Props = {
  items: Listing[];
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
  onBack: () => void;
  onAddToCart: (item: Listing) => void;
};

export default function Favoritos({ items, onSelect, onRemove, onBack, onAddToCart }: Props) {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition-colors">
            ← Voltar
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Meus Favoritos</span>
          {items.length > 0 && (
            <span className="ml-auto text-xs text-gray-400">{items.length} {items.length === 1 ? "item salvo" : "itens salvos"}</span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <Icon name="heart" size={52} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Nenhum favorito ainda</h2>
            <p className="text-gray-400 text-sm mb-6">Salve anúncios para encontrá-los facilmente depois.</p>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Explorar anúncios
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-lg font-bold text-gray-900 mb-6">Meus Favoritos</h1>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden flex group hover:shadow-md transition-all"
                >
                  <div
                    className="relative w-44 flex-shrink-0 bg-gray-100 cursor-pointer overflow-hidden"
                    onClick={() => onSelect(item.id)}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.tag && (
                      <span className={`absolute top-2 left-2 ${item.tagColor ?? "bg-orange-600"} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide`}>
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 p-4 flex items-start justify-between gap-4">
                    <div
                      className="flex-1 cursor-pointer space-y-1"
                      onClick={() => onSelect(item.id)}
                    >
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{item.category}</p>
                      <p className="font-semibold text-gray-800 leading-snug">{item.title}</p>
                      <p className="text-xl font-black" style={{ color: "var(--accent)" }}>{item.price}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                        <span className="flex items-center gap-1"><Icon name="location" size={13} /> {item.location}</span>
                        <span>·</span>
                        <span>{item.time}</span>
                        {item.km && <><span>·</span><span>{item.km}</span></>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-4 py-2 rounded-xl font-bold text-xs text-white transition-all hover:opacity-90 whitespace-nowrap"
                        style={{ background: "var(--accent)" }}
                      >
                        + Carrinho
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="px-4 py-2 rounded-xl font-medium text-xs text-red-400 border border-red-200 hover:bg-red-50 transition-colors whitespace-nowrap"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl flex items-center justify-between" style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-border)" }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--accent-hover)" }}>Ative alertas de preço</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>Avisamos quando o preço dos seus favoritos baixar.</p>
              </div>
              <button className="px-4 py-2 rounded-xl font-bold text-xs text-white whitespace-nowrap" style={{ background: "var(--accent)" }}>
                Ativar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}