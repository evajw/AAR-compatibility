import '../../Styles/footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__left">
      </div>
      <div className="site-footer__right">
        <span>© {new Date().getFullYear()} JAPCC</span>
        <div className="site-footer__links">
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}
