import { useState } from "react"
import { Icon } from "../components/ui/Icon"

type CadastroProps = {
  onRegister: () => void
  onBack: () => void
}

export default function Cadastro({ onRegister, onBack }: CadastroProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [created, setCreated] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Preencha todos os campos para criar sua conta.")
      return
    }
    setError("")
    setCreated(true)
  }

  if (created) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-5">
            <Icon name="check" size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Conta criada</h1>
          <p className="text-sm text-gray-500 mt-2">Seu cadastro foi concluído. Agora você pode entrar na sua conta.</p>
          <button
            type="button"
            onClick={onRegister}
            className="w-full mt-6 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Ir para o login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Criar <span style={{ color: "var(--accent)" }}>conta</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">Cadastre-se para salvar anúncios e fazer compras.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="cadastro-nome" className="block text-sm font-semibold text-gray-700 mb-1.5">Nome</label>
            <input
              id="cadastro-nome"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="cadastro-email" className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
            <input
              id="cadastro-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="cadastro-senha" className="block text-sm font-semibold text-gray-700 mb-1.5">Senha</label>
            <input
              id="cadastro-senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Crie uma senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all"
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div role="alert" className="bg-gray-100 border border-gray-300 text-gray-800 text-xs font-medium px-4 py-3 rounded-xl inline-flex items-start gap-2 w-full">
              <Icon name="alert" size={16} className="text-gray-800 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Criar minha conta
          </button>
        </form>

        <button type="button" onClick={onBack} className="w-full mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Voltar para a loja
        </button>
      </div>
    </div>
  )
}
