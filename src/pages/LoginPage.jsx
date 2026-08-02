import { Link } from 'react-router-dom';
function Field({ label, hint, children }) {
  return (
    <label className="block text-sm font-semibold text-ink">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {hint ? <span className="text-xs font-medium text-ink/50">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

function baseControlClassName() {
  return 'mt-2 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 text-sm shadow-brutalSm outline-none transition-all placeholder:text-ink/35 focus:shadow-brutalHover focus:translate-x-px focus:translate-y-px';
}
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <section className="max-w-xl w-full bg-panel border-3 border-ink rounded-2xl shadow-brutal p-8">
        <Link to="/" className="text-ink/50 hover:text-ink"></Link>
        <h1 className="font-display text-lg tracking-tight">Login</h1>
        <p className="text-ink/50">Entre com suas credenciais</p>
        <form className="mt-6 flex flex-col gap-4">
          <Field label="Email" hint="Digite seu email de cadastro">
            <input type="email" placeholder="exemplo@dominio.com" className={baseControlClassName()} />
          </Field>
          <Field label="Senha" hint="Digite sua senha">
            <input type="password" placeholder="••••••••" className={baseControlClassName()} />
          </Field>
            <button type="submit" className="mt-4 w-full rounded-xl border-3 border-ink bg-orange-brand px-4 py-3 text-sm font-semibold shadow-brutalSm transition-all hover:shadow-brutalHover hover:translate-x-px hover:translate-y-px">
              Entrar
            </button>
        </form>
        <p className="mt-6 text-center text-sm text-ink/50">
          Não possui uma conta?{' '}
          <a href="/register" className="font-semibold text-orange-brand hover:underline">
            Cadastre-se
          </a>
        </p>    
      </section>
    </main>
  )
}
