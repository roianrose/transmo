import { useState } from 'react'

function StatusBar() {
  return (
    <header className="user-status">
      <span>2:34</span>
      <div className="user-status-island"><span>▰</span><b>••</b></div>
      <div className="user-status-icons"><span>◉</span><i /></div>
    </header>
  )
}

function Chevron() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M18 10l14 14-14 14" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function CardIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="6" y="10" width="36" height="28" rx="5" stroke="currentColor" strokeWidth="4"/><path d="M7 18h34M12 28h10" stroke="currentColor" strokeWidth="4" /></svg>
}

function BellIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M12 35h24l-4-6V20a8 8 0 00-16 0v9zM20 40h8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function LockIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="10" y="21" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="4"/><path d="M16 21v-5a8 8 0 0116 0v5M24 29v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
}

function HelpIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="4"/><path d="M18 19a6 6 0 1110 5c-3 2-4 3-4 7M24 36v1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
}

function BusIcon() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="12" y="10" width="40" height="41" rx="7" stroke="currentColor" strokeWidth="5"/><path d="M15 29h34M21 51v6M43 51v6M19 51h26M23 36v8M32 36v8M41 36v8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
}

export default function App() {
  const [notice, setNotice] = useState('')
  const menuItems = [
    { label: 'Tarjetas TRANSMO', icon: <CardIcon /> },
    { label: 'Notificaciones', icon: <BellIcon /> },
    { label: 'Privacidad y seguridad', icon: <LockIcon /> },
    { label: 'Ayuda y soporte', icon: <HelpIcon /> },
  ]

  return (
    <div className="user-shell">
      <StatusBar />

      <main className="user-main">
        <h1>Usuario</h1>

        <section className="profile-card">
          <div className="avatar" aria-label="Foto de perfil">
            <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
              <circle cx="80" cy="80" r="80" fill="#dfe7c9" />
              <circle cx="80" cy="54" r="27" fill="#75482f" />
              <path d="M56 50c4-25 43-31 53-6-11-5-24-3-34 3-6 4-12 5-19 3z" fill="#4a3928" />
              <path d="M38 143c4-34 20-51 42-51s38 17 42 51" fill="#718b42" />
              <circle cx="69" cy="57" r="3" fill="#4a3928"/><circle cx="91" cy="57" r="3" fill="#4a3928"/>
              <path d="M69 70c7 6 15 6 22 0" stroke="#4a3928" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="profile-copy"><h2>Angel Roiz</h2><p>angel.roiz@transmo.mx</p></div>
          <button className="profile-edit" onClick={() => setNotice('Perfil')}>Editar perfil</button>
        </section>

        <section className="account-summary">
          <button onClick={() => setNotice('Pases digitales')}><strong>3</strong><span>Pases digitales</span></button>
          <button onClick={() => setNotice('Movimientos')}><strong>12</strong><span>Movimientos</span></button>
          <button onClick={() => setNotice('Viajes')}><strong>28</strong><span>Viajes</span></button>
        </section>

        <section className="user-menu">
          {menuItems.map((item) => (
            <button key={item.label} onClick={() => setNotice(item.label)}>
              <span className="menu-icon">{item.icon}</span>
              <strong>{item.label}</strong>
              <span className="menu-chevron"><Chevron /></span>
            </button>
          ))}
        </section>

        <button className="logout-button" onClick={() => setNotice('Cerrar sesión')}>Cerrar sesión</button>
        {notice && <div className="notice-toast" role="status">{notice}</div>}
      </main>

      <nav className="wallet-nav user-nav" aria-label="Navegación principal">
        <button><BusIcon /><span>INICIO</span></button>
        <button><svg viewBox="0 0 48 48" fill="none"><circle cx="21" cy="21" r="13" stroke="currentColor" strokeWidth="4"/><path d="M31 31l10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg><span>RUTAS</span></button>
        <button><svg viewBox="0 0 48 48" fill="none"><path d="M8 15h29a5 5 0 015 5v15H14a7 7 0 010-14h28" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M35 27h7" stroke="currentColor" strokeWidth="4" /></svg><span>WALLET</span></button>
        <button className="active"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="15" r="8" stroke="currentColor" strokeWidth="4"/><path d="M8 42c2-10 8-15 16-15s14 5 16 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg><span>USUARIO</span></button>
      </nav>
      <div className="home-indicator" />
    </div>
  )
}
