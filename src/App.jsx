import { useState } from "react";

const SERVICES = [
  { id: 1, name: "Basiswas", duration: 30, price: 15, color: "#4FC3F7" },
  { id: 2, name: "Deluxe Was", duration: 45, price: 25, color: "#81C784" },
  { id: 3, name: "Premium Polijst", duration: 90, price: 55, color: "#FFB74D" },
  { id: 4, name: "Volledige Detailing", duration: 180, price: 120, color: "#F06292" },
];

const SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"];

const DAYS = ["Ma","Di","Wo","Do","Vr","Za","Zo"];
const TODAY = new Date();

function getWeekDates() {
  const dates = [];
  const day = TODAY.getDay();
  const diff = TODAY.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(TODAY.setDate(diff));
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

const initialBookings = [
  { id: 1, name: "Lars de Vries", email: "lars@email.nl", phone: "06-12345678", service: 1, date: "2025-03-10", time: "09:00", status: "bevestigd", notes: "" },
  { id: 2, name: "Sophie Bakker", email: "sophie@email.nl", phone: "06-98765432", service: 3, date: "2025-03-10", time: "10:30", status: "bevestigd", notes: "Zwarte Tesla Model 3" },
  { id: 3, name: "Marco Jansen", email: "marco@email.nl", phone: "06-11223344", service: 2, date: "2025-03-11", time: "14:00", status: "wachtend", notes: "" },
  { id: 4, name: "Emma Visser", email: "emma@email.nl", phone: "06-55667788", service: 4, date: "2025-03-12", time: "09:00", status: "bevestigd", notes: "Witte BMW 3-serie" },
  { id: 5, name: "Daan Mulder", email: "daan@email.nl", phone: "06-99887766", service: 1, date: "2025-03-13", time: "11:00", status: "voltooid", notes: "" },
];

const initialCustomers = [
  { id: 1, name: "Lars de Vries", email: "lars@email.nl", phone: "06-12345678", visits: 4, lastVisit: "2025-03-10", subscribed: true },
  { id: 2, name: "Sophie Bakker", email: "sophie@email.nl", phone: "06-98765432", visits: 2, lastVisit: "2025-03-10", subscribed: true },
  { id: 3, name: "Marco Jansen", email: "marco@email.nl", phone: "06-11223344", visits: 1, lastVisit: "2025-03-11", subscribed: false },
  { id: 4, name: "Emma Visser", email: "emma@email.nl", phone: "06-55667788", visits: 7, lastVisit: "2025-03-12", subscribed: true },
  { id: 5, name: "Daan Mulder", email: "daan@email.nl", phone: "06-99887766", visits: 3, lastVisit: "2025-03-13", subscribed: true },
];

const EMAIL_TEMPLATES = [
  { id: 1, name: "Boekingsbevestiging", subject: "Uw afspraak is bevestigd ✓", body: "Beste {{naam}},\n\nUw afspraak voor {{dienst}} op {{datum}} om {{tijd}} is bevestigd.\n\nWij verwachten u graag!\n\nMet vriendelijke groet,\nCarWash Pro" },
  { id: 2, name: "Herinnering (1 dag)", subject: "Herinnering: morgen uw wasbeurt", body: "Beste {{naam}},\n\nEen vriendelijke herinnering dat u morgen om {{tijd}} een afspraak heeft voor {{dienst}}.\n\nTot morgen!\n\nMet vriendelijke groet,\nCarWash Pro" },
  { id: 3, name: "Promotie aanbieding", subject: "🚗 Exclusieve aanbieding voor u!", body: "Beste {{naam}},\n\nAls gewaardeerde klant bieden wij u 20% korting aan op uw volgende Premium Polijst of Volledige Detailing!\n\nGebruik code: VIP20\n\nGeldig t/m eind van de maand.\n\nMet vriendelijke groet,\nCarWash Pro" },
  { id: 4, name: "Terugwinning", subject: "We missen u! Kom terug met 15% korting", body: "Beste {{naam}},\n\nWe hebben u al een tijdje niet gezien. Gebruik code WELKOM15 voor 15% korting op uw volgende bezoek!\n\nMet vriendelijke groet,\nCarWash Pro" },
];

export default function CarWashSystem() {
  const [tab, setTab] = useState("dashboard");
  const [bookings, setBookings] = useState(initialBookings);
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [emailTab, setEmailTab] = useState("compose");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [emailRecipient, setEmailRecipient] = useState("all");
  const [sentEmails, setSentEmails] = useState([
    { id: 1, subject: "Boekingsbevestiging", recipients: 1, date: "2025-03-10", opens: 1 },
    { id: 2, subject: "Promotie aanbieding", recipients: 4, date: "2025-03-08", opens: 3 },
  ]);
  const [notification, setNotification] = useState(null);
  const [newBooking, setNewBooking] = useState({ name: "", email: "", phone: "", service: 1, date: "", time: "09:00", notes: "" });

  const weekDates = getWeekDates();

  const stats = {
    today: bookings.filter(b => b.date === "2025-03-10").length,
    week: bookings.length,
    revenue: bookings.filter(b => b.status === "voltooid").reduce((sum, b) => sum + SERVICES.find(s => s.id === b.service).price, 0),
    pending: bookings.filter(b => b.status === "wachtend").length,
  };

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const confirmBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "bevestigd" } : b));
    showNotif("Boeking bevestigd!");
  };

  const completeBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "voltooid" } : b));
    showNotif("Boeking gemarkeerd als voltooid!");
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
    setSelectedBooking(null);
    showNotif("Boeking geannuleerd.", "warning");
  };

  const addBooking = () => {
    if (!newBooking.name || !newBooking.date) return showNotif("Vul naam en datum in.", "error");
    const nb = { ...newBooking, id: Date.now(), status: "bevestigd" };
    setBookings([...bookings, nb]);
    // add or update customer
    const existing = customers.find(c => c.email === newBooking.email);
    if (!existing && newBooking.email) {
      setCustomers([...customers, { id: Date.now(), name: newBooking.name, email: newBooking.email, phone: newBooking.phone, visits: 1, lastVisit: newBooking.date, subscribed: true }]);
    }
    setShowNewBooking(false);
    setNewBooking({ name: "", email: "", phone: "", service: 1, date: "", time: "09:00", notes: "" });
    showNotif("Nieuwe boeking toegevoegd!");
  };

  const sendEmail = () => {
    const tmpl = EMAIL_TEMPLATES[selectedTemplate];
    const recipientCount = emailRecipient === "all" ? customers.filter(c => c.subscribed).length : emailRecipient === "vip" ? customers.filter(c => c.visits >= 4 && c.subscribed).length : 1;
    setSentEmails([{ id: Date.now(), subject: tmpl.subject, recipients: recipientCount, date: new Date().toISOString().split("T")[0], opens: 0 }, ...sentEmails]);
    showNotif(`E-mail verzonden naar ${recipientCount} klant(en)!`);
  };

  const statusColor = (s) => s === "bevestigd" ? "#4CAF50" : s === "wachtend" ? "#FF9800" : s === "voltooid" ? "#2196F3" : "#9E9E9E";
  const statusLabel = (s) => s === "bevestigd" ? "Bevestigd" : s === "wachtend" ? "Wachtend" : s === "voltooid" ? "Voltooid" : s;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#0f1117", minHeight: "100vh", color: "#e8eaf0", display: "flex", flexDirection: "column" }}>
      {/* Notification */}
      {notification && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 999, background: notification.type === "success" ? "#1b5e20" : notification.type === "warning" ? "#e65100" : "#b71c1c", color: "#fff", padding: "12px 22px", borderRadius: 10, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.4)", fontSize: 14 }}>
          {notification.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1f2e 0%, #141824 100%)", borderBottom: "1px solid #252a3a", padding: "0 24px", display: "flex", alignItems: "center", gap: 16, height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #29b6f6, #0288d1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚗</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: 0.5 }}>CarWash Pro</div>
            <div style={{ fontSize: 10, color: "#546e7a", letterSpacing: 1 }}>BEHEERPANEEL</div>
          </div>
        </div>
        {[
          { id: "dashboard", icon: "📊", label: "Dashboard" },
          { id: "planning", icon: "📅", label: "Planning" },
          { id: "boekingen", icon: "📋", label: "Boekingen" },
          { id: "klanten", icon: "👥", label: "Klanten" },
          { id: "marketing", icon: "📧", label: "Marketing" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? "rgba(41,182,246,0.15)" : "transparent", border: tab === t.id ? "1px solid rgba(41,182,246,0.4)" : "1px solid transparent", color: tab === t.id ? "#29b6f6" : "#78909c", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800 }}>Goedemorgen 👋</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Afspraken vandaag", value: stats.today, icon: "📅", color: "#29b6f6" },
                { label: "Afspraken deze week", value: stats.week, icon: "🗓️", color: "#66bb6a" },
                { label: "Omzet (voltooid)", value: `€${stats.revenue}`, icon: "💶", color: "#ffa726" },
                { label: "Wachtend op bevestiging", value: stats.pending, icon: "⏳", color: "#ef5350" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#546e7a", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>📋 Recente boekingen</div>
                {bookings.slice(0, 4).map(b => {
                  const svc = SERVICES.find(s => s.id === b.service);
                  return (
                    <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #1e2332" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(b.status), flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{b.name}</div>
                        <div style={{ fontSize: 11, color: "#546e7a" }}>{svc.name} · {b.date} {b.time}</div>
                      </div>
                      <div style={{ fontSize: 11, color: statusColor(b.status), fontWeight: 600 }}>{statusLabel(b.status)}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>🛎️ Diensten overzicht</div>
                {SERVICES.map(s => {
                  const count = bookings.filter(b => b.service === s.id).length;
                  const pct = Math.round((count / bookings.length) * 100);
                  return (
                    <div key={s.id} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>{s.name}</span>
                        <span style={{ color: "#546e7a" }}>{count} boekingen · €{s.price}</span>
                      </div>
                      <div style={{ background: "#252a3a", borderRadius: 4, height: 6, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: s.color, borderRadius: 4, transition: "width 0.6s" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PLANNING */}
        {tab === "planning" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>📅 Weekplanning</h2>
              <button onClick={() => setShowNewBooking(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>+ Nieuwe boeking</button>
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, overflow: "hidden" }}>
              {/* Header row */}
              <div style={{ display: "grid", gridTemplateColumns: "80px repeat(7, 1fr)", background: "#141824", borderBottom: "1px solid #252a3a" }}>
                <div style={{ padding: "10px 8px", fontSize: 11, color: "#546e7a" }}>Tijd</div>
                {weekDates.map((d, i) => (
                  <div key={i} style={{ padding: "10px 8px", textAlign: "center", borderLeft: "1px solid #252a3a" }}>
                    <div style={{ fontSize: 11, color: "#546e7a" }}>{DAYS[i]}</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{d.getDate()}</div>
                  </div>
                ))}
              </div>
              {/* Time slots */}
              <div style={{ maxHeight: 400, overflowY: "auto" }}>
                {SLOTS.map(slot => (
                  <div key={slot} style={{ display: "grid", gridTemplateColumns: "80px repeat(7, 1fr)", borderBottom: "1px solid #1a1f2e" }}>
                    <div style={{ padding: "8px", fontSize: 11, color: "#546e7a", paddingTop: 10 }}>{slot}</div>
                    {weekDates.map((d, di) => {
                      const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                      const booking = bookings.find(b => b.date === dateStr && b.time === slot);
                      return (
                        <div key={di} onClick={() => booking && setSelectedBooking(booking)} style={{ borderLeft: "1px solid #1a1f2e", minHeight: 36, padding: 3, cursor: booking ? "pointer" : "default" }}>
                          {booking && (
                            <div style={{ background: SERVICES.find(s => s.id === booking.service).color + "22", border: `1px solid ${SERVICES.find(s => s.id === booking.service).color}55`, borderRadius: 5, padding: "3px 6px", fontSize: 10, fontWeight: 600, color: SERVICES.find(s => s.id === booking.service).color }}>
                              {booking.name.split(" ")[0]}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* New booking modal */}
            {showNewBooking && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 16, padding: 28, width: 400, maxWidth: "95vw" }}>
                  <h3 style={{ margin: "0 0 20px", fontSize: 18 }}>Nieuwe boeking</h3>
                  {[
                    { label: "Naam*", key: "name", type: "text" },
                    { label: "E-mail", key: "email", type: "email" },
                    { label: "Telefoon", key: "phone", type: "tel" },
                    { label: "Datum*", key: "date", type: "date" },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 12, color: "#78909c", display: "block", marginBottom: 4 }}>{f.label}</label>
                      <input type={f.type} value={newBooking[f.key]} onChange={e => setNewBooking({ ...newBooking, [f.key]: e.target.value })} style={{ width: "100%", background: "#141824", border: "1px solid #252a3a", borderRadius: 8, padding: "8px 12px", color: "#e8eaf0", fontSize: 13, boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, color: "#78909c", display: "block", marginBottom: 4 }}>Dienst</label>
                    <select value={newBooking.service} onChange={e => setNewBooking({ ...newBooking, service: Number(e.target.value) })} style={{ width: "100%", background: "#141824", border: "1px solid #252a3a", borderRadius: 8, padding: "8px 12px", color: "#e8eaf0", fontSize: 13 }}>
                      {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name} – €{s.price}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, color: "#78909c", display: "block", marginBottom: 4 }}>Tijd</label>
                    <select value={newBooking.time} onChange={e => setNewBooking({ ...newBooking, time: e.target.value })} style={{ width: "100%", background: "#141824", border: "1px solid #252a3a", borderRadius: 8, padding: "8px 12px", color: "#e8eaf0", fontSize: 13 }}>
                      {SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 12, color: "#78909c", display: "block", marginBottom: 4 }}>Notities</label>
                    <textarea value={newBooking.notes} onChange={e => setNewBooking({ ...newBooking, notes: e.target.value })} rows={2} style={{ width: "100%", background: "#141824", border: "1px solid #252a3a", borderRadius: 8, padding: "8px 12px", color: "#e8eaf0", fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={addBooking} style={{ flex: 1, background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 700 }}>Opslaan</button>
                    <button onClick={() => setShowNewBooking(false)} style={{ flex: 1, background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 600 }}>Annuleren</button>
                  </div>
                </div>
              </div>
            )}

            {/* Booking detail modal */}
            {selectedBooking && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 16, padding: 28, width: 380, maxWidth: "95vw" }}>
                  <h3 style={{ margin: "0 0 18px" }}>{selectedBooking.name}</h3>
                  {[
                    ["Dienst", SERVICES.find(s => s.id === selectedBooking.service)?.name],
                    ["Datum", selectedBooking.date],
                    ["Tijd", selectedBooking.time],
                    ["E-mail", selectedBooking.email],
                    ["Telefoon", selectedBooking.phone],
                    ["Status", statusLabel(selectedBooking.status)],
                    ["Notities", selectedBooking.notes || "—"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1e2332", fontSize: 13 }}>
                      <span style={{ color: "#546e7a" }}>{k}</span>
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
                    {selectedBooking.status === "wachtend" && <button onClick={() => { confirmBooking(selectedBooking.id); setSelectedBooking(null); }} style={{ background: "#4CAF50", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✓ Bevestigen</button>}
                    {selectedBooking.status === "bevestigd" && <button onClick={() => { completeBooking(selectedBooking.id); setSelectedBooking(null); }} style={{ background: "#2196F3", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✓ Voltooien</button>}
                    <button onClick={() => cancelBooking(selectedBooking.id)} style={{ background: "#ef5350", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✕ Annuleren</button>
                    <button onClick={() => setSelectedBooking(null)} style={{ background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 600, fontSize: 12, marginLeft: "auto" }}>Sluiten</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOEKINGEN */}
        {tab === "boekingen" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>📋 Alle boekingen</h2>
              <button onClick={() => setShowNewBooking(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>+ Nieuwe boeking</button>
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#141824" }}>
                    {["Klant", "Dienst", "Datum & Tijd", "Status", "Prijs", "Acties"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 11, letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => {
                    const svc = SERVICES.find(s => s.id === b.service);
                    return (
                      <tr key={b.id} style={{ borderTop: "1px solid #1e2332" }}>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ fontWeight: 600 }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: "#546e7a" }}>{b.email}</div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ background: svc.color + "22", color: svc.color, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 600 }}>{svc.name}</span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "#b0bec5" }}>{b.date} om {b.time}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ background: statusColor(b.status) + "22", color: statusColor(b.status), borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 600 }}>{statusLabel(b.status)}</span>
                        </td>
                        <td style={{ padding: "12px 16px", fontWeight: 700, color: "#66bb6a" }}>€{svc.price}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            {b.status === "wachtend" && <button onClick={() => confirmBooking(b.id)} style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF5044", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>Bevestig</button>}
                            {b.status === "bevestigd" && <button onClick={() => completeBooking(b.id)} style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F344", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>Voltooi</button>}
                            <button onClick={() => cancelBooking(b.id)} style={{ background: "#ef535022", color: "#ef5350", border: "1px solid #ef535044", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>Verwijder</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* KLANTEN */}
        {tab === "klanten" && (
          <div>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800 }}>👥 Klantenbeheer</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Totaal klanten", value: customers.length, color: "#29b6f6" },
                { label: "Nieuwsbrief abonnees", value: customers.filter(c => c.subscribed).length, color: "#66bb6a" },
                { label: "Terugkerende klanten", value: customers.filter(c => c.visits > 1).length, color: "#ffa726" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#546e7a", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#141824" }}>
                    {["Naam", "Contact", "Bezoeken", "Laatste bezoek", "Nieuwsbrief"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 11, letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map(c => (
                    <tr key={c.id} style={{ borderTop: "1px solid #1e2332" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#252a3a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#29b6f6" }}>{c.name[0]}</div>
                          <span style={{ fontWeight: 600 }}>{c.name}</span>
                          {c.visits >= 4 && <span style={{ background: "#ffa72622", color: "#ffa726", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontWeight: 700 }}>⭐ VIP</span>}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontSize: 12 }}>{c.email}</div>
                        <div style={{ fontSize: 11, color: "#546e7a" }}>{c.phone}</div>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 700 }}>{c.visits}×</td>
                      <td style={{ padding: "12px 16px", color: "#b0bec5" }}>{c.lastVisit}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <button onClick={() => setCustomers(customers.map(x => x.id === c.id ? { ...x, subscribed: !x.subscribed } : x))} style={{ background: c.subscribed ? "#4CAF5022" : "#ef535022", color: c.subscribed ? "#4CAF50" : "#ef5350", border: `1px solid ${c.subscribed ? "#4CAF5044" : "#ef535044"}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                          {c.subscribed ? "✓ Ingeschreven" : "✕ Uitgeschreven"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MARKETING */}
        {tab === "marketing" && (
          <div>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800 }}>📧 E-mail Marketing</h2>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {["compose", "history"].map(t => (
                <button key={t} onClick={() => setEmailTab(t)} style={{ background: emailTab === t ? "rgba(41,182,246,0.15)" : "transparent", border: emailTab === t ? "1px solid rgba(41,182,246,0.4)" : "1px solid #252a3a", color: emailTab === t ? "#29b6f6" : "#78909c", borderRadius: 8, padding: "7px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                  {t === "compose" ? "✍️ Opstellen" : "📜 Geschiedenis"}
                </button>
              ))}
            </div>

            {emailTab === "compose" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, padding: 20 }}>
                    <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>1. Kies een sjabloon</div>
                    {EMAIL_TEMPLATES.map((t, i) => (
                      <div key={t.id} onClick={() => setSelectedTemplate(i)} style={{ background: selectedTemplate === i ? "rgba(41,182,246,0.1)" : "#141824", border: selectedTemplate === i ? "1px solid rgba(41,182,246,0.4)" : "1px solid #252a3a", borderRadius: 10, padding: "12px 14px", cursor: "pointer", marginBottom: 8, transition: "all 0.15s" }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: "#546e7a", marginTop: 2 }}>{t.subject}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, padding: 20, marginTop: 16 }}>
                    <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>2. Kies ontvangers</div>
                    {[
                      { value: "all", label: "Alle abonnees", count: customers.filter(c => c.subscribed).length },
                      { value: "vip", label: "Enkel VIP klanten (4+ bezoeken)", count: customers.filter(c => c.visits >= 4 && c.subscribed).length },
                    ].map(r => (
                      <div key={r.value} onClick={() => setEmailRecipient(r.value)} style={{ background: emailRecipient === r.value ? "rgba(41,182,246,0.1)" : "#141824", border: emailRecipient === r.value ? "1px solid rgba(41,182,246,0.4)" : "1px solid #252a3a", borderRadius: 10, padding: "12px 14px", cursor: "pointer", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{r.label}</span>
                        <span style={{ background: "#252a3a", borderRadius: 20, padding: "2px 8px", fontSize: 11, color: "#29b6f6", fontWeight: 700 }}>{r.count}</span>
                      </div>
                    ))}
                    <button onClick={sendEmail} style={{ width: "100%", background: "linear-gradient(135deg, #29b6f6, #0288d1)", color: "#000", border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontWeight: 800, fontSize: 14, marginTop: 8 }}>
                      📤 Verstuur e-mail
                    </button>
                  </div>
                </div>
                <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, padding: 20 }}>
                  <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Voorbeeld e-mail</div>
                  <div style={{ background: "#141824", borderRadius: 10, padding: 20, border: "1px solid #252a3a" }}>
                    <div style={{ borderBottom: "1px solid #252a3a", paddingBottom: 12, marginBottom: 16 }}>
                      <div style={{ fontSize: 11, color: "#546e7a", marginBottom: 4 }}>ONDERWERP</div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{EMAIL_TEMPLATES[selectedTemplate].subject}</div>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.7, color: "#b0bec5" }}>
                      {EMAIL_TEMPLATES[selectedTemplate].body}
                    </div>
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "#0d1117", borderRadius: 8, fontSize: 11, color: "#546e7a" }}>
                    💡 <strong style={{ color: "#78909c" }}>Variabelen</strong> zoals {"{{naam}}"} worden automatisch ingevuld per klant.
                  </div>
                </div>
              </div>
            )}

            {emailTab === "history" && (
              <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 14, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#141824" }}>
                      {["Onderwerp", "Verzonden op", "Ontvangers", "Opens"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 11, letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sentEmails.map(e => (
                      <tr key={e.id} style={{ borderTop: "1px solid #1e2332" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 600 }}>{e.subject}</td>
                        <td style={{ padding: "14px 16px", color: "#b0bec5" }}>{e.date}</td>
                        <td style={{ padding: "14px 16px" }}>{e.recipients} ontvangers</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ background: "#252a3a", borderRadius: 4, height: 6, width: 80, overflow: "hidden" }}>
                              <div style={{ width: `${Math.round((e.opens / e.recipients) * 100)}%`, height: "100%", background: "#29b6f6" }} />
                            </div>
                            <span style={{ color: "#29b6f6", fontWeight: 700 }}>{Math.round((e.opens / e.recipients) * 100)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}