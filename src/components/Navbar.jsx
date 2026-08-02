import { TreeDeciduous } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b-3 border-ink bg-panel">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg tracking-tight">
          <span className="w-9 h-9 rounded-lg bg-orange-brand border-3 border-ink flex items-center justify-center shadow-brutalSm">
            <TreeDeciduous size={18} className="text-ink" strokeWidth={2.5} />
          </span>
          Biblioteca Comunitária
        </Link>

        <nav className="hidden md:flex items-center gap-1 font-semibold text-sm">
          <Link
            to={{ pathname: '/', hash: '#inicio' }}
            className="px-4 py-2 rounded-lg hover:bg-yellow-brand/40 transition-colors"
          >
            Início
          </Link>
          <Link
            to={{ pathname: '/', hash: '#sobre' }}
            className="px-4 py-2 rounded-lg hover:bg-yellow-brand/40 transition-colors"
          >
            Sobre nós
          </Link>
          <Link
            to="/login"
            className="ml-2 px-5 py-2 rounded-lg bg-orange-brand border-3 border-ink shadow-brutalSm font-display text-xs tracking-wide hover:shadow-brutalHover hover:translate-x-px hover:translate-y-px transition-all"
          >
            ENTRAR
          </Link>
        </nav>
      </div>
    </header>
  );
}
