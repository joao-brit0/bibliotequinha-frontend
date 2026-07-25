import { Bookmark } from 'lucide-react';

export default function BookCard({ book, onOpen }) {
  return (
    <button
      onClick={() => onOpen(book)}
      className="text-left group w-full"
    >
      <div
        className="aspect-[3/4] rounded-xl border-3 border-ink shadow-brutal group-hover:shadow-brutalHover group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all flex items-center justify-center overflow-hidden relative"
        style={{
          background: `linear-gradient(155deg, ${book.cover.from}, ${book.cover.to})`,
        }}
      >
        <span className="font-display text-6xl text-white/25 select-none">
          {book.cover.initial}
        </span>
      </div>

      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-snug truncate">{book.title}</p>
          <p className="text-xs text-ink/60 truncate">{book.author}</p>
        </div>
        <span className="shrink-0 w-7 h-7 rounded-md border-2 border-ink flex items-center justify-center bg-panel">
          <Bookmark size={14} strokeWidth={2.5} />
        </span>
      </div>
    </button>
  );
}
