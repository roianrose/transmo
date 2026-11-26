import { useState } from 'react'

type IconName = 'metro' | 'ruta' | 'tren' | 'brt'

function BusIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="11" y="8" width="42" height="43" rx="7" stroke="currentColor" strokeWidth="5" />
      <path d="M14 27h36M23 51v5M41 51v5M15 51h34M21 34v8M32 34v8M43 34v8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

function TransportIcon({ type }: { type: IconName }) {
  const common = { viewBox: '0 0 72 72', fill: 'none', 'aria-hidden': true as const }
  if (type === 'ruta') return (
    <svg {...common}><rect x="14" y="12" width="44" height="41" rx="8" stroke="currentColor" strokeWidth="5"/><path d="M16 29h40M24 58v5M48 58v5M21 53h30M24 38v7M38 38v7M51 38v7" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  )
  if (type === 'metro') return (
    <svg {...common}><rect x="15" y="8" width="42" height="43" rx="8" stroke="currentColor" strokeWidth="5"/><path d="M17 29h38M25 16v8M47 16v8M23 53l-8 10M49 53l8 10M27 40v6M45 40v6M15 51h42" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  )
  if (type === 'tren') return (
    <svg {...common}><rect x="17" y="10" width="38" height="42" rx="8" stroke="currentColor" strokeWidth="5"/><path d="M19 30h34M36 10V5M30 5h12M24 52l-5 9M48 52l5 9M26 38v5M46 38v5M20 47h32" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  )
  return (
    <svg {...common}><rect x="15" y="12" width="42" height="41" rx="8" stroke="currentColor" strokeWidth="5"/><path d="M17 29h38M24 58v5M48 58v5M21 53h30M24 38v7M36 38v7M48 38v7" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
  )
}

function TrainIllustration() {
  return (
    <svg className="train" viewBox="0 0 520 150" role="img" aria-label="Tren">
      <g fill="none" stroke="#4a3928" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 38h450M125 38v74M250 38v74M390 38v74M98 38l28 28M225 38l28 28M365 38l28 28" strokeWidth="5" />
        <path d="M82 113h356M78 123h364" strokeWidth="6" />
        <path d="M75 96l36-28h277l52 28" strokeWidth="8" />
        <path d="M69 106h385" strokeWidth="8" />
        <g fill="#f8f3ec" stroke="#4a3928" strokeWidth="7">
          <rect x="105" y="73" width="64" height="31" rx="7"/><rect x="174" y="73" width="66" height="31" rx="7"/><rect x="245" y="73" width="66" height="31" rx="7"/><rect x="316" y="73" width="66" height="31" rx="7"/><path d="M382 73h34l30 32h-30z"/>
        </g>
        <path d="M112 104v10M146 104v10M181 104v10M216 104v10M252 104v10M287 104v10M323 104v10M358 104v10" strokeWidth="7"/>
      </g>
    </svg>
  )
}

function SearchIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="21" cy="21" r="12" stroke="currentColor" strokeWidth="4"/><path d="M30 30l10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
}

function NavIcon({ name }: { name: 'inicio' | 'rutas' | 'wallet' | 'usuario' }) {
  if (name === 'rutas') return <SearchIcon />
  if (name === 'inicio') return <BusIcon />
  if (name === 'wallet') return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 15h29a5 5 0 015 5v15H14a7 7 0 010-14h28" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M35 27h7" stroke="currentColor" strokeWidth="4"/></svg>
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="15" r="8" stroke="currentColor" strokeWidth="4"/><path d="M8 42c2-10 8-15 16-15s14 5 16 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
}

export default function App() {
  const [publicMode, setPublicMode] = useState(true)
  const [selected, setSelected] = useState<IconName>('ruta')

  return (
    <div className="app-shell">
      <main className="home">
        <header className="top-status" aria-label="Estado del dispositivo">
          <span className="time">2:21</span>
          <div className="status-island" />
          <div className="status-icons"><span className="wifi">⌁</span><span className="battery" /></div>
        </header>

        <section className="welcome">
          <h1>Hola, Angel</h1>
          <p>Saldo disponible</p>
          <div className="balance-row">
            <strong>$0.00</strong><span>MXN</span>
            <button className="add-button" aria-label="Agregar saldo">+</button>
          </div>
        </section>

        <div className="mode-switch" role="tablist" aria-label="Tipo de transporte">
          <button className={publicMode ? 'active' : ''} onClick={() => setPublicMode(true)} role="tab" aria-selected={publicMode}><BusIcon />Red pública</button>
          <button className={!publicMode ? 'active' : ''} onClick={() => setPublicMode(false)} role="tab" aria-selected={!publicMode}><svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="12" y="23" width="40" height="28" rx="5" stroke="currentColor" strokeWidth="5"/><path d="M19 23l5-10h16l5 10M20 51v5M44 51v5M23 38h1M41 38h1" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>Privado</button>
        </div>

        <section className="ticket-card">
          <TrainIllustration />
          <h2>Comprar ticket (QR)</h2>
          <div className="transport-grid">
            {(['metro', 'ruta', 'tren', 'brt'] as IconName[]).map((type) => (
              <button key={type} className={selected === type ? 'selected' : ''} onClick={() => setSelected(type)}>
                <TransportIcon type={type} />
                <span>{type === 'metro' ? 'METRO' : type.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <button className="buy-button">COMPRAR TICKET</button>
        </section>

        <div className="search-box">
          <span>Ver rutas, horarios y en tiempo real</span>
          <button aria-label="Buscar"><SearchIcon /></button>
        </div>

        <nav className="bottom-nav" aria-label="Navegación principal">
          {(['inicio', 'rutas', 'wallet', 'usuario'] as const).map((name) => (
            <button key={name} className={name === 'inicio' ? 'active' : ''}><NavIcon name={name}/><span>{name === 'wallet' ? 'WALLET' : name.toUpperCase()}</span></button>
          ))}
        </nav>
      </main>
      <div className="home-indicator" />
    </div>
  )
}
