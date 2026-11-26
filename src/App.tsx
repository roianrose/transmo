import { useState } from 'react'

function StatusBar() {
  return (
    <header className="routes-status">
      <span className="status-time">2:49</span>
      <div className="status-island">
        <svg viewBox="0 0 48 48" fill="none" aria-label="Autobús"><rect x="9" y="8" width="30" height="28" rx="5" stroke="currentColor" strokeWidth="3"/><path d="M10 19h28M15 36v5M33 36v5M15 27h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
        <div className="status-signal"><i/><i/><i/><i/></div>
      </div>
      <div className="status-right">
        <svg viewBox="0 0 48 48" fill="none"><path d="M8 18a24 24 0 0132 0M13 23a17 17 0 0122 0M19 29a8 8 0 0110 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx="24" cy="36" r="3" fill="currentColor"/></svg>
        <div className="battery"><span/></div>
      </div>
    </header>
  )
}

function ArrowLeft() {
  return <svg viewBox="0 0 48 48" fill="none"><path d="M38 24H10M23 11L10 24l13 13" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function SearchIcon() {
  return <svg viewBox="0 0 48 48" fill="none"><circle cx="21" cy="21" r="13" stroke="currentColor" strokeWidth="4"/><path d="M31 31l10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
}

function ClockIcon() {
  return <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="4"/><path d="M24 14v11l8 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
}

function CrosshairIcon() {
  return <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="4"/><circle cx="24" cy="24" r="3" fill="currentColor"/><path d="M24 6v8M24 34v8M6 24h8M34 24h8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
}

function MetroTrain({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'vehicle vehicle-small' : 'vehicle'} viewBox="0 0 260 150" fill="none" aria-hidden="true"><path d="M18 130c8-43 34-66 76-66h108c25 0 42 17 46 43l-4 23H18z" fill="#f9f7ed" stroke="#4a3928" strokeWidth="5"/><path d="M93 66h112c15 0 27 10 32 27H93z" fill="#5d4a37"/><path d="M107 72h31v21h-31zM142 72h31v21h-31zM177 72h43v21h-43z" fill="#edf1e6"/><circle cx="75" cy="130" r="24" fill="#f9f7ed"/><circle cx="75" cy="130" r="11" fill="#718b42"/><circle cx="214" cy="130" r="24" fill="#f9f7ed"/><circle cx="214" cy="130" r="11" fill="#718b42"/><path d="M22 130h16M239 130h17M21 114h38" stroke="#718b42" strokeWidth="5"/><path d="M28 130h191" stroke="#718b42" strokeWidth="5"/></svg>
}

function BusIllustration({ folded = false }: { folded?: boolean }) {
  return <svg className={folded ? 'bus bus-folded' : 'bus'} viewBox="0 0 260 150" fill="none" aria-hidden="true"><path d="M24 42c0-15 10-24 25-24h155c17 0 29 11 31 29v79H24V42z" fill="#f9f7ed" stroke="#4a3928" strokeWidth="5"/><path d="M47 29h154c9 0 16 7 18 17H47z" fill="#5d4a37"/><path d="M42 53h42v38H42zM93 53h50v38H93zM152 53h66v38h-66z" fill="#edf1e6"/><circle cx="58" cy="127" r="19" fill="#f9f7ed"/><circle cx="58" cy="127" r="8" fill="#718b42"/><circle cx="202" cy="127" r="19" fill="#f9f7ed"/><circle cx="202" cy="127" r="8" fill="#718b42"/><path d="M24 108h211M15 126h230" stroke="#718b42" strokeWidth="5"/><path d="M38 94h19" stroke="#718b42" strokeWidth="5"/></svg>
}

export default function App() {
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  return (
    <div className="routes-shell">
      <StatusBar />
      <main className="routes-main">
        <div className="title-row">
          <button className="back-button" aria-label="Volver" onClick={() => setNotice('Volver')}><ArrowLeft /></button>
          <h1>Rutas</h1>
        </div>

        <section className="map-card" aria-label="Mapa de rutas">
          <div className="map-grid"/>
          <div className="map-label label-one">MIRASUR</div>
          <div className="map-label label-two">MONTE HOREB</div>
          <div className="map-label label-three">FRACCIONAMIENTO<br/>CRUZ 40 SECTOR</div>
          <div className="map-label label-four">PASEO REAL<br/>1ER SECTOR</div>
          <div className="map-label label-five">LA DE<br/>LOS AYALA</div>
          <div className="map-label label-six">Av. Raúl Sal.</div>
          <div className="map-label label-seven">C. Abasolo</div>
          <div className="map-street street-one"><span/></div>
          <div className="map-street street-two"><span/></div>
          <div className="map-pin"><i/></div>
          <button className="location-button" aria-label="Mi ubicación" onClick={() => setNotice('Mi ubicación')}><CrosshairIcon /></button>
        </section>

        <section className="route-search-card">
          <label className="search-row">
            <SearchIcon />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar estación, ruta..." />
          </label>
          <button className="recent-row" onClick={() => setQuery('115')}><ClockIcon /><strong>RUTA 115 - LA PUERTA DIRECTO</strong></button>
          <button className="recent-row" onClick={() => setQuery('NOGALAR')}><ClockIcon /><strong>METRO - </strong><span>Estación NOGALAR</span></button>
          <button className="nearby-button" onClick={() => setNotice('Buscando rutas cercanas')}>Ver rutas cerca de mí</button>
        </section>

        <section className="transport-grid">
          <article className="metro-card transport-card">
            <div className="metro-copy"><h2>METRO</h2><strong>3 Líneas</strong><p>Ubicación<br/>y horarios</p><button onClick={() => setNotice('Más información de Metro')}>Ver más</button></div>
            <div className="metro-art"><div className="metro-platform"/><MetroTrain /></div>
          </article>

          <div className="small-cards">
            <article className="train-card transport-card"><div><h2>TREN</h2><strong>17 Rutas</strong><button onClick={() => setNotice('Rutas de Tren')}>Ver rutas</button></div><MetroTrain small /></article>
            <article className="ruta-card transport-card"><div><h2>RUTA</h2><strong>56 Rutas</strong><button onClick={() => setNotice('Rutas disponibles')}>Ver rutas</button></div><BusIllustration /></article>
            <article className="brt-card transport-card"><div><h2>BRT</h2><strong>60 Rutas</strong><button onClick={() => setNotice('Rutas BRT')}>Ver rutas</button></div><BusIllustration folded /></article>
          </div>
        </section>
        {notice && <div className="routes-toast" role="status">{notice}</div>}
      </main>

      <nav className="routes-nav" aria-label="Navegación principal">
        <button><BusIcon /><span>INICIO</span></button>
        <button className="active"><SearchIcon /><span>RUTAS</span></button>
        <button><WalletIcon /><span>WALLET</span></button>
        <button><UserIcon /><span>USUARIO</span></button>
      </nav>
      <div className="home-indicator" />
    </div>
  )
}

function BusIcon() { return <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="7" width="32" height="31" rx="6" stroke="currentColor" strokeWidth="4"/><path d="M9 20h30M14 38v5M34 38v5M14 27h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg> }
function WalletIcon() { return <svg viewBox="0 0 48 48" fill="none"><path d="M7 14h27a6 6 0 016 6v17H14a7 7 0 010-14h26" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M34 26h6" stroke="currentColor" strokeWidth="4"/></svg> }
function UserIcon() { return <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="15" r="8" stroke="currentColor" strokeWidth="4"/><path d="M8 42c2-10 8-15 16-15s14 5 16 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg> }
