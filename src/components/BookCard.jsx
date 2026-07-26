import { Bookmark } from 'lucide-react';

export default function BookCard({ book, onOpen }) {
  const hasCoverImage = Boolean(book.coverImage);

  return (
    <button onClick={() => onOpen(book)} className="text-left group w-full">
      <div
        className="aspect-[3/4] rounded-xl border-3 border-ink shadow-brutal group-hover:shadow-brutalHover group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all flex items-center justify-center overflow-hidden relative"
        style={!hasCoverImage ? { background: `linear-gradient(155deg, ${book.coverPalette.from}, ${book.coverPalette.to})` } : undefined}
      >
        {hasCoverImage ? (
          <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-6xl text-white/25 select-none">
            {book.coverInitial}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-snug truncate">{book.title}</p>
          <p className="text-xs text-ink/60 truncate">{book.authorsLabel}</p>
        </div>
        <span className="shrink-0 w-7 h-7 rounded-md border-2 border-ink flex items-center justify-center bg-panel">
          <Bookmark size={14} strokeWidth={2.5} />
        </span>
      </div>
    </button>
  );
}
