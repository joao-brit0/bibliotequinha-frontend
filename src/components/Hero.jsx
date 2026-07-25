import { Search } from 'lucide-react';
import { CATEGORIES } from '../api/books';

export default function Hero({ activeCategory, onCategoryChange, query, onQueryChange }) {
  return (
    <section id="inicio" className="bg-yellow-brand border-b-3 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 bg-panel border-3 border-ink rounded-xl px-4 py-3 shadow-brutal max-w-xl">
          <Search size={20} className="text-ink/60" strokeWidth={2.5} />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Título, autor ou assunto"
            className="w-full bg-transparent outline-none font-medium placeholder:text-ink/40"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-1.5 rounded-lg border-3 border-ink text-sm font-semibold transition-all ${
                  active
                    ? 'bg-orange-brand shadow-brutalSm'
                    : 'bg-panel hover:bg-panel/70 shadow-brutalSm hover:shadow-brutalHover hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
