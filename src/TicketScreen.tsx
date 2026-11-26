import { useState } from 'react'

export type Transport = 'METRO' | 'TREN' | 'RUTA' | 'BRT'

type TicketScreenProps = { transport: Transport; ticketCode?: string; ticketId?: string; passengers?: number; onClose: () => void }
const labels: Record<Transport, string> = { METRO: 'Metro', TREN: 'Tren', RUTA: 'Ruta', BRT: 'BRT' }

function TransportIcon({ transport }: { transport: Transport }) {
  if (transport === 'METRO') return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 8h28c8 0 13 7 13 16v24H5V24C5 15 10 8 18 8Z"/><path className="ticket-icon-cutout" d="M17 17h30c3 0 5 3 5 7v12c0 3-3 5-6 6H18c-4-1-6-3-6-7V24c0-4 2-7 5-7ZM8 51c4-5 8-7 13-7h22c5 0 9 2 13 7l5 8H1l7-8Z"/><circle cx="17" cy="47" r="4"/><circle cx="47" cy="47" r="4"/></svg>
  if (transport === 'TREN') return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M5 45 14 31 37 10c4-4 8-6 13-6h10v40H5Z"/><path className="ticket-icon-cutout" d="m14 39 7-10 18-16c3-3 6-4 10-4h5v5h5v20H40l-8 9H14Z"/><path d="M7 51h51v5H7zM5 59h54v3H5z"/></svg>
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 13c0-5 5-9 12-9h20c7 0 12 4 12 9v35H10V13Z"/><path className="ticket-icon-cutout" d="M16 17h32v18H16zM5 18h4v12H5zM55 18h4v12h-4z"/><circle cx="19" cy="42" r="4"/><circle cx="45" cy="42" r="4"/><path d="M22 49h20v4H22zM12 52h5v7h-5zM47 52h5v7h-5z"/></svg>
}
function Finder({ x, y }: { x: number; y: number }) { return <g><rect x={x} y={y} width="7" height="7"/><rect className="qr-white" x={x+1} y={y+1} width="5" height="5"/><rect x={x+2} y={y+2} width="3" height="3"/></g> }
function TicketQr({ value }: { value: string }) {
  // Decorative placeholder matrix only; this visual prototype is not a scannable transit credential.
  const seed = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const cells: Array<[number, number]> = []
  for (let y=0;y<25;y++) for (let x=0;x<25;x++) { const finder=(x<8&&y<8)||(x>16&&y<8)||(x<8&&y>16); if (!finder&&((x*17+y*31+seed+x*y*3)%7<3)) cells.push([x,y]) }
  return <svg className="ticket-qr" viewBox="0 0 25 25" role="img" aria-label="Código QR decorativo de demostración, no válido para escanear"><rect className="qr-white" width="25" height="25"/>{cells.map(([x,y])=><rect key={`${x}-${y}`} x={x} y={y} width="1" height="1"/>)}<Finder x={1} y={1}/><Finder x={17} y={1}/><Finder x={1} y={17}/></svg>
}

export default function TicketScreen({ transport, ticketCode = 'TRM-8F4D2C', ticketId, passengers = 1, onClose }: TicketScreenProps) {
  const key = `transmo-ticket-used:${ticketId ?? ticketCode}`
  const [used, setUsed] = useState(() => { try { return window.sessionStorage.getItem(key) === 'true' } catch { return false } })
  const closeTicket = () => { try { window.sessionStorage.setItem(key, 'true') } catch { /* Continue with in-memory consumed state. */ }; setUsed(true); onClose() }
  return <main className="ticket-screen">
    <div className="ticket-status-bar" aria-hidden="true"><span>9:41</span><div className="ticket-dynamic-island"/><span className="ticket-status-symbols">▮▮▮ ◉ ▰</span></div>
    <article className="ticket-card">
      <header className="ticket-brand">transmo</header>
      <section className="ticket-transport"><div className="ticket-transport-icon"><TransportIcon transport={transport}/></div><div className="ticket-divider"/><div><h1>{labels[transport]}</h1><p>{passengers} {passengers === 1 ? 'Pasajero' : 'Pasajeros'}</p></div></section>
      <div className="ticket-rule"/>
      {used ? <section className="ticket-used" role="status"><div className="ticket-used-mark">✓</div><h2>Boleto usado</h2><p>Este boleto ya fue cerrado y no se puede recuperar.</p></section> : <><div className="ticket-qr-wrap"><TicketQr value={`${ticketCode}:${transport}`}/></div><div className="ticket-rule ticket-lower-rule"/><section className="ticket-code"><p>Código de boleto</p><strong>{ticketCode}</strong></section><div className="ticket-train-art" aria-hidden="true"><span className="ticket-wire"/><div className="ticket-train"><i/><i/><i/><i/><i/><i/><i/><i/></div><span className="ticket-rails"/></div></>}
      <button className="ticket-close" onClick={closeTicket}>{used ? 'Cerrar' : 'Cerrar boleto'}</button>
    </article>
    <div className="ticket-home-indicator"/>
  </main>
}
