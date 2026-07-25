import BookCard from './BookCard';

export default function BookGrid({ title, books, loading, onOpen }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl">{title}</h2>
        <a href="#" className="text-sm font-semibold underline underline-offset-2">
          ver mais
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-xl border-3 border-ink bg-ink/10 animate-pulse"
            />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="border-3 border-dashed border-ink/40 rounded-xl py-10 text-center text-ink/60 font-medium">
          Nenhum título encontrado nesta categoria por enquanto.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
