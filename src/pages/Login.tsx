import { useState } from "react";

type LoginProps = {
  onLogin: () => void;
  onBack: () => void;
  onRegister: () => void;
};

export default function Login({ onLogin, onBack, onRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validação local do formulário enquanto a autenticação não está integrada.
    if (!email || !password) {
      setError("Preencha todos os campos para continuar.");
      return;
    }
    setError("");
    setConnected(true);
  }

  if (connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <span className="text-green-600 text-2xl font-bold">OK</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Conta conectada</h1>
          <p className="text-sm text-gray-500 mt-2">Você entrou na sua conta com sucesso.</p>
          <button
            type="button"
            onClick={onLogin}
            className="w-full mt-6 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Continuar para a loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Área principal do formulário de autenticação. */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        
        {/* Identificação da aplicação. */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Meu Site <span style={{ color: "var(--accent)" }}>OLX</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">Entre para continuar suas compras</p>
        </div>

        {/* Dados de acesso do usuário. */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all"
              autoComplete="current-password"
            />
            <div className="text-right mt-1.5">
              <button type="button" className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">
                Esqueci minha senha
              </button>
            </div>
          </div>

          {/* Mensagem exibida quando os dados obrigatórios não foram preenchidos */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Confirma o envio dos dados de acesso. */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Entrar
          </button>
        </form>

        {/* Opções complementares do fluxo de autenticação. */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">
            Ainda não tem conta?{" "}
            <button type="button" onClick={onRegister} className="font-bold text-gray-800 hover:underline">
              Cadastre-se
            </button>
          </p>
          
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Voltar para a loja
          </button>
        </div>
      </div>
    </div>
  );
}