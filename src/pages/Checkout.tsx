import { useState } from "react"
import { type Listing } from "../data"
import { Icon, type IconName } from "../components/ui/Icon"

type Props = {
  cart: Listing[]
  onRemoveFromCart: (id: number) => void
  onBack: () => void
  onSuccess: () => void
}

type Step = "carrinho" | "dados" | "pagamento" | "confirmado"

const STEPS = [
  { key: "carrinho", label: "Carrinho" },
  { key: "dados", label: "Seus dados" },
  { key: "pagamento", label: "Pagamento" },
]

export default function Checkout({
  cart,
  onRemoveFromCart,
  onBack,
  onSuccess,
}: Props) {
  const [step, setStep] = useState<Step>("carrinho")
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    cidade: "",
  })
  const [payment, setPayment] = useState<"pix" | "cartao" | "boleto">("pix")
  const [cardNum, setCardNum] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExp, setCardExp] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  const total = cart.reduce((sum, i) => sum + i.priceNum, 0)
  const totalFmt =
    "R$ " + total.toLocaleString("pt-BR", { minimumFractionDigits: 0 })

  function updateForm(k: keyof typeof form, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  const stepIndex = STEPS.findIndex((s) => s.key === step)

  if (step === "confirmado") {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center text-4xl mx-auto mb-6">
            <Icon name="check" size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Pedido confirmado!
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            Seu pedido foi recebido e o vendedor foi notificado.
          </p>
          <p className="text-xs text-gray-400 mb-8">
            Uma confirmação foi enviada para{" "}
            <strong>{form.email || "seu e-mail"}</strong>.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 text-left space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 truncate">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="text-sm font-semibold text-gray-700">Total</span>
              <span className="text-sm font-black" style={{ color: "var(--accent)" }}>
                {totalFmt}
              </span>
            </div>
          </div>
          <button
            onClick={onSuccess}
            className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3 text-sm">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Voltar
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div
                aria-current={i === stepIndex ? "step" : undefined}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < stepIndex
                    ? "bg-gray-900 text-white"
                    : i === stepIndex
                      ? "text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
                style={i === stepIndex ? { background: "var(--accent)" } : {}}
              >
                {i < stepIndex ? <Icon name="check" size={15} className="text-white" /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  i === stepIndex ? "text-gray-800 font-bold" : "text-gray-400"
                }`}
              >
                {s.label}
                {i < stepIndex && <span className="sr-only">, concluído</span>}
                {i === stepIndex && <span className="sr-only">, etapa atual</span>}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-8 sm:w-16 ${
                    i < stepIndex ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {step === "carrinho" && (
              <div className="space-y-4">
                <h2 className="font-bold text-gray-900 text-lg">
                  Seu carrinho
                </h2>
                {cart.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                    <Icon name="cart" size={36} className="mx-auto mb-3 text-gray-400" />
                    <p className="font-semibold text-gray-500">
                      Carrinho vazio
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Adicione anúncios para continuar.
                    </p>
                    <button
                      onClick={onBack}
                      className="mt-4 px-5 py-2 rounded-xl font-bold text-sm text-white hover:opacity-90"
                      style={{ background: "var(--accent)" }}
                    >
                      Explorar anúncios
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 items-center"
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                              {item.brand}
                            </p>
                            <p className="font-semibold text-gray-800 text-sm leading-snug mt-0.5 truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              <span className="flex items-center gap-1"><Icon name="location" size={13} /> {item.location}</span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p
                              className="text-lg font-black"
                              style={{ color: "var(--accent)" }}
                            >
                              {item.price}
                            </p>
                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-xs text-gray-600 hover:text-gray-900 mt-1 transition-colors underline underline-offset-2"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep("dados")}
                      className="w-full py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-all"
                      style={{ background: "var(--accent)" }}
                    >
                      Continuar para dados →
                    </button>
                  </>
                )}
              </div>
            )}

            {step === "dados" && (
              <div className="space-y-4">
                <h2 className="font-bold text-gray-900 text-lg">Seus dados</h2>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Nome completo
                      </label>
                      <input
                        value={form.nome}
                        onChange={(e) => updateForm("nome", e.target.value)}
                        placeholder="João Silva"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] transition-colors"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Telefone
                      </label>
                      <input
                        value={form.telefone}
                        onChange={(e) => updateForm("telefone", e.target.value)}
                        placeholder="(11) 99999-0000"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        E-mail
                      </label>
                      <input
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="joao@email.com"
                        type="email"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] transition-colors"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        CEP
                      </label>
                      <input
                        value={form.cep}
                        onChange={(e) => updateForm("cep", e.target.value)}
                        placeholder="00000-000"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] transition-colors"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Cidade
                      </label>
                      <input
                        value={form.cidade}
                        onChange={(e) => updateForm("cidade", e.target.value)}
                        placeholder="São Paulo"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Endereço
                      </label>
                      <input
                        value={form.endereco}
                        onChange={(e) => updateForm("endereco", e.target.value)}
                        placeholder="Rua das Flores, 123"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep("pagamento")}
                    className="w-full py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-all"
                    style={{ background: "var(--accent)" }}
                  >
                    Continuar para pagamento →
                  </button>
                </div>
              </div>
            )}

            {step === "pagamento" && (
              <div className="space-y-4">
                <h2 className="font-bold text-gray-900 text-lg">
                  Forma de pagamento
                </h2>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {(["pix", "cartao", "boleto"] as const).map((m) => {
                      const labels: Record<typeof m, string> = {
                        pix: "Pix",
                        cartao: "Cartão",
                        boleto: "Boleto",
                      }
                      const icons: Record<typeof m, IconName> = {
                        pix: "bolt",
                        cartao: "card",
                        boleto: "document",
                      }
                      return (
                        <button
                          key={m}
                          onClick={() => setPayment(m)}
                          aria-pressed={payment === m}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            payment === m
                              ? "border-gray-900 bg-[var(--accent-soft)]"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Icon name={icons[m]} size={24} />
                          <span className="text-xs font-semibold text-gray-700 inline-flex items-center gap-1">
                            {payment === m && <Icon name="check" size={12} className="text-gray-900" />}
                            {labels[m]}
                          </span>
                          {m === "pix" && (
                            <span className="text-[9px] text-gray-800 font-bold inline-flex items-center gap-0.5">
                              <Icon name="check" size={10} className="text-gray-800" />
                              5% off
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {payment === "pix" && (
                    <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-32 h-32 bg-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center text-gray-400 text-4xl">
                        <Icon name="document" size={36} className="text-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
                        Escaneie o QR Code
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ou copie a chave:{" "}
                        <span className="font-mono text-gray-600">
                          bzr@pix.com.br
                        </span>
                      </p>
                      <p className="text-xs text-gray-800 mt-2 font-medium inline-flex items-center justify-center gap-1">
                        <Icon name="check" size={14} className="text-gray-800" />
                        Desconto de 5% aplicado automaticamente
                      </p>
                    </div>
                  )}

                  {payment === "cartao" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Número do cartão
                        </label>
                        <input
                          value={cardNum}
                          onChange={(e) => setCardNum(e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Nome no cartão
                        </label>
                        <input
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="JOAO A SILVA"
                          className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Validade
                          </label>
                          <input
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            placeholder="MM/AA"
                            className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            CVV
                          </label>
                          <input
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="000"
                            className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[var(--accent-border)] font-mono"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl px-4 py-3">
                        <p className="text-xs text-gray-500 font-semibold mb-2">
                          Parcelamento
                        </p>
                        <select className="w-full text-sm text-gray-700 bg-transparent outline-none">
                          <option>1x de {totalFmt} (sem juros)</option>
                          <option>
                            2x de R${" "}
                            {Math.floor(total / 2).toLocaleString("pt-BR")} (sem
                            juros)
                          </option>
                          <option>
                            3x de R${" "}
                            {Math.floor(total / 3).toLocaleString("pt-BR")} (sem
                            juros)
                          </option>
                          <option>
                            6x de R${" "}
                            {Math.floor(total / 6).toLocaleString("pt-BR")}{" "}
                            (2,5% a.m.)
                          </option>
                          <option>
                            12x de R${" "}
                            {Math.floor(total / 12).toLocaleString("pt-BR")}{" "}
                            (2,5% a.m.)
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  {payment === "boleto" && (
                    <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                      <p className="text-sm font-semibold text-gray-700">
                        Boleto bancário
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        O boleto será gerado após a confirmação e vence em 3
                        dias úteis. O anúncio será reservado por 24h.
                      </p>
                      <div className="font-mono text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2">
                        0001.2345 6789.0123 4567.8901 2 10000000
                        {String(total).padStart(10, "0")}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setStep("confirmado")}
                    className="w-full py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
                    style={{ background: "var(--accent)" }}
                  >
                    <Icon name="lock" size={16} className="text-white" />
                    Confirmar pedido — {totalFmt}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">
                    <span className="inline-flex items-center gap-1"><Icon name="lock" size={12} /> Ambiente seguro. Seus dados estão protegidos por
                    criptografia SSL.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24 space-y-4">
              <h3 className="font-bold text-gray-800 text-sm">
                Resumo do pedido
              </h3>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 truncate font-medium">
                        {item.title}
                      </p>
                      <p
                        className="text-xs font-bold"
                        style={{ color: "var(--accent)" }}
                      >
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    Subtotal ({cart.length}{" "}
                    {cart.length === 1 ? "item" : "itens"})
                  </span>
                  <span>{totalFmt}</span>
                </div>
                {payment === "pix" && step === "pagamento" && (
                  <div className="flex justify-between text-xs text-gray-800 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="check" size={12} className="text-gray-800" />
                      Desconto Pix (5%)
                    </span>
                    <span>
                      - R$ {Math.floor(total * 0.05).toLocaleString("pt-BR")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-gray-900 pt-1">
                  <span>Total</span>
                      <span style={{ color: "var(--accent)" }}>
                    {payment === "pix" && step === "pagamento"
                      ? "R$ " + Math.floor(total * 0.95).toLocaleString("pt-BR")
                      : totalFmt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}