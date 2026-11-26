import { useState } from 'react'

function StatusBar({ icon = 'bus' }: { icon?: 'bus' | 'train' }) {
  return (
    <header className="wallet-status">
      <span>2:34</span>
      <div className="wallet-status-island">
        {icon === 'bus' ? <span className="island-bus">▰</span> : <span className="island-train">▰</span>}
        <div className="island-signal">▮▮</div>
      </div>
      <div className="wallet-status-right"><span className="wifi">◉</span><span className="battery" /></div>
    </header>
  )
}

function TrainIllustration() {
  return (
    <svg className="wallet-train" viewBox="0 0 620 130" fill="none" aria-label="Tren TRANSMO" role="img">
      <g stroke="#4a3928" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 35h580M125 35v72M265 35v72M405 35v72M548 35v72M100 35l25 25M240 35l25 25M380 35l25 25M523 35l25 25" strokeWidth="4" />
        <path d="M55 104h510M50 114h520" strokeWidth="6" />
        <rect x="95" y="73" width="405" height="39" rx="18" fill="#f7f2eb" strokeWidth="6" />
        <path d="M76 104l54-31h280l67 31M112 104v8M487 104v8" strokeWidth="7" />
        <g fill="#4a3928"><rect x="120" y="82" width="55" height="21" rx="4"/><rect x="182" y="82" width="55" height="21" rx="4"/><rect x="244" y="82" width="55" height="21" rx="4"/><rect x="306" y="82" width="55" height="21" rx="4"/><rect x="368" y="82" width="55" height="21" rx="4"/><rect x="430" y="82" width="48" height="21" rx="4"/></g>
      </g>
    </svg>
  )
}

function AddIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="3"/><path d="M24 14v20M14 24h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
}

function TransferIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 17h27l-7-7M40 31H13l7 7M35 17l5-5M13 31l-5 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function QRIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 18V8h10M30 8h10v10M40 30v10H30M18 40H8V30M13 13h5v5h-5zM30 13h5v5h-5zM13 30h5v5h-5zM24 24h5v5h-5zM32 24h5v5h-5zM24 32h5v5h-5z" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" /></svg>
}

function CardIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="6" y="10" width="36" height="28" rx="5" stroke="currentColor" strokeWidth="4"/><path d="M7 18h34M12 28h10" stroke="currentColor" strokeWidth="4" /></svg>
}

function TicketIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M7 13h34v8a6 6 0 000 12v7H7v-7a6 6 0 000-12zM30 13v27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function MovementBus() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="12" y="10" width="40" height="41" rx="7" stroke="currentColor" strokeWidth="5"/><path d="M15 29h34M21 51v6M43 51v6M19 51h26M23 36v8M32 36v8M41 36v8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
}

export default function App() {
  const [month, setMonth] = useState('Enero 2026')
  const movements = [
    { day: '26', title: 'Recarga de saldo', detail: 'Wallet', time: '10:24 a.m.', amount: '+ $50.00 MXN', positive: true },
    { day: '25', title: 'Compra de pase', detail: 'TREN (1 pasajero)', time: '02:18 p.m.', amount: '- $30.00 MXN', positive: false },
    { day: '25', title: 'Compra de pase', detail: 'METRO (2 pasajeros)', time: '01:47 p.m.', amount: '- $16.00 MXN', positive: false },
  ]

  return (
    <div className="wallet-shell">
      <StatusBar />

      <main className="wallet-main">
        <h1>Wallet</h1>

        <section className="balance-card">
          <div className="balance-copy">
            <p>Saldo disponible</p>
            <strong>$0.00 <span>MXN</span></strong>
          </div>
          <div className="balance-brand">transmo</div>
          <TrainIllustration />
        </section>

        <div className="wallet-actions">
          <button><AddIcon /><span>Recargar<br />saldo</span></button>
          <button><TransferIcon /><span>Transferir<br />saldo</span></button>
          <button><QRIcon /><span>Pagar con<br />QR</span></button>
        </div>

        <div className="wallet-shortcuts">
          <button><CardIcon /><strong>Mi tarjeta<br />TRANSMO</strong><b>›</b></button>
          <button><TicketIcon /><strong>Mis pases<br />digitales</strong><b>›</b></button>
        </div>

        <section className="movements">
          <div className="movements-header">
            <h2>Movimientos</h2>
            <button onClick={() => setMonth(month === 'Enero 2026' ? 'Febrero 2026' : 'Enero 2026')}>{month} <span>⌄</span></button>
          </div>

          <div className="movement-list">
            {movements.map((movement, index) => (
              <article key={index}>
                <div className="movement-date"><strong>{movement.day}</strong><span>Ene</span></div>
                <div className="movement-icon"><MovementBus /></div>
                <div className="movement-copy"><strong>{movement.title}</strong><span>{movement.detail}</span><span>{movement.time}</span></div>
                <div className="movement-amount"><strong className={movement.positive ? 'positive' : 'negative'}>{movement.amount}</strong><span>Aprobado</span></div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <nav className="wallet-nav" aria-label="Navegación principal">
        <button><svg viewBox="0 0 64 64" fill="none"><rect x="12" y="10" width="40" height="41" rx="7" stroke="currentColor" strokeWidth="5"/><path d="M15 29h34M21 51v6M43 51v6M19 51h26M23 36v8M32 36v8M41 36v8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg><span>INICIO</span></button>
        <button><svg viewBox="0 0 48 48" fill="none"><circle cx="21" cy="21" r="13" stroke="currentColor" strokeWidth="4"/><path d="M31 31l10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg><span>RUTAS</span></button>
        <button className="active"><svg viewBox="0 0 48 48" fill="none"><path d="M8 15h29a5 5 0 015 5v15H14a7 7 0 010-14h28" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M35 27h7" stroke="currentColor" strokeWidth="4" /></svg><span>WALLET</span></button>
        <button><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="15" r="8" stroke="currentColor" strokeWidth="4"/><path d="M8 42c2-10 8-15 16-15s14 5 16 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg><span>USUARIO</span></button>
      </nav>
      <div className="home-indicator" />
    </div>
  )
}
