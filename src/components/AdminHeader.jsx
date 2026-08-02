import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b-3 border-ink bg-panel">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 shrink-0 rounded-lg bg-orange-brand border-3 border-ink flex items-center justify-center shadow-brutalSm hover:shadow-brutalHover hover:translate-x-px hover:translate-y-px transition-all"
            aria-label="Voltar para a biblioteca"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>

          <div className="min-w-0">
            <p className="font-display text-lg tracking-tight">Administração</p>
            <p className="text-xs text-ink/60 truncate">Cadastro de novos livros</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border-3 border-ink bg-cream shadow-brutalSm">
          <ShieldCheck size={16} strokeWidth={2.5} />
          <span className="font-display text-xs tracking-wide">ÁREA RESTRITA</span>
        </div>
      </div>
    </header>
  );
}