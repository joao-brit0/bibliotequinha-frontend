import { BookPlus, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminBookForm from '../components/AdminBookForm';

export default function AdminBookCreatePage({ onBackHome }) {
  const [statusMessage, setStatusMessage] = useState('');

  function handleSubmit(data) {
    setStatusMessage(data.message);
  }

  function clearStatusMessage() {
    setStatusMessage('');
  }

  setTimeout(() => {
    clearStatusMessage();
  }, 5000);

  return (
    <div id="top" className="min-h-screen bg-cream">
      <AdminHeader onBackHome={onBackHome} />

      <main className="max-w-7xl mx-auto px-6 py-6 sm:py-8">
        <section className="bg-yellow-brand border-3 border-ink rounded-2xl shadow-brutal p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display text-sm tracking-wide mb-2">NOVO LIVRO</p>
              <h1 className="font-display text-3xl sm:text-4xl leading-tight">
                Cadastrar um novo livro
              </h1>
              <p className="mt-3 text-ink/80 leading-relaxed">
                Esta tela já está pronta para receber os dados exigidos pelo backend, mantendo o mesmo estilo neobrutalista da aplicação.
              </p>
            </div>

            <div className="bg-panel border-3 border-ink rounded-xl shadow-brutalSm px-4 py-3 min-w-[220px]">
              <div className="flex items-center gap-2 font-display text-xs tracking-wide">
                <ClipboardList size={16} strokeWidth={2.5} />
                ROTA FRONTEND
              </div>
              <p className="mt-2 text-sm font-semibold">/admin/livros/novo</p>
              <p className="mt-1 text-xs text-ink/60">Área preparada para integração com login depois.</p>
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