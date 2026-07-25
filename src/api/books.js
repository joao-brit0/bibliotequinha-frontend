// -----------------------------------------------------------------------------
// Camada de acesso a dados dos livros.
//
// Quando o backend estiver pronto, defina a variável de ambiente VITE_API_URL
// (arquivo .env na raiz do projeto) apontando para a sua API, por exemplo:
//   VITE_API_URL=https://api.suabiblioteca.com
//
// Endpoints esperados (ajuste conforme sua API real):
//   GET  /books                 -> lista de livros (aceita ?category=)
//   GET  /books/popular         -> livros em destaque
//   GET  /books/recommended     -> recomendados para o usuário
//   GET  /books/:id             -> detalhes de um livro
//   GET  /categories            -> lista de categorias disponíveis
//
// Enquanto a API real não existir (ou estiver fora do ar), as funções abaixo
// caem automaticamente para os dados de exemplo (MOCK_BOOKS), então o projeto
// funciona sozinho, sem configuração nenhuma.
// -----------------------------------------------------------------------------

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const CATEGORIES = [
  { id: 'all', label: 'Tudo' },
  { id: 'ebooks', label: 'E-books' },
  { id: 'audiobooks', label: 'Audiolivros' },
  { id: 'magazines', label: 'Revistas' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'comics', label: 'Quadrinhos' },
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

/** Lista livros, opcionalmente filtrando por categoria. */
export async function fetchBooks(category = 'all') {
  const list = await safeFetch(
    `/books${category !== 'all' ? `?category=${category}` : ''}`,
    MOCK_BOOKS
  );
  if (category === 'all') return list;
  return list.filter((b) => b.category === category);
}

/** Livros em destaque na home. */
export async function fetchPopularBooks() {
  return safeFetch('/books/popular', MOCK_BOOKS.filter((b) => b.category === 'ebooks'));
}

/** Recomendações (audiolivros, no layout atual). */
export async function fetchRecommendedBooks() {
  return safeFetch(
    '/books/recommended',
    MOCK_BOOKS.filter((b) => b.category === 'audiobooks')
  );
}

/** Detalhe de um único livro pelo id. */
export async function fetchBookById(id) {
  return safeFetch(`/books/${id}`, MOCK_BOOKS.find((b) => b.id === id) ?? null);
}
