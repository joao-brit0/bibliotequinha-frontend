import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <section className="max-w-xl w-full bg-panel border-3 border-ink rounded-2xl shadow-brutal p-8 text-center">
        <p className="font-display text-sm tracking-wide">ROTA NÃO ENCONTRADA</p>
        <h1 className="mt-3 font-display text-4xl">404</h1>
        <p className="mt-4 text-ink/80 leading-relaxed">
          A página solicitada não existe ou ainda não foi adicionada ao roteador.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-lg bg-orange-brand border-3 border-ink shadow-brutalSm font-display text-xs tracking-wide hover:shadow-brutalHover hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          VOLTAR PARA A HOME
        </Link>
      </section>
    </main>
  );
}