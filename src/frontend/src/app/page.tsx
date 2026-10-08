const modules = ["E-mail inteligente", "Financeiro", "Monitoração", "Projetos"];
export default function Home() {
  return <main>
    <header><p className="eyebrow">PRJ Plataforma Gestor</p><h1>Visão gerencial centralizada</h1><p>Shell inicial do produto. Dados reais serão exibidos somente após integrações e permissões aprovadas.</p></header>
    <section aria-labelledby="modules-title"><h2 id="modules-title">Módulos</h2><div className="grid">{modules.map((module) => <article key={module}><h3>{module}</h3><p>Em preparação</p></article>)}</div></section>
    <section className="status" aria-label="Estado das integrações"><strong>Integrações:</strong> não configuradas <span>Última sincronização: não disponível</span></section>
  </main>;
}
