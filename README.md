# Biblioteca Comunitária

Projeto React + Tailwind com estilo "neobrutalista" (bordas grossas pretas,
sombras sólidas deslocadas, paleta creme / amarelo / laranja), inspirado na
referência visual enviada.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Estrutura

```
src/
  api/books.js          -> camada de dados (mock + pronta para API real)
  components/
    Navbar.jsx           -> menu superior (Início / Sobre nós / Entrar)
    Hero.jsx              -> busca + filtros de categoria
    BookGrid.jsx           -> grade de livros com estado de carregamento
    BookCard.jsx            -> card individual de livro
    BookDrawer.jsx           -> painel lateral ("popup") que desliza da direita
    About.jsx                 -> seção sobre nós
  App.jsx                       -> composição da página e estado global
```

## Conectando a uma API real

Toda a leitura de dados passa por `src/api/books.js`. Crie um arquivo `.env`
na raiz do projeto:

```
VITE_API_URL=https://sua-api.com
```

E implemente no seu backend as rotas:

- `GET /books` (aceita `?category=`)
- `GET /books/popular`
- `GET /books/recommended`
- `GET /books/:id`

Enquanto essas rotas não existirem (ou estiverem fora do ar), o app usa os
dados de exemplo definidos em `MOCK_BOOKS` automaticamente — nenhuma
configuração extra é necessária para rodar o projeto localmente.

## Painel lateral (popup)

Ao clicar em qualquer livro, um painel desliza da direita para a esquerda
(`BookDrawer.jsx`), sem ocupar a tela toda, mostrando detalhes do título,
narrador (quando houver), ações de empréstimo/amostra e metadados —
sem avaliações por estrelas nem preços, conforme pedido.
