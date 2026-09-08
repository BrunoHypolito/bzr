import { useState } from "react";
import { VEHICLES, type Listing } from "../data";
import { Icon } from "../components/ui/Icon";

type Props = {
  onSelect: (id: number) => void;
  onBack: () => void;
};

const BRANDS = ["Todos", "Honda", "Toyota", "Volkswagen", "Chevrolet", "Jeep", "Ford"];
const YEARS = ["Todos", "2023", "2022", "2021", "2020 ou anterior"];
const FUELS = ["Todos", "Flex", "Gasolina", "Diesel", "Elétrico"];

export default function Veiculos({ onSelect, onBack }: Props) {
  const [brand, setBrand] = useState("Todos");
  const [year, setYear] = useState("Todos");
  const [fuel, setFuel] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(300000);
  const [sort, setSort] = useState("relevancia");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = VEHICLES.filter((v) => {
    if (brand !== "Todos" && v.brand !== brand) return false;
    if (fuel !== "Todos" && v.fuel !== fuel) return false;
    if (v.priceNum > maxPrice) return false;
    if (year !== "Todos") {
      const y = parseInt(year);
      if (year === "2020 ou anterior") { if ((v.year ?? 9999) > 2020) return false; }
      else if (v.year !== y) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "menor") return a.priceNum - b.priceNum;
    if (sort === "maior") return b.priceNum - a.priceNum;
    return 0;
  });

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition-colors p-1 -ml-1">
            ← Voltar
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Veículos</span>
          <span className="ml-auto text-xs text-gray-400">{sorted.length} anúncios encontrados</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <aside className="w-56 flex-shrink-0 space-y-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Marca</p>
            <div className="space-y-1">
              {BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${brand === b ? "font-semibold text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  style={brand === b ? { background: "var(--accent)" } : {}}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Ano</p>
            <div className="space-y-1">
              {YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${year === y ? "font-semibold text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  style={year === y ? { background: "var(--accent)" } : {}}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Combustível</p>
            <div className="space-y-1">
              {FUELS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFuel(f)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${fuel === f ? "font-semibold text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  style={fuel === f ? { background: "var(--accent)" } : {}}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Preço máx: <span className="text-gray-700 normal-case font-semibold">R$ {maxPrice.toLocaleString("pt-BR")}</span>
            </p>
            <input
              type="range"
              min={30000}
              max={300000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>R$ 30k</span>
              <span>R$ 300k</span>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-gray-900">Veículos</h1>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 outline-none cursor-pointer bg-white"
              >
                <option value="relevancia">Mais relevantes</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`px-3 py-2 text-xs transition-colors ${view === "grid" ? "text-white" : "text-gray-400 bg-white hover:bg-gray-50"}`}
                  style={view === "grid" ? { background: "var(--accent)" } : {}}
                >
                  <Icon name="menu" size={16} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-3 py-2 text-xs transition-colors ${view === "list" ? "text-white" : "text-gray-400 bg-white hover:bg-gray-50"}`}
                  style={view === "list" ? { background: "var(--accent)" } : {}}
                >
                  <Icon name="menu" size={16} />
                </button>
              </div>
            </div>
          </div>

          {sorted.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Icon name="car" size={36} className="mx-auto mb-3 text-gray-400" />
              <p className="font-semibold text-gray-500">Nenhum veículo encontrado</p>
              <p className="text-sm mt-1">Tente ajustar os filtros</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {sorted.map((item) => (
                <VehicleCard key={item.id} item={item} onSelect={onSelect} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map((item) => (
                <VehicleListRow key={item.id} item={item} onSelect={onSelect} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VehicleCard({ item, onSelect }: { item: Listing; onSelect: (id: number) => void }) {
  return (
    <div
      onClick={() => onSelect(item.id)}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
    >
      <div className="relative overflow-hidden h-44 bg-gray-100">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {item.tag && (
          <span className={`absolute top-2 left-2 ${item.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide`}>
            {item.tag}
          </span>
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{item.title}</p>
        <p className="text-lg font-bold" style={{ color: "var(--accent)" }}>{item.price}</p>
        <div className="flex gap-2 text-[11px] text-gray-400">
          {item.year && <span>{item.year}</span>}
          {item.km && <><span>·</span><span>{item.km}</span></>}
          {item.fuel && <><span>·</span><span>{item.fuel}</span></>}
        </div>
        <p className="text-xs text-gray-400 flex items-center gap-1"><Icon name="location" size={13} />{item.location}</p>
      </div>
    </div>
  );
}

function VehicleListRow({ item, onSelect }: { item: Listing; onSelect: (id: number) => void }) {
  return (
    <div
      onClick={() => onSelect(item.id)}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 flex group"
    >
      <div className="relative overflow-hidden w-48 flex-shrink-0 bg-gray-100">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {item.tag && (
          <span className={`absolute top-2 left-2 ${item.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide`}>
            {item.tag}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex justify-between items-start">
        <div className="space-y-1">
          <p className="font-semibold text-gray-800">{item.title}</p>
          <div className="flex gap-3 text-xs text-gray-400">
            {item.year && <span className="flex items-center gap-1"><Icon name="calendar" size={13} /> {item.year}</span>}
            {item.km && <span className="flex items-center gap-1"><Icon name="road" size={13} /> {item.km}</span>}
            {item.fuel && <span className="flex items-center gap-1"><Icon name="fuel" size={13} /> {item.fuel}</span>}
            {item.transmission && <span className="flex items-center gap-1"><Icon name="settings" size={13} /> {item.transmission}</span>}
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1"><Icon name="location" size={13} /> {item.location} · {item.time}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>{item.price}</p>
        </div>
      </div>
    </div>
  );
}