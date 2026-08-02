import { BookPlus, ClipboardList } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminBookForm from '../components/AdminBookForm';

export default function AdminBookCreatePage() {
  const [statusMessage, setStatusMessage] = useState('');

  function handleSubmit(data) {
    setStatusMessage(data.message);
  }

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatusMessage('');
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  return (
    <div id="top" className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-6 sm:py-8">
        <section className="bg-yellow-brand border-3 border-ink rounded-2xl shadow-brutal p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display text-sm tracking-wide mb-2">NOVO LIVRO</p>
              <h1 className="font-display text-3xl sm:text-4xl leading-tight">
                Cadastrar um novo livro
              </h1>
              <p className="mt-3 text-ink/80 leading-relaxed">
                Esta tela é protegida por rota e só deve ser exibida para usuários autenticados com perfil de administrador.
              </p>
            </div>

            <div className="bg-panel border-3 border-ink rounded-xl shadow-brutalSm px-4 py-3 min-w-55">
              <div className="flex items-center gap-2 font-display text-xs tracking-wide">
                <ClipboardList size={16} strokeWidth={2.5} />
                ROTA FRONTEND
              </div>
              <p className="mt-2 text-sm font-semibold">/dashboard/books/new</p>
              <p className="mt-1 text-xs text-ink/60">Área pronta para integrar login e permissões.</p>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border-3 border-ink bg-panel px-4 py-2 shadow-brutalSm">
            <BookPlus size={16} strokeWidth={2.5} />
            <span className="text-sm font-semibold">Formulário de cadastro completo</span>
          </div>
        </section>

        <div className="mt-6">
          <AdminBookForm onSubmit={handleSubmit} />
        </div>

        {statusMessage ? (
          <div className="mt-6 bg-panel border-3 border-ink rounded-2xl shadow-brutalSm p-5 fixed top-2 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-3xl">
            <p className="font-display text-sm tracking-wide mb-2">STATUS</p>
            <p className="text-sm leading-relaxed text-ink/80">{statusMessage}</p>
          </div>
        ) : null}
      </main>
    </div>
  );
}