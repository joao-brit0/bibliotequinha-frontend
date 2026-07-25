import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookGrid from './components/BookGrid';
import BookDrawer from './components/BookDrawer';
import About from './components/About';
import { fetchPopularBooks, fetchRecommendedBooks } from './api/books';
import AdminBookCreatePage from './pages/AdminBookCreatePage';

const ADMIN_NEW_BOOK_PATH = '/admin/livros/novo';

function getCurrentPathname() {
  return window.location.pathname;
}

function navigateTo(pathname) {
  window.history.pushState({}, '', pathname);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPathname);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const [popular, setPopular] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBook, setSelectedBook] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAdminRoute = pathname === ADMIN_NEW_BOOK_PATH;

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (isAdminRoute) {
      return undefined;
    }

    let cancelled = false;
    setLoading(true);

    Promise.all([fetchPopularBooks(), fetchRecommendedBooks()]).then(
      ([popularData, recommendedData]) => {
        if (cancelled) return;
        setPopular(popularData);
        setRecommended(recommendedData);
        setLoading(false);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [isAdminRoute]);

  const filterBooks = (books) =>
    books.filter((b) => {
      const matchesCategory = category === 'all' || b.category === category;
      const matchesQuery =
        !query.trim() ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

  const filteredPopular = useMemo(() => filterBooks(popular), [popular, category, query]);
  const filteredRecommended = useMemo(
    () => filterBooks(recommended),
    [recommended, category, query]
  );

  function openBook(book) {
    setSelectedBook(book);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  if (isAdminRoute) {
    return <AdminBookCreatePage onBackHome={() => navigateTo('/')} />;
  }

  return (
    <div id="top" className="min-h-screen bg-cream">
      <Navbar />
      <Hero
        activeCategory={category}
        onCategoryChange={setCategory}
        query={query}
        onQueryChange={setQuery}
      />

      <BookGrid
        title="Livros Populares"
        books={filteredPopular}
        loading={loading}
        onOpen={openBook}
      />
      <BookGrid
        title="Recomendados"
        books={filteredRecommended}
        loading={loading}
        onOpen={openBook}
      />

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
