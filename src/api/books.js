// -----------------------------------------------------------------------------
// Camada de acesso a dados dos livros.
//
// Quando o backend estiver pronto, defina a variável de ambiente VITE_API_URL
// (arquivo .env na raiz do projeto) apontando para a sua API, por exemplo:
//   VITE_API_URL=https://api.suabiblioteca.com
//
// Endpoints esperados (ajuste conforme sua API real):
//   GET  /books                  -> lista de livros (aceita ?per_page= e ?page=)
//   GET  /books/themes/{themeId}  -> livros filtrados por tema
//   GET  /books/:id              -> detalhes de um livro
//
// Enquanto a API real não existir (ou estiver fora do ar), as funções abaixo
// caem automaticamente para os dados de exemplo (MOCK_BOOKS), então o projeto
// funciona sozinho, sem configuração nenhuma.
// -----------------------------------------------------------------------------

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const THEME_FILTERS = [
  { id: 'all', label: 'Tudo' },
  { id: '1', label: 'Romance' },
  { id: '2', label: 'Comédia' },
  { id: '3', label: 'Terror' },
  { id: '4', label: 'Aventura' },
  { id: '5', label: 'Fantasia' },
  { id: '6', label: 'Suspense' },
  { id: '7', label: 'Drama' },
  { id: '8', label: 'Ficção Científica' },
  { id: '9', label: 'História' },
  { id: '10', label: 'Infantil' },
];

const FALLBACK_COVER_PALETTES = [
  { from: '#F4A340', to: '#D9702B' },
  { from: '#7FA66B', to: '#4C6E3C' },
  { from: '#E4C77A', to: '#B99A3F' },
  { from: '#C9CBD1', to: '#8C8E96' },
  { from: '#2E2A28', to: '#141210' },
  { from: '#EADFC8', to: '#C9B98D' },
  { from: '#8A2E2E', to: '#4E1414' },
  { from: '#2F3E6A', to: '#161E38' },
];

export const MOCK_BOOKS = [
  {
    id: 'gatsby',
    title: 'O Grande Gatsby',
    author: 'F. Scott Fitzgerald',
    narrator: null,
    category: 'ebooks',
    format: 'E-book',
    length: '218 páginas',
    added: '12 mar 2024',
    cover: { from: '#F4A340', to: '#D9702B', initial: 'G' },
    description:
      'Um clássico sobre a Era do Jazz nos Estados Unidos, contado pelo narrador Nick Carraway, vizinho do misterioso milionário Jay Gatsby.',
  },
  {
    id: 'cem-anos',
    title: 'Cem Anos de Solidão',
    author: 'Gabriel García Márquez',
    narrator: null,
    category: 'ebooks',
    format: 'E-book',
    length: '432 páginas',
    added: '02 jan 2024',
    cover: { from: '#7FA66B', to: '#4C6E3C', initial: 'C' },
    description:
      'A saga da família Buendía na cidade fictícia de Macondo, um dos maiores marcos do realismo mágico latino-americano.',
  },
  {
    id: 'mockingbird',
    title: 'O Sol é Para Todos',
    author: 'Harper Lee',
    narrator: null,
    category: 'ebooks',
    format: 'E-book',
    length: '336 páginas',
    added: '19 fev 2024',
    cover: { from: '#E4C77A', to: '#B99A3F', initial: 'S' },
    description:
      'Através dos olhos de Scout Finch, a história acompanha o julgamento de um homem negro injustamente acusado no sul dos Estados Unidos.',
  },
  {
    id: 'servidao-humana',
    title: 'Servidão Humana',
    author: 'William Somerset Maugham',
    narrator: null,
    category: 'ebooks',
    format: 'E-book',
    length: '712 páginas',
    added: '30 nov 2023',
    cover: { from: '#C9CBD1', to: '#8C8E96', initial: 'S' },
    description:
      'Romance semiautobiográfico que acompanha Philip Carey em sua busca por liberdade, amor e propósito.',
  },
  {
    id: 'amanhecer',
    title: 'Amanhecer (Crepúsculo #4)',
    author: 'Stephenie Meyer',
    narrator: null,
    category: 'ebooks',
    format: 'E-book',
    length: '768 páginas',
    added: '05 abr 2024',
    cover: { from: '#2E2A28', to: '#141210', initial: 'A' },
    description:
      'O capítulo final da saga Crepúsculo, marcando o casamento de Bella e Edward e o nascimento de sua filha.',
  },
  {
    id: 'ano-no-exterior',
    title: 'Meu Ano no Exterior',
    author: 'Chang-rae Lee',
    narrator: 'Feodor Chin',
    category: 'audiobooks',
    format: 'Audiolivro',
    length: '11h 20min',
    added: '22 mai 2024',
    cover: { from: '#EADFC8', to: '#C9B98D', initial: 'M' },
    description:
      'Um jovem coreano-americano se envolve com um misterioso empresário chinês em uma narrativa sobre identidade e pertencimento.',
  },
  {
    id: 'quadribol',
    title: 'Quadribol Através dos Séculos',
    author: 'J.K. Rowling',
    narrator: 'Andrew Lincoln',
    category: 'audiobooks',
    format: 'Audiolivro',
    length: '2h 10min',
    added: '14 jun 2024',
    cover: { from: '#8A2E2E', to: '#4E1414', initial: 'Q' },
    description:
      'A história completa do esporte mais popular do mundo bruxo, de suas origens às regras oficiais atuais.',
  },
  {
    id: 'gatsby-audio',
    title: 'O Grande Gatsby',
    author: 'F. Scott Fitzgerald',
    narrator: 'Jake Gyllenhaal',
    category: 'audiobooks',
    format: 'Audiolivro',
    length: '4h 49min',
    added: '01 jul 2024',
    cover: { from: '#F4A340', to: '#D9702B', initial: 'G' },
    description:
      'A versão narrada do clássico americano, com interpretação aclamada pela crítica.',
  },
  {
    id: 'harry-potter-pedra',
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    narrator: 'Jim Dale',
    category: 'audiobooks',
    format: 'Audiolivro',
    length: '22h 56min',
    added: '24 abr 2024',
    cover: { from: '#2F3E6A', to: '#161E38', initial: 'H' },
    description:
      'Fãs de longa data do audiolivro de Harry Potter costumam debater as diferenças entre as narrações de Dale e Fry. Ambos têm seus méritos: da forma como Dale dá voz a Draco e a Voldemort, cada personagem ganha vida própria e uma identidade sonora marcante que acompanhou gerações de ouvintes ao redor do mundo.',
  },
];

function hashValue(value = '') {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function getBookCoverPalette(seed) {
  return FALLBACK_COVER_PALETTES[hashValue(String(seed)) % FALLBACK_COVER_PALETTES.length];
}

function extractBookArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.books)) return payload.books;

  if (payload && typeof payload === 'object') {
    const nestedCandidates = [payload.data, payload.books, payload.items, payload.results];

    for (const candidate of nestedCandidates) {
      const books = extractBookArray(candidate);
      if (books.length > 0) return books;
    }

    const values = Object.values(payload);
    if (values.length > 0) {
      for (const value of values) {
        const books = extractBookArray(value);
        if (books.length > 0) return books;
      }
    }
  }

  return [];
}

export function normalizeBook(rawBook) {
  if (!rawBook) return null;

  const authors = Array.isArray(rawBook.authors) ? rawBook.authors : [];
  const authorNames = authors
    .map((author) => (typeof author === 'string' ? author : author?.name))
    .filter(Boolean);

  const publisherId = rawBook.publisher_id ?? rawBook.publisher?.id ?? null;
  const publisherName = rawBook.publisher?.name ?? rawBook.publisher_name ?? null;

  const themeId = rawBook.theme_id ?? rawBook.theme?.id ?? rawBook.category ?? null;
  const themeName = rawBook.theme?.name ?? rawBook.theme_name ?? rawBook.category ?? null;

  const title = rawBook.title ?? '';
  const coverImage = rawBook.cover_url ?? rawBook.coverImage ?? null;
  const coverPalette = rawBook.cover
    ? rawBook.cover
    : getBookCoverPalette(title || themeName || publisherName || String(themeId ?? 'book'));

  return {
    ...rawBook,
    title,
    subtitle: rawBook.subtitle ?? null,
    coverImage,
    coverPalette,
    coverInitial: (title.trim().charAt(0) || '?').toUpperCase(),
    publicationYear: rawBook.publication_year ?? rawBook.publicationYear ?? null,
    publisherId,
    publisher: rawBook.publisher ?? (publisherId != null ? { id: publisherId, name: publisherName } : null),
    publisherLabel: publisherName || 'Sem editora',
    themeId,
    theme: rawBook.theme ?? (themeId != null ? { id: themeId, name: themeName } : null),
    themeLabel: themeName || 'Sem tema',
    isbn: rawBook.isbn ?? '',
    quantity: rawBook.quantity ?? 1,
    numberOfPages: rawBook.number_of_pages ?? rawBook.numberOfPages ?? null,
    cutterCode: rawBook.cutter_code ?? rawBook.cutterCode ?? null,
    description: rawBook.description ?? null,
    authors,
    authorNames,
    authorsLabel: authorNames.join(', ') || 'Sem autor informado',
    createdAt: rawBook.created_at ?? rawBook.createdAt ?? null,
    updatedAt: rawBook.updated_at ?? rawBook.updatedAt ?? null,
  };
}

export function normalizeBooks(payload) {
  return extractBookArray(payload).map(normalizeBook).filter(Boolean);
}

async function safeFetch(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`Erro ${res.status} ao buscar ${path}`);
    return await res.json();
  } catch (err) {
    // Sem backend configurado ainda (ou API fora do ar): usa dados de exemplo.
    console.warn(`[api/books] usando dados de exemplo para "${path}":`, err.message);
    return fallback;
  }
}

/** Lista livros, aceitando paginação via per_page/page. */
export async function fetchBooks({ perPage, page } = {}) {
  const params = new URLSearchParams();

  if (perPage != null) params.set('per_page', String(perPage));
  if (page != null) params.set('page', String(page));

  const payload = await safeFetch(`/books${params.toString() ? `?${params.toString()}` : ''}`, MOCK_BOOKS);
  return normalizeBooks(payload);
}

/** Lista livros filtrando por tema na rota dedicada. */
export async function fetchBooksByTheme(themeId, { perPage, page } = {}) {
  const params = new URLSearchParams();

  if (perPage != null) params.set('per_page', String(perPage));
  if (page != null) params.set('page', String(page));

  const query = params.toString();
  const payload = await safeFetch(
    `/books/theme/${themeId}${query ? `?${query}` : ''}`,
    MOCK_BOOKS.filter((book) => String(book.theme_id ?? book.category ?? '') === String(themeId))
  );
  return normalizeBooks(payload);
}

/** Detalhe de um único livro pelo id. */
export async function fetchBookById(id) {
  const payload = await safeFetch(
    `/books/${id}`,
    MOCK_BOOKS.find((book) => String(book.id) === String(id)) ?? null
  );
  return normalizeBook(payload);
}
