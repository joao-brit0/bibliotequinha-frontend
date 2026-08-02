import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookGrid from './components/BookGrid';
import BookDrawer from './components/BookDrawer';
import About from './components/About';
import { fetchBooks, fetchBooksByTheme, THEME_FILTERS } from './api/books';

export default function App() {
  const [activeThemeId, setActiveThemeId] = useState('all');
  const [query, setQuery] = useState('');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBook, setSelectedBook] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const request = activeThemeId === 'all'
      ? fetchBooks({ perPage: 1000 })
      : fetchBooksByTheme(activeThemeId, { perPage: 1000 });

    request.then((booksData) => {
      if (cancelled) return;
      setBooks(booksData);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [activeThemeId]);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return books;

    return books.filter((book) => {
      return [book.title, book.subtitle, book.authorsLabel, book.publisherLabel, book.themeLabel, book.isbn]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });
  }, [books, query]);

  function openBook(book) {
    setSelectedBook(book);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <div id="top" className="min-h-screen bg-cream">
      <Navbar />
      <Hero
        themes={THEME_FILTERS}
        activeThemeId={activeThemeId}
        onThemeChange={setActiveThemeId}
        query={query}
        onQueryChange={setQuery}
      />

      <BookGrid title="Acervo" books={filteredBooks} loading={loading} onOpen={openBook} />

      <About />

      <footer className="border-t-3 border-ink bg-ink text-cream">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm flex flex-col sm:flex-row justify-between gap-2">
          <span>Biblioteca Comunitária — acervo livre e colaborativo.</span>
          <span className="text-cream/60">Feito para leitores, por leitores.</span>
        </div>
      </footer>

      <BookDrawer book={selectedBook} open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
