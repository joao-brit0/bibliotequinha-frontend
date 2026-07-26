import { useMemo, useState } from 'react';
import { Upload, Search } from 'lucide-react';

const INITIAL_FORM_STATE = {
  title: '',
  publisher_id: '',
  theme_id: '',
  isbn: '',
  authors: '',
  subtitle: '',
  publication_year: '',
  quantity: '1',
  number_of_pages: '',
  cutter_code: '',
  description: '',
};

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function normalizeNumber(value, fallback = null) {
  if (value === '') return fallback;
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function createFormData(formState, coverImage, authorSelected) {
  const formData = new FormData();

  formData.append('title', formState.title.trim());
  formData.append('publisher_id', formState.publisher_id);
  formData.append('theme_id', formState.theme_id);
  formData.append('isbn', formState.isbn.trim());
  
  if (formState.subtitle.trim()) formData.append('subtitle', formState.subtitle.trim());
  if (formState.publication_year) formData.append('publication_year', formState.publication_year);
  if (formState.quantity) formData.append('quantity', formState.quantity);
  if (formState.number_of_pages) formData.append('number_of_pages', formState.number_of_pages);
  if (formState.cutter_code.trim()) formData.append('cutter_code', formState.cutter_code.trim());
  if (formState.description.trim()) formData.append('description', formState.description.trim());
  
  formData.append('cover_image', coverImage);

  authorSelected.forEach((author) => {
    formData.append('authors[]', String(author.id));
  });

  return formData;
}

function Field({ label, hint, children }) {
  return (
    <label className="block text-sm font-semibold text-ink">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {hint ? <span className="text-xs font-medium text-ink/50">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

function baseControlClassName() {
  return 'mt-2 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 text-sm shadow-brutalSm outline-none transition-all placeholder:text-ink/35 focus:shadow-brutalHover focus:translate-x-px focus:translate-y-px';
}

export default function AdminBookForm({ onSubmit }) {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [coverImage, setCoverImage] = useState(null);
  const [authorQuery, setAuthorQuery] = useState('');
  const [authorSearchResults, setAuthorSearchResults] = useState([]);
  const [authorSelected, setAuthorSelected] = useState([]);
  const [hasSearchedAuthors, setHasSearchedAuthors] = useState(false);

  const coverImageLabel = useMemo(() => {
    if (!coverImage) return 'Nenhum arquivo selecionado';
    return coverImage.name;
  }, [coverImage]);

  function selectAuthor(authorId, authorName) {
    setAuthorSelected((currentSelected) => {
      if (currentSelected.some((author) => String(author.id) === String(authorId))) {
        return currentSelected;
      }

      return [...currentSelected, { id: authorId, name: authorName }];
    });

    setAuthorSearchResults([]);
    setAuthorQuery('');
    setHasSearchedAuthors(false);
  }

  function removeAuthor(authorId) {
    setAuthorSelected((currentSelected) =>
      currentSelected.filter((author) => String(author.id) !== String(authorId))
    );
  }

  function updateField(name, value) {
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  async function authorSearch(query) {
    const trimmedQuery = query.trim();
    setHasSearchedAuthors(true);

    if (!trimmedQuery) {
      setAuthorSearchResults([]);
      return [];
    }

    const response = await fetch(`${API_BASE}/authors?q=${encodeURIComponent(trimmedQuery)}`);
    const data = await response.json();
    setAuthorSearchResults(data.data ?? []);
    return data;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formState.title || !formState.publisher_id || !formState.theme_id || !formState.isbn || authorSelected.length === 0) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!coverImage) {
      alert("A imagem da capa é obrigatória.");
      return;
    }

    const formData = createFormData(formState, coverImage, authorSelected);

    try {
      const response = await fetch(`${API_BASE}/books`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erros de validação:", data.errors);
        alert("Erro ao cadastrar.");
        return;
      }

      onSubmit?.(data);
      
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Falha ao conectar com o servidor.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-panel border-3 border-ink rounded-2xl shadow-brutal p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm tracking-wide">DADOS PRINCIPAIS</p>
            <p className="text-sm text-ink/70">Preencha os campos obrigatórios do cadastro.</p>
          </div>
          <p className="text-xs font-medium text-ink/60">Campos com número devem receber IDs válidos.</p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Field label="Título">
            <input
              value={formState.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="Ex.: O Grande Gatsby"
              className={baseControlClassName()}
              required
            />
          </Field>

          <Field label="Subtítulo" hint="Opcional">
            <input
              value={formState.subtitle}
              onChange={(event) => updateField('subtitle', event.target.value)}
              placeholder="Ex.: Uma edição comentada"
              className={baseControlClassName()}
            />
          </Field>

          <Field label="Autores">
            <p className="text-sm text-ink/70">Digite o nome do autor e pesquise.</p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={authorQuery}
                onChange={(event) => setAuthorQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    authorSearch(authorQuery);
                  }
                }}
                placeholder="Ex.: John Doe"
                className={baseControlClassName()}
              />
              <button
                type="button"
                className="mt-2 inline-flex shrink-0 items-center gap-2 rounded-lg border-3 border-ink bg-panel px-4 py-3 text-sm font-semibold shadow-brutalSm transition-all hover:shadow-brutalHover hover:translate-x-px hover:translate-y-px"
                onClick={() => authorSearch(authorQuery)}
              >
                <Search className="inline-block w-4 h-4" />
                Buscar
              </button>
            </div>
            {hasSearchedAuthors && authorSearchResults.length > 0 ? (
              <ul className="mt-2 space-y-1 bg-amber-50 border-2 border-amber-200 rounded-lg p-2 max-h-32 overflow-y-auto">
                {authorSearchResults.map((author) => (
                  <li
                    key={author.id}
                    className="text-sm text-ink/70 cursor-pointer hover:underline"
                    onClick={() => selectAuthor(author.id, author.name)}
                  >
                    {author.name}
                  </li>
                ))}
              </ul>
            ) : null}
            {authorSelected.length > 0 ? (
              <div className="mt-4">
                <p className="text-sm text-ink/70">Autores selecionados:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {authorSelected.map((author) => (
                    <button
                      key={author.id}
                      type="button"
                      onClick={() => removeAuthor(author.id)}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-orange-brand px-3 py-1 text-xs font-semibold shadow-brutalSm transition-all hover:shadow-brutalHover"
                      title="Remover autor"
                    >
                      <span>{author.name}</span>
                      <span aria-hidden="true">×</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <p className="mt-2 text-xs text-ink/50">
              Os autores selecionados serão enviados como IDs no cadastro do livro.
            </p>
          </Field>

          <Field label="Descrição" hint="Opcional">
            <textarea
              value={formState.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Resumo curto do livro"
              className={`${baseControlClassName()} min-h-32 resize-y`}
            />
          </Field>
        </div>
      </section>

      <section className="bg-panel border-3 border-ink rounded-2xl shadow-brutal p-5 sm:p-6">
        <div>
          <p className="font-display text-sm tracking-wide">IDENTIFICAÇÃO</p>
          <p className="text-sm text-ink/70">Informe os IDs e códigos usados pelo backend.</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Publisher ID">
            <input
              type="number"
              min="1"
              value={formState.publisher_id}
              onChange={(event) => updateField('publisher_id', event.target.value)}
              placeholder="1"
              className={baseControlClassName()}
              required
            />
          </Field>

          <Field label="Theme ID">
            <input
              type="number"
              min="1"
              value={formState.theme_id}
              onChange={(event) => updateField('theme_id', event.target.value)}
              placeholder="3"
              className={baseControlClassName()}
              required
            />
          </Field>

          <Field label="ISBN">
            <input
              value={formState.isbn}
              onChange={(event) => updateField('isbn', event.target.value)}
              placeholder="978-0-00-000000-0"
              className={baseControlClassName()}
              required
            />
          </Field>

          <Field label="Cutter code" hint="Opcional">
            <input
              value={formState.cutter_code}
              onChange={(event) => updateField('cutter_code', event.target.value)}
              placeholder="F 84"
              className={baseControlClassName()}
            />
          </Field>
        </div>
      </section>

      <section className="bg-panel border-3 border-ink rounded-2xl shadow-brutal p-5 sm:p-6">
        <div>
          <p className="font-display text-sm tracking-wide">PUBLICAÇÃO</p>
          <p className="text-sm text-ink/70">Dados opcionais para complementar o cadastro.</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Ano de publicação" hint="Opcional">
            <input
              type="number"
              min="0"
              value={formState.publication_year}
              onChange={(event) => updateField('publication_year', event.target.value)}
              placeholder="2026"
              className={baseControlClassName()}
            />
          </Field>

          <Field label="Quantidade">
            <input
              type="number"
              min="1"
              value={formState.quantity}
              onChange={(event) => updateField('quantity', event.target.value)}
              placeholder="1"
              className={baseControlClassName()}
            />
          </Field>

          <Field label="Número de páginas" hint="Opcional">
            <input
              type="number"
              min="1"
              value={formState.number_of_pages}
              onChange={(event) => updateField('number_of_pages', event.target.value)}
              placeholder="320"
              className={baseControlClassName()}
            />
          </Field>
        </div>
      </section>

      <section className="bg-panel border-3 border-ink rounded-2xl shadow-brutal p-5 sm:p-6">
        <div>
          <p className="font-display text-sm tracking-wide">CAPA</p>
          <p className="text-sm text-ink/70">Envie a imagem da capa para completar o cadastro.</p>
        </div>

        <div className="mt-5 rounded-xl border-3 border-dashed border-ink/40 bg-cream p-4 sm:p-5">
          <Field label="Arquivo da capa" hint="Obrigatório">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setCoverImage(event.target.files?.[0] ?? null)}
              className="mt-2 block w-full text-sm text-ink file:mr-4 file:rounded-lg file:border-3 file:border-ink file:bg-orange-brand file:px-4 file:py-2 file:font-display file:text-xs file:tracking-wide file:shadow-brutalSm file:transition-all hover:file:shadow-brutalHover"
              required
            />
          </Field>

          <p className="mt-3 text-xs text-ink/60">Selecionado: {coverImageLabel}</p>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/70">
          Em caso de dúvidas para cadastro de um novo livro, consulte a guia de instruções.
        </p>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg border-3 border-ink bg-orange-brand px-6 py-3 font-display text-xs tracking-wide shadow-brutalSm transition-all hover:shadow-brutalHover hover:translate-x-px hover:translate-y-px"
        >
          <Upload size={14} strokeWidth={2.5} />
          CADASTRAR LIVRO
        </button>
      </div>
    </form>
  );
}