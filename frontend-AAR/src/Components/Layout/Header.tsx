import '../../Styles/header.css'

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <span className="site-header__eyebrow">JAPCC</span>
        <div>
          <span className="site-header__subtitle">Planning - Engineering - Admin</span>
        </div>
      </div>
      <nav className="site-header__nav" aria-label="Hoofdmenu">
        <a href="#" className="site-header__link">
          Overzicht
        </a>
        <a href="#" className="site-header__link">
          Support
        </a>
        <a href="#" className="site-header__link">
          Updates
        </a>
      </nav>
    </header>
  )
}
