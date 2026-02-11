import { useState, type FormEvent } from 'react'
import Header from '../Components/Layout/Header'
import Footer from '../Components/Layout/Footer'
import AdminPage from './Admin'
import EngineerPage from './Engineer'
import PlannerPage from './Planner'
import PictureAAR from '../Assets/Picture AAR.jpg'
import '../Styles/login.css'

type Role = 'admin' | 'engineer' | 'planner'
type Step = 'select' | 'login' | 'dashboard'

const ROLE_OPTIONS: Array<{ key: Role; title: string }> = [
  { key: 'admin', title: 'Admin' },
  { key: 'engineer', title: 'SRD Holder' },
  { key: 'planner', title: 'Viewer' },
]

const ROLE_DETAILS: Record<
  Role,
  { label: string; intro: string; highlight: string; quick: string }
> = {
  admin: {
    label: 'Admin',
    intro: 'Je krijgt toegang tot beheer en rapportages.',
    highlight: 'Verifieer je account om verder te gaan.',
    quick: 'Prioriteer accounts, rollen en audits.',
  },
  engineer: {
    label: 'SRD Holder',
    intro: 'Je krijgt toegang tot technische flows en tooling.',
    highlight: 'Log in om je workbench te openen.',
    quick: "Werk aan tickets, risico's en releases.",
  },
  planner: {
    label: 'Vieuwer',
    intro: 'Je hebt directe toegang tot de planning.',
    highlight: 'Geen login nodig voor planners.',
    quick: 'Start direct met inplannen.',
  },
}

type LoginCredentials = {
  username: string
  password: string
  role: Role
}

type AuthResult = { ok: boolean; message?: string }

const DEMO_ACCOUNTS: Record<Role, { username: string; password: string } | null> =
  {
    admin: { username: 'admin', password: '12345' },
    engineer: { username: 'engineer', password: '12345' },
    planner: null,
  }

// Controleert of demo-gegevens overeenkomen met de geselecteerde rol.
function isDemoMatch(credentials: LoginCredentials) {
  const demo = DEMO_ACCOUNTS[credentials.role]
  if (!demo) return false
  return (
    credentials.username === demo.username &&
    credentials.password === demo.password
  )
}

// Authenticeer een gebruiker (placeholder voor DB/API-koppeling).
async function authenticateUser(credentials: LoginCredentials): Promise<AuthResult> {
  // TODO: vervang dit met een API call zodra de database beschikbaar is.
  // Bijvoorbeeld: return fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
  if (!isDemoMatch(credentials)) {
    return { ok: false, message: 'Onjuiste demo-gegevens.' }
  }
  return { ok: true }
}

// Login scherm met rolkeuze en doorstuur naar de juiste omgeving.
export default function Login() {
  const [step, setStep] = useState<Step>('select')
  const [activeRole, setActiveRole] = useState<Role | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Kiest een rol en bepaalt of er eerst ingelogd moet worden.
  const handleRoleSelect = (role: Role) => {
    setActiveRole(role)
    setLoginError('')
    if (role === 'planner') {
      setStep('dashboard')
    } else {
      setStep('login')
    }
  }

  // Herstelt het scherm naar de startstatus.
  const handleReset = () => {
    setStep('select')
    setActiveRole(null)
    setUsername('')
    setPassword('')
    setLoginError('')
  }

  // Verwerkt de login en is het haakpunt voor DB-authenticatie.
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!activeRole) return
    setLoginError('')
    const result = await authenticateUser({
      username,
      password,
      role: activeRole,
    })
    if (!result.ok) {
      setLoginError(result.message ?? 'Inloggen mislukt.')
      return
    }
    setStep('dashboard')
  }

  const currentRole = activeRole ? ROLE_DETAILS[activeRole] : null
  const showRolePage = step === 'dashboard' && activeRole !== null
  const demoAccount = activeRole ? DEMO_ACCOUNTS[activeRole] : null

  return (
    <div className="login-shell">
      <Header />
      <main className={showRolePage ? 'role-main' : 'login-main'}>
        {showRolePage ? (
          activeRole === 'admin' ? (
            <AdminPage onLogout={handleReset} />
          ) : activeRole === 'engineer' ? (
            <EngineerPage onLogout={handleReset} />
          ) : (
            <PlannerPage onLogout={handleReset} />
          )
        ) : (
          <section className="login-card" aria-live="polite">
            {step === 'select' && (
              <div className="step-panel">
                <div className="role-grid">
                  {ROLE_OPTIONS.map((role) => (
                    <button
                      key={role.key}
                      className="role-button"
                      data-role={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role.key)}
                    >
                      <span className="role-title">{role.title}</span>
                    </button>
                  ))}
                </div>
                <div className="login-image" aria-hidden="true">
                  <img src={PictureAAR} alt="" />
                </div>
              </div>
            )}

            {step === 'login' && currentRole && (
              <div className="step-panel">
                <div className="step-top">
                  <div>
                    <span className="role-pill">{currentRole.label}</span>
                    <h2>Inloggen als {currentRole.label}</h2>
                    <p className="muted">{currentRole.highlight}</p>
                  </div>
                  <button className="btn ghost" type="button" onClick={handleReset}>
                    Andere rol
                  </button>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                  <label className="input-group">
                    Gebruikersnaam
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="naam@bedrijf.nl"
                      autoComplete="username"
                      required
                    />
                  </label>
                  <label className="input-group">
                    Wachtwoord
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="********"
                      autoComplete="current-password"
                      required
                    />
                  </label>
                  {loginError && <p className="login-error">{loginError}</p>}
                  <div className="form-footer">
                    <span className="muted">
                      Demo {currentRole.label}:{' '}
                      <strong>{demoAccount?.username}</strong> /{' '}
                      <strong>{demoAccount?.password}</strong>
                    </span>
                    <div className="button-row">
                      <button className="btn ghost" type="button" onClick={handleReset}>
                        Annuleren
                      </button>
                      <button className="btn primary" type="submit">
                        Inloggen
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
