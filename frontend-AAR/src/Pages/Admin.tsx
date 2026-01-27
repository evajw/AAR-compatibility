import '../Styles/role-pages.css'

type AdminPageProps = {
  onLogout: () => void
}

const ADMIN_CARDS = [
  {
    title: 'Gebruikersbeheer',
    body: 'Beheer toegang, rollen en teamindeling.',
  },
  {
    title: 'Compliance checks',
    body: 'Volg audits en documenteer beslissingen.',
  },
  {
    title: 'Rapportage',
    body: 'Analyseer trends en workflowprestaties.',
  },
]

export default function AdminPage({ onLogout }: AdminPageProps) {
  return (
    <div className="role-page">
      <header className="role-page__header">
        <div>
          <span className="role-pill">Admin</span>
          <h1 className="role-page__title">Admin omgeving</h1>
          <p className="muted">Centraal beheer van teams, rechten en rapportages.</p>
        </div>
        <button className="btn ghost" type="button" onClick={onLogout}>
          Uitloggen
        </button>
      </header>

      <section className="role-card role-summary">
        <div>
          <h2>Vandaag</h2>
          <p className="muted">
            Focus op toegangsaanvragen en afronding van lopende audits.
          </p>
        </div>
        <div className="role-summary__stats">
          <div>
            <span className="role-summary__label">Open tickets</span>
            <strong>7</strong>
          </div>
          <div>
            <span className="role-summary__label">Nieuwe aanvragen</span>
            <strong>3</strong>
          </div>
          <div>
            <span className="role-summary__label">Pending audits</span>
            <strong>2</strong>
          </div>
        </div>
      </section>

      <section className="role-card">
        <h2>Snelle acties</h2>
        <div className="role-card-grid">
          {ADMIN_CARDS.map((card) => (
            <article key={card.title} className="role-tile">
              <h3>{card.title}</h3>
              <p className="muted">{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
