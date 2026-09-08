import { useState } from "react"
import { FEATURED, RECENT, VEHICLES, type Listing } from "../data"
import { Icon } from "../components/ui/Icon"

type Props = {
  id: number
  onBack: () => void
  onAddToCart: (item: Listing) => void
  onAddToFavorites: (item: Listing) => void
  favorites: number[]
}

const ALL = [...FEATURED, ...VEHICLES, ...RECENT]

export default function Anuncio({ id, onBack, onAddToCart, onAddToFavorites, favorites }: Props) {
  const item = ALL.find((i) => i.id === id) ?? ALL[0]
  const [photo, setPhoto] = useState(0)
  const [msgOpen, setMsgOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [sent, setSent] = useState(false)
  const isFav = favorites.includes(item.id)

  const photos = item.photos ?? [item.img]
  const related = ALL.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 4)

  function handleSend() {
    if (!msg.trim()) return
    setSent(true)
    setTimeout(() => { setSent(false); setMsg(""); setMsgOpen(false); }, 2500)
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition-colors">
            ← Voltar
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">{item.category}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium truncate max-w-xs">{item.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="relative bg-gray-100 h-80">
                <img src={photos[photo]} alt={item.title} className="w-full h-full object-cover" />
                {item.tag && (
                  <span className={`absolute top-3 left-3 ${item.tagColor ?? "bg-orange-600"} text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide`}>
                    {item.tag}
                  </span>
                )}
              </div>
              {photos.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {photos.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPhoto(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${photo === i ? "border-[var(--accent-border)]" : "border-transparent"}`}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{item.category}</p>
                <h1 className="text-xl font-bold text-gray-900 leading-snug">{item.title}</h1>
                <p className="text-2xl font-black mt-2" style={{ color: "var(--accent)" }}>{item.price}</p>
              </div>

              {(item.year || item.km || item.fuel || item.transmission || item.color) && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 pt-2 border-t border-gray-100">
                  {[
                    item.year && { label: "Ano", value: String(item.year) },
                    item.km && { label: "Quilometragem", value: item.km },
                    item.fuel && { label: "Combustível", value: item.fuel },
                    item.transmission && { label: "Câmbio", value: item.transmission },
                    item.color && { label: "Cor", value: item.color },
                  ].filter(Boolean).map((spec: any) => (
                    <div key={spec.label} className="bg-gray-50 rounded-lg px-3 py-2">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-700 mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2">Descrição</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Icon name="location" size={14} /> {item.location}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Icon name="clock" size={14} /> Publicado {item.time}</span>
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-800 mb-3">Anúncios similares</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {related.map((r) => (
                    <div key={r.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                      <div className="h-28 bg-gray-100 overflow-hidden">
                        <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug">{r.title}</p>
                        <p className="text-sm font-bold mt-1" style={{ color: "var(--accent)" }}>{r.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 sticky top-24">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-hover)" }}>
                  {(item.seller ?? "V")[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.seller ?? "Vendedor"}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Icon name="star" className="text-gray-500" size={14} />
                    <span>{item.sellerRating ?? 4.5}</span>
                    <span className="text-gray-300">·</span>
                    <span>Verificado</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onAddToCart(item)}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: "var(--accent)" }}
              >
                Adicionar ao carrinho
              </button>

              <button
                onClick={() => setMsgOpen(!msgOpen)}
                className="w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                Enviar mensagem
              </button>

              <button
                onClick={() => onAddToFavorites(item)}
                className={`w-full py-2.5 rounded-xl font-medium text-sm border transition-all ${
                  isFav 
                    ? "bg-red-50 border-red-200 text-red-500" 
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center justify-center gap-2"><Icon name="heart" className="text-gray-500" />{isFav ? "Salvo nos favoritos" : "Salvar anúncio"}</span>
              </button>

              {msgOpen && (
                <div className="space-y-2 pt-1 border-t border-gray-100">
                  {sent ? (
                    <div className="text-center py-3">
                      <p className="text-green-600 font-semibold text-sm flex items-center justify-center gap-1"><Icon name="check" size={14} className="text-green-600" /> Mensagem enviada!</p>
                      <p className="text-xs text-gray-400 mt-1">O vendedor vai responder em breve.</p>
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Olá, ainda está disponível?"
                        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none resize-none focus:border-[var(--accent-border)] transition-colors"
                        rows={3}
                      />
                      <button
                        onClick={handleSend}
                        disabled={!msg.trim()}
                        className="w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-40"
                        style={{ background: "var(--accent)" }}
                      >
                        Enviar
                      </button>
                    </>
                  )}
                </div>
              )}

              <p className="text-[10px] text-gray-300 text-center leading-relaxed">
                Nunca pague antes de ver o produto.<br />Desconfie de propostas suspeitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}