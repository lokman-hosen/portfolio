import { portfolioSections } from '@portfolio/shared';

export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Senior Fullstack Software Engineer</p>
        <h1>Building reliable web products from database to interface.</h1>
        <p className="intro">
          This portfolio will present engineering experience, selected projects,
          technical writing, and a direct path for clients to start a
          conversation.
        </p>
      </section>

      <section className="sections" aria-label="Portfolio sections">
        {portfolioSections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
