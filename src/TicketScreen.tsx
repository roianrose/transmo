import { useState } from 'react'

type Transport = 'METRO' | 'TREN' | 'RUTA' | 'BRT'

type TicketScreenProps = {
  transport: Transport
  ticketCode?: string
  ticketId?: string
  onClose: () => void
}

const labels: Record<Transport, string> = {
  METRO: 'Metro',
  TREN: 'Tren',
  RUTA: 'Ruta',
  BRT: 'BRT',
}

function TransportIcon({ transport }: { transport: Transport }) {
  if (transport === 'METRO' || transport === 'TREN') {
    return <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="7" width="40" height="42" rx="13"/><path className="ticket-icon-cutout" d="M22 18h20v19H22zM18 45l-6 10h10l7-8M46 45l6 10H42l-7-8"/><circle className="ticket-icon-cutout" cx="23" cy="42" r="3"/><circle className="ticket-icon-cutout" cx="41" cy="42" r="3"/></svg>
  }
  return <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="9" width="48" height="43" rx="11"/><path className="ticket-icon-cutout" d="M15 20h34M17 25h11v13H17zM36 25h11v13H36zM18 46h3M43 46h3"/><circle className="ticket-icon-cutout" cx="20" cy="47" r="4"/><circle className="ticket-icon-cutout" cx="44" cy="47" r="4"/></svg>
}

function Finder({ x, y }: { x: number; y: number }) {
  return <g><rect x={x} y={y} width="7" height="7"/><rect className="qr-white" x={x + 1} y={y + 1} width="5" height="5"/><rect x={x + 2} y={y + 2} width="3" height="3"/></g>
}

function TicketQr({ value }: { value: string }) {
  // Deterministic decorative matrix for the visual prototype; production scanning needs a real QR encoder.
  const seed = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const cells: Array<[number, number]> = []
  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 25; x++) {
      const insideFinder = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16)
      if (!insideFinder && ((x * 17 + y * 31 + seed + x * y * 3) % 7 < 3)) cells.push([x, y])
    }
  }
  return <svg className="ticket-qr" viewBox="0 0 25 25" role="img" aria-label="Código QR de demostración, no válido para escanear"><rect className="qr-white" width="25" height="25"/>{cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1"/>)}<Finder x={1} y={1}/><Finder x={17} y={1}/><Finder x={1} y={17}/></svg>
}

export default function TicketScreen({ transport, ticketCode = 'TRM-8F4D2C', ticketId, onClose }: TicketScreenProps) {
  const key = `transmo-ticket-used:${ticketId ?? ticketCode}`
  const [used, setUsed] = useState(() => {
    try { return window.sessionStorage.getItem(key) === 'true' } catch { return false }
  })

  const closeTicket = () => {
    try { window.sessionStorage.setItem(key, 'true') } catch { /* Keep the consumed state in component memory. */ }
    setUsed(true)
    onClose()
  }

  return (
    <main className="ticket-screen">
      <div className="ticket-status-bar" aria-hidden="true"><span>9:41</span><div className="ticket-dynamic-island"/><span className="ticket-status-symbols">▮▮▮ ◉ ▰</span></div>
      <article className="ticket-card">
        <header className="ticket-brand">transmo</header>
        <section className="ticket-transport">
          <div className="ticket-transport-icon"><TransportIcon transport={transport}/></div>
          <div className="ticket-divider"/>
          <div><h1>{labels[transport]}</h1><p>1 Pasajero</p></div>
        </section>
        <div className="ticket-rule"/>
        {used ? (
          <section className="ticket-used" role="status"><div className="ticket-used-mark">✓</div><h2>Boleto usado</h2><p>Este boleto ya fue cerrado y no se puede recuperar.</p></section>
        ) : (
          <>
            <div className="ticket-qr-wrap"><TicketQr value={`${ticketCode}:${transport}`}/></div>
            <div className="ticket-rule ticket-lower-rule"/>
            <section className="ticket-code"><p>Código de boleto</p><strong>{ticketCode}</strong></section>
            <div className="ticket-train-art" aria-hidden="true"><span className="ticket-wire"/><div className="ticket-train"><i/><i/><i/><i/><i/><i/><i/><i/></div><span className="ticket-rails"/></div>
          </>
        )}
        <button className="ticket-close" onClick={closeTicket}>{used ? 'Cerrar' : 'Cerrar boleto'}</button>
      </article>
      <div className="ticket-home-indicator"/>
    </main>
  )
}
