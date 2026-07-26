import { X, Download, Bookmark, ListPlus, Play } from 'lucide-react';

export default function BookDrawer({ book, open, onClose }) {
  const hasCoverImage = Boolean(book?.coverImage);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-ink/40 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Painel lateral */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-panel border-l-3 border-ink z-50
        shadow-[-6px_0px_0px_0px_rgba(24,20,16,1)] transition-transform duration-300 ease-out
        ${open ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}
      >
        {book && (
          <div className="p-6">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg border-3 border-ink flex items-center justify-center bg-panel hover:bg-orange-brand transition-colors shadow-brutalSm"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="mt-2 flex gap-4">
              <div
                className="w-24 h-32 shrink-0 rounded-lg border-3 border-ink shadow-brutalSm flex items-center justify-center"
                style={!hasCoverImage ? { background: `linear-gradient(155deg, ${book.coverPalette.from}, ${book.coverPalette.to})` } : undefined}
              >
                {hasCoverImage ? (
                  <img src={book.coverImage} alt={book.title} className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <span className="font-display text-3xl text-white/30">
                    {book.coverInitial}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg leading-tight">{book.title}</h3>
                {book.subtitle ? <p className="mt-1 text-sm text-ink/70">{book.subtitle}</p> : null}
                <p className="mt-2 text-sm">
                  <span className="text-ink/60">Autores: </span>
                  <span className="font-semibold underline underline-offset-2">{book.authorsLabel}</span>
                </p>
                {book.publisherLabel && (
                  <p className="text-sm">
                    <span className="text-ink/60">Editora: </span>
                    <span className="font-semibold underline underline-offset-2">{book.publisherLabel}</span>
                  </p>
                )}
              </div>
            </div>

            <button className="mt-6 w-full py-3 rounded-lg border-3 border-ink bg-panel font-display text-xs tracking-wide shadow-brutalSm hover:shadow-brutalHover hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
              PEGAR EMPRESTADO GRÁTIS
            </button>

            <button className="mt-3 w-full py-3 rounded-lg border-3 border-ink bg-orange-brand font-display text-xs tracking-wide shadow-brutalSm hover:shadow-brutalHover hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-2">
              <Play size={14} fill="currentColor" />
              VER FICHA TÉCNICA
            </button>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: Download, label: 'Baixar' },
                { icon: Bookmark, label: 'Salvar' },
                { icon: ListPlus, label: 'Lista' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1 py-3 rounded-lg border-3 border-ink bg-panel shadow-brutalSm hover:shadow-brutalHover hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                  <Icon size={18} strokeWidth={2.25} />
                  <span className="text-[11px] font-semibold">{label}</span>
                </button>
              ))}
            </div>

            <dl className="mt-6 space-y-2 text-sm border-t-3 border-ink pt-4">
              <div className="flex justify-between">
                <dt className="text-ink/60">Tema</dt>
                <dd className="font-semibold">{book.themeLabel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">ISBN</dt>
                <dd className="font-semibold">{book.isbn}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Ano</dt>
                <dd className="font-semibold">{book.publicationYear ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Quantidade</dt>
                <dd className="font-semibold">{book.quantity ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Páginas</dt>
                <dd className="font-semibold">{book.numberOfPages ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Cutter</dt>
                <dd className="font-semibold">{book.cutterCode ?? '—'}</dd>
              </div>
            </dl>

            <p className="mt-4 text-sm leading-relaxed text-ink/80">{book.description}</p>
          </div>
        )}
      </aside>
    </>
  );
}
