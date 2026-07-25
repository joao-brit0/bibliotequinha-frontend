export default function About() {
  return (
    <section id="sobre" className="border-t-3 border-ink bg-panel">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-display text-2xl mb-3">Sobre nós</h2>
          <p className="text-ink/80 leading-relaxed">
            A Biblioteca Comunitária é um acervo colaborativo mantido por leitores para
            leitores. E-books, audiolivros, revistas e quadrinhos ficam disponíveis
            gratuitamente para toda a comunidade, sem fila de preço e sem barreiras: só o
            prazer de ler e compartilhar.
          </p>
        </div>
        <div className="rounded-xl border-3 border-ink bg-yellow-brand shadow-brutal p-6">
          <p className="font-display text-sm mb-2">COMO FUNCIONA</p>
          <ul className="space-y-2 text-sm font-medium">
            <li>→ Empréstimos gratuitos por 30 dias</li>
            <li>→ Acervo mantido pela própria comunidade</li>
            <li>→ Sem custos, sem anúncios, sem pegadinhas</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
