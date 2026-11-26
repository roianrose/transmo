import { useMemo, useState } from 'react'

type Transport = 'RUTA' | 'METRO' | 'TREN' | 'BRT'

const fares: Record<Transport, number> = {
  RUTA: 16.90,
  METRO: 8,
  TREN: 30,
  BRT: 15,
}

function BackIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M30 10L16 24l14 14M18 24h21" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function TrainIcon({ type }: { type: Transport }) {
  return (
    <svg className="vehicle" viewBox="0 0 330 155" fill="none" aria-label={type} role="img">
      <ellipse cx="165" cy="140" rx="132" rx="132" fill="#bfc1ad" opacity=".35" />
      {type === 'TREN' ? (
        <g stroke="#4a3928" strokeLinecap="round" strokeLinejoin="round">
          <path d="M38 121h262M43 129h252M69 121l40-32h133l47 32" fill="#f8f7f3" strokeWidth="4" />
          <path d="M122 88V38M204 88V38M122 38l18 18M204 38l18 18M135 38h57M88 121v8M248 121v8" strokeWidth="4" />
          <rect x="53" y="82" width="218" height="42" rx="18" fill="#f8f7f3" strokeWidth="5" />
          <rect x="74" y="91" width="47" height="22" rx="5" fill="#4a3928" stroke="none" /><rect x="128" y="91" width="47" height="22" rx="5" fill="#4a3928" stroke="none" /><rect x="182" y="91" width="47" height="22" rx="5" fill="#4a3928" stroke="none" /><rect x="235" y="91" width="27" height="22" rx="5" fill="#4a3928" stroke="none" />
        </g>
      ) : (
        <g stroke="#4a3928" strokeLinejoin="round">
          <rect x="34" y="55" width="262" height="82" rx="30" fill="#f8f7f3" strokeWidth="5" />
          <path d="M34 90h262M49 137v8M281 137v8" stroke="#4a3928" strokeWidth="5" strokeLinecap="round" />
          <rect x="52" y="68" width="55" height="24" rx="5" fill="#4a3928" /><rect x="113" y="68" width="55" height="24" rx="5" fill="#4a3928" /><rect x="174" y="68" width="55" height="24" rx="5" fill="#4a3928" /><rect x="235" y="68" width="43" height="24" rx="5" fill="#4a3928" />
          {type === 'TREN' && <path d="M75 55V35h180v20M120 35h90" strokeWidth="5" />}
        </g>
      )}
    </svg>
  )
}

export default function App() {
  const [passengers, setPassengers] = useState(1)
  const [transport, setTransport] = useState<Transport>('RUTA')
  const fare = fares[transport]
  const total = useMemo(() => fare * passengers, [fare, passengers])

  const money = (value: number) => `$${value.toFixed(2)} MXN`

  return (
    <div className="purchase-shell">
      <header className="purchase-status"><span className="time">2:34</span><div className="status-island" /><div className="status-icons"><span>▮▮</span><span className="battery" /></div></header>

      <button className="back-button" aria-label="Volver"><BackIcon /></button>

      <main className="passenger-content">
        <h1>Cantidad de<br /><span>pasajeros</span></h1>

        <div className="counter" aria-label="Cantidad de pasajeros">
          <button onClick={() => setPassengers((count) => Math.max(1, count - 1))} aria-label="Quitar pasajero">−</button>
          <strong>{passengers}</strong>
          <button onClick={() => setPassengers((count) => Math.min(9, count + 1))} aria-label="Agregar pasajero">+</button>
        </div>

        <div className="transport-tabs">
          {(['RUTA', 'METRO', 'TREN', 'BRT'] as Transport[]).map((item) => (
            <button key={item} className={transport === item ? 'active' : ''} onClick={() => setTransport(item)}>{item}</button>
          ))}
        </div>

        <section className="purchase-card">
          <div className="summary-top">
            <div>
              <h2>{transport}</h2>
              <div className="fare-row"><b>Tarifa:</b><strong>{money(fare)}</strong></div>
            </div>
            <TrainIcon type={transport} />
          </div>

          <div className="summary-lines">
            <div><span>Pasajero(s):</span><strong>{passengers}</strong></div>
            <div><span>Tarifa por pasajero:</span><strong>{money(fare)}</strong></div>
          </div>

          <div className="total-row"><strong>Total a pagar:</strong><b>{money(total)}</b></div>

          <div className="balance-change">
            <div><span>Saldo actual</span><strong>{money(0)}</strong></div>
            <div className="arrow">▶</div>
            <div><span>Nuevo saldo</span><strong>{money(-total)}</strong></div>
          </div>
        </section>

        <div className="purchase-actions">
          <button onClick={() => setPassengers(1)}>Comprar<br />y guardar</button>
          <button onClick={() => setPassengers(1)}>Comprar</button>
        </div>
      </main>

      <div className="home-indicator" />
    </div>
  )
}
