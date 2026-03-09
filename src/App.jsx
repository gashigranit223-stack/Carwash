import { useState } from "react";

const SHERBIMET = [
  { id: 1, name: "Larje Bazë", duration: 30, price: 15, icon: "🚿", desc: "Larje e jashtme + tharje me ajër" },
  { id: 2, name: "Larje Deluxe", duration: 45, price: 25, icon: "✨", desc: "Larje e jashtme + fshirje brendësi" },
  { id: 3, name: "Lustrim Premium", duration: 90, price: 55, icon: "💎", desc: "Lustrim i plotë + aplikim dylli" },
  { id: 4, name: "Detajim i Plotë", duration: 180, price: 120, icon: "🏆", desc: "Trajtim i plotë brenda dhe jashtë" },
];

const ORARET = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"];
const DITET_SQ = ["Die","Hën","Mar","Mër","Enj","Pre","Sht"];
const MUAJT_SQ = ["jan","shk","mar","pri","maj","qer","kor","gus","sht","tet","nën","dhj"];

function formatData(d) {
  const dt = new Date(d);
  return `${dt.getDate()} ${MUAJT_SQ[dt.getMonth()]} ${dt.getFullYear()}`;
}

function sotDite() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function get14Ditet() {
  const ditet = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const str = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    ditet.push({ str, d });
  }
  return ditet;
}

const REZERVIMET_FILLESTARE = [
  { id: 1, name: "Arben Krasniqi", email: "arben@email.al", phone: "069-123-4567", sherbim: 1, data: sotDite(), ora: "09:00", statusi: "konfirmuar", shenime: "" },
  { id: 2, name: "Fjolla Berisha", email: "fjolla@email.al", phone: "068-987-6543", sherbim: 3, data: sotDite(), ora: "10:30", statusi: "konfirmuar", shenime: "Tesla e zezë" },
  { id: 3, name: "Driton Hoxha", email: "driton@email.al", phone: "067-111-2233", sherbim: 2, data: sotDite(), ora: "14:00", statusi: "pritje", shenime: "" },
];

const SABLLONET_EMAIL = [
  { id: 1, name: "Konfirmim Rezervimi", subjekti: "Takimi juaj është konfirmuar ✓", teksti: "I/E dashur {{emri}},\n\nTakimi juaj për {{sherbim}} më {{data}} në orën {{ora}} është konfirmuar.\n\nNë pritje tuaj!\n\nMe respekt,\nCarwash Granit\nPronar: Granit" },
  { id: 2, name: "Kujtesë (1 ditë)", subjekti: "Kujtesë: nesër larja juaj 🚗", teksti: "I/E dashur {{emri}},\n\nJu kujtojmë me respekt se nesër në orën {{ora}} keni takim për {{sherbim}}.\n\nDeri nesër!\n\nMe respekt,\nCarwash Granit\nPronar: Granit" },
  { id: 3, name: "Ofertë Promocionale", subjekti: "🎉 Ofertë ekskluzive për ju!", teksti: "I/E dashur {{emri}},\n\nSi klient i vlerësuar, ju ofrojmë 20% zbritje në vizitën tuaj të radhës!\n\nKodi: VIP20\n\nMe respekt,\nCarwash Granit\nPronar: Granit" },
  { id: 4, name: "Rifitim Klienti", subjekti: "Na mungoni! 15% zbritje 🚗", teksti: "I/E dashur {{emri}},\n\nNuk ju kemi parë prej kohësh! Përdorni MIRESEVINI15 për 15% zbritje.\n\nMe respekt,\nCarwash Granit\nPronar: Granit" },
];

const statusNgjyra = (s) => ({ konfirmuar: "#4CAF50", pritje: "#FF9800", perfunduar: "#2196F3", anuluar: "#9E9E9E" }[s] || "#9E9E9E");
const statusEtiketa = (s) => ({ konfirmuar: "Konfirmuar", pritje: "Në Pritje", perfunduar: "Përfunduar", anuluar: "Anuluar" }[s] || s);

function useGjendjaEPerbashket() {
  const [rezervimet, setRezervimet] = useState(REZERVIMET_FILLESTARE);
  const [klientet, setKlientet] = useState([
    { id: 1, name: "Arben Krasniqi", email: "arben@email.al", phone: "069-123-4567", vizita: 4, abonuar: true },
    { id: 2, name: "Fjolla Berisha", email: "fjolla@email.al", phone: "068-987-6543", vizita: 2, abonuar: true },
    { id: 3, name: "Driton Hoxha", email: "driton@email.al", phone: "067-111-2233", vizita: 1, abonuar: false },
  ]);

  const oraEZene = (data, ora) => rezervimet.some(r => r.data === data && r.ora === ora && r.statusi !== "anuluar");

  const shtoRezervim = (rezervim) => {
    if (oraEZene(rezervim.data, rezervim.ora)) return false;
    const r = { ...rezervim, id: Date.now(), statusi: "konfirmuar" };
    setRezervimet(prev => [...prev, r]);
    setKlientet(prev => {
      const ekz = prev.find(k => k.email === rezervim.email);
      if (ekz) return prev.map(k => k.email === rezervim.email ? { ...k, vizita: k.vizita + 1 } : k);
      if (rezervim.email) return [...prev, { id: Date.now(), name: rezervim.name, email: rezervim.email, phone: rezervim.phone, vizita: 1, abonuar: true }];
      return prev;
    });
    return true;
  };

  const perditesoCtatusin = (id, statusi) => setRezervimet(prev => prev.map(r => r.id === id ? { ...r, statusi } : r));
  const fshiRezervimin = (id) => setRezervimet(prev => prev.filter(r => r.id !== id));

  return { rezervimet, klientet, setKlientet, oraEZene, shtoRezervim, perditesoCtatusin, fshiRezervimin };
}

function Njoftim({ msg, lloji }) {
  const bg = { gabim: "#b71c1c", kujdes: "#e65100", sukses: "#1b5e20" }[lloji] || "#1b5e20";
  return <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: bg, color: "#fff", padding: "12px 22px", borderRadius: 10, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.5)", fontSize: 14, maxWidth: 320 }}>{msg}</div>;
}

// ═══════════════════════════════════════════════
// PORTALI I KLIENTIT
// ═══════════════════════════════════════════════

function PortaliKlientit({ oraEZene, shtoRezervim }) {
  const [hapi, setHapi] = useState(1);
  const [zgj, setZgj] = useState({ sherbim: null, data: null, ora: null, name: "", email: "", phone: "", shenime: "" });
  const [njoftim, setNjoftim] = useState(null);
  const [perfunduar, setPerfunduar] = useState(false);
  const ditet = get14Ditet();

  const tregoProblem = (msg, lloji = "sukses") => { setNjoftim({ msg, lloji }); setTimeout(() => setNjoftim(null), 3500); };
  const sherb = SHERBIMET.find(s => s.id === zgj.sherbim);

  const dergoje = () => {
    if (!zgj.name.trim()) return tregoProblem("Ju lutemi shkruani emrin tuaj.", "gabim");
    if (!zgj.email.trim()) return tregoProblem("Ju lutemi shkruani email-in tuaj.", "gabim");
    const ok = shtoRezervim({ name: zgj.name, email: zgj.email, phone: zgj.phone, sherbim: zgj.sherbim, data: zgj.data, ora: zgj.ora, shenime: zgj.shenime });
    if (!ok) return tregoProblem("Kjo orë është zënë tani. Zgjidhni një orë tjetër.", "gabim");
    setPerfunduar(true);
  };

  const inputStili = { width: "100%", background: "#f8faff", border: "1.5px solid #e3eaf5", borderRadius: 10, padding: "10px 14px", color: "#263238", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Segoe UI', sans-serif" };

  if (perfunduar) return (
    <div style={{ minHeight: "100vh", background: "#f0f7ff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", maxWidth: 440, boxShadow: "0 8px 40px rgba(0,100,200,0.12)" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ margin: "0 0 10px", color: "#0d47a1", fontSize: 26 }}>Rezervimi u konfirmua!</h2>
        <p style={{ color: "#546e7a", marginBottom: 20 }}>Faleminderit, <strong>{zgj.name}</strong>! Takimi juaj për <strong>{sherb?.name}</strong> më <strong>{formatData(zgj.data)}</strong> në orën <strong>{zgj.ora}</strong> është regjistruar.</p>
        <p style={{ fontSize: 13, color: "#90a4ae" }}>Konfirmimi do të dërgohet në {zgj.email}</p>
        <div style={{ marginTop: 20, padding: "12px 16px", background: "#f0f7ff", borderRadius: 10, fontSize: 13, color: "#546e7a" }}>
          🏢 <strong>Carwash Granit</strong> — Pronar: Granit
        </div>
        <button onClick={() => { setPerfunduar(false); setHapi(1); setZgj({ sherbim: null, data: null, ora: null, name: "", email: "", phone: "", shenime: "" }); }} style={{ marginTop: 20, background: "#1976d2", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Rezervim i Ri</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f2fd 0%, #f0f4ff 100%)", fontFamily: "'Segoe UI', sans-serif" }}>
      {njoftim && <Njoftim {...njoftim} />}

      <div style={{ background: "#fff", borderBottom: "1px solid #e3eaf5", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #1976d2, #42a5f5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚗</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20, color: "#0d47a1", letterSpacing: -0.5 }}>Carwash Granit</div>
            <div style={{ fontSize: 11, color: "#90a4ae", letterSpacing: 1 }}>REZERVO ONLINE</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#78909c", background: "#f0f4ff", padding: "6px 14px", borderRadius: 20, fontWeight: 600 }}>
          👤 Pronar: Granit
        </div>
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e3eaf5", padding: "12px 32px", display: "flex", gap: 6, alignItems: "center", overflowX: "auto" }}>
        {["Shërbimi","Data","Ora","Të dhënat","Konfirmo"].map((label, i) => {
          const aktiv = hapi === i+1, bere = hapi > i+1;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: bere ? "#4CAF50" : aktiv ? "#1976d2" : "#e3eaf5", color: bere || aktiv ? "#fff" : "#90a4ae", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{bere ? "✓" : i+1}</div>
              <span style={{ fontSize: 12, fontWeight: aktiv ? 700 : 400, color: aktiv ? "#1976d2" : bere ? "#4CAF50" : "#90a4ae" }}>{label}</span>
              {i < 4 && <div style={{ width: 16, height: 2, background: hapi > i+1 ? "#4CAF50" : "#e3eaf5", borderRadius: 1, marginLeft: 2 }} />}
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px" }}>

        {hapi === 1 && (
          <div>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>Zgjidhni shërbimin</h2>
            <p style={{ color: "#78909c", marginBottom: 24 }}>Zgjidhni trajtimin që dëshironi</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {SHERBIMET.map(s => (
                <div key={s.id} onClick={() => { setZgj({ ...zgj, sherbim: s.id }); setHapi(2); }} style={{ background: "#fff", border: "2px solid #e3eaf5", borderRadius: 16, padding: 20, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "border-color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#1976d2"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e3eaf5"}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0d47a1", marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#78909c", marginBottom: 12 }}>{s.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: "#1976d2" }}>€{s.price}</span>
                    <span style={{ fontSize: 12, color: "#b0bec5" }}>⏱ {s.duration} min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hapi === 2 && (
          <div>
            <button onClick={() => setHapi(1)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>← Kthehu</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>Zgjidhni datën</h2>
            <p style={{ color: "#78909c", marginBottom: 20 }}>2 javët e ardhshme</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {ditet.map(({ str, d }) => {
                const teGjitha = ORARET.every(o => oraEZene(str, o));
                const eZgjedhur = zgj.data === str;
                return (
                  <div key={str} onClick={() => { if (!teGjitha) { setZgj({ ...zgj, data: str }); setHapi(3); } }} style={{ background: teGjitha ? "#f5f5f5" : eZgjedhur ? "#1976d2" : "#fff", border: `2px solid ${teGjitha ? "#e0e0e0" : eZgjedhur ? "#1976d2" : "#e3eaf5"}`, borderRadius: 12, padding: "12px 6px", textAlign: "center", cursor: teGjitha ? "not-allowed" : "pointer", opacity: teGjitha ? 0.5 : 1 }}>
                    <div style={{ fontSize: 10, color: eZgjedhur ? "#90caf9" : "#90a4ae", marginBottom: 2 }}>{DITET_SQ[d.getDay()]}</div>
                    <div style={{ fontWeight: 700, color: eZgjedhur ? "#fff" : "#0d47a1" }}>{d.getDate()}</div>
                    <div style={{ fontSize: 10, color: eZgjedhur ? "#90caf9" : "#90a4ae" }}>{MUAJT_SQ[d.getMonth()]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {hapi === 3 && (
          <div>
            <button onClick={() => setHapi(2)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>← Kthehu</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>Zgjidhni orën</h2>
            <p style={{ color: "#78909c", marginBottom: 20 }}>{formatData(zgj.data)}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {ORARET.map(ora => {
                const zene = oraEZene(zgj.data, ora);
                const eZgjedhur = zgj.ora === ora;
                return (
                  <div key={ora} onClick={() => { if (!zene) { setZgj({ ...zgj, ora }); setHapi(4); } }} style={{ background: zene ? "#f5f5f5" : eZgjedhur ? "#1976d2" : "#fff", border: `2px solid ${zene ? "#e0e0e0" : eZgjedhur ? "#1976d2" : "#e3eaf5"}`, borderRadius: 10, padding: "14px 10px", textAlign: "center", cursor: zene ? "not-allowed" : "pointer", opacity: zene ? 0.4 : 1, fontWeight: 700, color: zene ? "#bdbdbd" : eZgjedhur ? "#fff" : "#0d47a1" }}>
                    {ora}
                    {zene && <div style={{ fontSize: 9, color: "#bdbdbd", fontWeight: 400, marginTop: 2 }}>e zënë</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {hapi === 4 && (
          <div>
            <button onClick={() => setHapi(3)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>← Kthehu</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>Të dhënat tuaja</h2>
            <p style={{ color: "#78909c", marginBottom: 24 }}>Plotësoni informacionin e kontaktit</p>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              {[{ label: "Emri i plotë *", key: "name", type: "text", ph: "Arben Krasniqi" }, { label: "Adresa email *", key: "email", type: "email", ph: "arben@email.al" }, { label: "Numri i telefonit", key: "phone", type: "tel", ph: "069-123-4567" }, { label: "Shënime (opsionale)", key: "shenime", type: "text", ph: "P.sh. ngjyra e makinës..." }].map(f => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#546e7a", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={zgj[f.key]} onChange={e => setZgj({ ...zgj, [f.key]: e.target.value })} style={inputStili} />
                </div>
              ))}
              <button onClick={() => { if (!zgj.name.trim() || !zgj.email.trim()) return tregoProblem("Ju lutemi plotësoni emrin dhe email-in.", "gabim"); setHapi(5); }} style={{ width: "100%", background: "#1976d2", color: "#fff", border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", fontWeight: 700, fontSize: 15, marginTop: 8 }}>
                Vazhdo →
              </button>
            </div>
          </div>
        )}

        {hapi === 5 && (
          <div>
            <button onClick={() => setHapi(4)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>← Kthehu</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>Kontrolloni rezervimin</h2>
            <p style={{ color: "#78909c", marginBottom: 24 }}>A është gjithçka në rregull? Konfirmoni më poshtë.</p>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              {[["Shërbimi", `${sherb?.icon} ${sherb?.name}`], ["Data", formatData(zgj.data)], ["Ora", zgj.ora], ["Kohëzgjatja", `${sherb?.duration} min`], ["Çmimi", `€${sherb?.price}`], ["Emri", zgj.name], ["Email", zgj.email], ["Telefoni", zgj.phone || "—"], ["Shënime", zgj.shenime || "—"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f0f4ff", fontSize: 14 }}>
                  <span style={{ color: "#78909c" }}>{k}</span>
                  <span style={{ fontWeight: 600, color: "#263238" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#f0f7ff", borderRadius: 8, fontSize: 12, color: "#546e7a", textAlign: "center" }}>
                🏢 <strong>Carwash Granit</strong> — Pronar: Granit
              </div>
            </div>
            <button onClick={dergoje} style={{ width: "100%", background: "linear-gradient(135deg, #1976d2, #42a5f5)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", cursor: "pointer", fontWeight: 800, fontSize: 16, boxShadow: "0 4px 16px rgba(25,118,210,0.35)" }}>
              🚗 Konfirmo Rezervimin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PORTALI I PRONARIT
// ═══════════════════════════════════════════════

function PortaliPronarit({ rezervimet, klientet, setKlientet, shtoRezervim, perditesoCtatusin, fshiRezervimin, oraEZene }) {
  const [skeda, setSkeda] = useState("paneli");
  const [rezervimiZgjedhur, setRezervimiZgjedhur] = useState(null);
  const [shfaqFormen, setShfaqFormen] = useState(false);
  const [rezervimRi, setRezervimRi] = useState({ name: "", email: "", phone: "", sherbim: 1, data: "", ora: "09:00", shenime: "" });
  const [skedaEmail, setSkedaEmail] = useState("shkruaj");
  const [sablloniZgjedhur, setSablloniZgjedhur] = useState(0);
  const [marresit, setMarresit] = useState("te_gjithe");
  const [emailetDerguara, setEmailetDerguara] = useState([{ id: 1, subjekti: "Konfirmim Rezervimi", marresit: 2, data: sotDite(), hapur: 2 }]);
  const [njoftim, setNjoftim] = useState(null);

  const tregoProblem = (msg, lloji = "sukses") => { setNjoftim({ msg, lloji }); setTimeout(() => setNjoftim(null), 3000); };

  const statistikat = {
    sot: rezervimet.filter(r => r.data === sotDite()).length,
    total: rezervimet.length,
    te_ardhura: rezervimet.filter(r => r.statusi === "perfunduar").reduce((s, r) => s + (SHERBIMET.find(sh => sh.id === r.sherbim)?.price || 0), 0),
    pritje: rezervimet.filter(r => r.statusi === "pritje").length,
  };

  const shtoRezervimAdmin = () => {
    if (!rezervimRi.name || !rezervimRi.data) return tregoProblem("Ju lutemi plotësoni emrin dhe datën.", "gabim");
    if (oraEZene(rezervimRi.data, rezervimRi.ora)) return tregoProblem("Kjo orë është tashmë e zënë!", "gabim");
    shtoRezervim(rezervimRi);
    setShfaqFormen(false);
    setRezervimRi({ name: "", email: "", phone: "", sherbim: 1, data: "", ora: "09:00", shenime: "" });
    tregoProblem("Rezervimi u shtua!");
  };

  const sot = new Date();
  const javaData = [];
  const ditaJaves = sot.getDay();
  const diferencë = sot.getDate() - ditaJaves + (ditaJaves === 0 ? -6 : 1);
  const e_hena = new Date(sot); e_hena.setDate(diferencë);
  for (let i = 0; i < 7; i++) { const d = new Date(e_hena); d.setDate(e_hena.getDate() + i); javaData.push(d); }

  const inputStili2 = { width: "100%", background: "#141824", border: "1px solid #252a3a", borderRadius: 7, padding: "8px 11px", color: "#e8eaf0", fontSize: 13, boxSizing: "border-box", fontFamily: "'Segoe UI', sans-serif" };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#0f1117", minHeight: "100vh", color: "#e8eaf0", display: "flex", flexDirection: "column" }}>
      {njoftim && <Njoftim {...njoftim} />}

      <div style={{ background: "#141824", borderBottom: "1px solid #252a3a", padding: "0 20px", display: "flex", alignItems: "center", gap: 10, height: 60, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #29b6f6, #0288d1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔧</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.3 }}>Carwash Granit</div>
            <div style={{ fontSize: 9, color: "#29b6f6", letterSpacing: 1, fontWeight: 600 }}>PRONAR: GRANIT</div>
          </div>
        </div>
        {[{ id: "paneli", icon: "📊", label: "Paneli" }, { id: "planifikimi", icon: "📅", label: "Planifikimi" }, { id: "rezervimet", icon: "📋", label: "Rezervimet" }, { id: "klientet", icon: "👥", label: "Klientët" }, { id: "marketing", icon: "📧", label: "Marketing" }].map(t => (
          <button key={t.id} onClick={() => setSkeda(t.id)} style={{ background: skeda === t.id ? "rgba(41,182,246,0.15)" : "transparent", border: skeda === t.id ? "1px solid rgba(41,182,246,0.4)" : "1px solid transparent", color: skeda === t.id ? "#29b6f6" : "#78909c", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: 22, overflowY: "auto" }}>

        {skeda === "paneli" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Mirësevini, Granit! 👋</h2>
              <div style={{ fontSize: 12, color: "#546e7a", background: "#1a1f2e", border: "1px solid #252a3a", padding: "6px 14px", borderRadius: 20 }}>🏢 Pronar: Granit</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
              {[{ label: "Sot", value: statistikat.sot, icon: "📅", color: "#29b6f6" }, { label: "Totali i rezervimeve", value: statistikat.total, icon: "🗓️", color: "#66bb6a" }, { label: "Të ardhura (përfunduar)", value: `€${statistikat.te_ardhura}`, icon: "💶", color: "#ffa726" }, { label: "Në pritje", value: statistikat.pritje, icon: "⏳", color: "#ef5350" }].map((s, i) => (
                <div key={i} style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#546e7a", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>📋 Rezervimet e fundit</div>
                {rezervimet.slice(0,5).map(r => { const sh = SHERBIMET.find(s => s.id === r.sherbim); return (
                  <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 0", borderBottom: "1px solid #1e2332" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusNgjyra(r.statusi), flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: "#546e7a" }}>{sh?.name} · {r.data} {r.ora}</div>
                    </div>
                    <span style={{ fontSize: 10, color: statusNgjyra(r.statusi), fontWeight: 600 }}>{statusEtiketa(r.statusi)}</span>
                  </div>
                ); })}
                {rezervimet.length === 0 && <div style={{ fontSize: 12, color: "#546e7a", textAlign: "center", padding: 16 }}>Asnjë rezervim</div>}
              </div>
              <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>🛎️ Shërbimet</div>
                {SHERBIMET.map(s => { const count = rezervimet.filter(r => r.sherbim === s.id).length; const pct = rezervimet.length ? Math.round((count/rezervimet.length)*100) : 0; return (
                  <div key={s.id} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                      <span style={{ color: "#546e7a" }}>{count}× · €{s.price}</span>
                    </div>
                    <div style={{ background: "#252a3a", borderRadius: 3, height: 5 }}><div style={{ width: `${pct}%`, height: "100%", background: "#29b6f6", borderRadius: 3 }} /></div>
                  </div>
                ); })}
              </div>
            </div>
          </div>
        )}

        {skeda === "planifikimi" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>📅 Planifikimi Javor</h2>
              <button onClick={() => setShfaqFormen(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>+ Rezervim i Ri</button>
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "65px repeat(7,1fr)", background: "#141824", borderBottom: "1px solid #252a3a" }}>
                <div style={{ padding: 8, fontSize: 10, color: "#546e7a" }}>Ora</div>
                {javaData.map((d, i) => (
                  <div key={i} style={{ padding: "7px 4px", textAlign: "center", borderLeft: "1px solid #252a3a" }}>
                    <div style={{ fontSize: 10, color: "#546e7a" }}>{"HënMarMërEnjPreShtDie".match(/.{3}/g)[i]}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{d.getDate()}</div>
                  </div>
                ))}
              </div>
              <div style={{ maxHeight: 360, overflowY: "auto" }}>
                {ORARET.map(ora => (
                  <div key={ora} style={{ display: "grid", gridTemplateColumns: "65px repeat(7,1fr)", borderBottom: "1px solid #141824" }}>
                    <div style={{ padding: "5px 8px", fontSize: 10, color: "#546e7a", paddingTop: 8 }}>{ora}</div>
                    {javaData.map((d, di) => {
                      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                      const rez = rezervimet.find(r => r.data === ds && r.ora === ora && r.statusi !== "anuluar");
                      return (
                        <div key={di} onClick={() => rez && setRezervimiZgjedhur(rez)} style={{ borderLeft: "1px solid #141824", minHeight: 30, padding: 3, cursor: rez ? "pointer" : "default" }}>
                          {rez && <div style={{ background: "#29b6f622", border: "1px solid #29b6f644", borderRadius: 4, padding: "2px 4px", fontSize: 9, fontWeight: 600, color: "#29b6f6", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{rez.name.split(" ")[0]}</div>}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {skeda === "rezervimet" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>📋 Të gjitha rezervimet ({rezervimet.length})</h2>
              <button onClick={() => setShfaqFormen(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>+ Rezervim i Ri</button>
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: "#141824" }}>{["Klienti","Shërbimi","Data & Ora","Statusi","Çmimi","Veprimet"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 10 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {rezervimet.length === 0 && <tr><td colSpan={6} style={{ padding: 28, textAlign: "center", color: "#546e7a" }}>Asnjë rezervim</td></tr>}
                  {rezervimet.map(r => { const sh = SHERBIMET.find(s => s.id === r.sherbim); return (
                    <tr key={r.id} style={{ borderTop: "1px solid #1e2332" }}>
                      <td style={{ padding: "10px 14px" }}><div style={{ fontWeight: 600 }}>{r.name}</div><div style={{ fontSize: 10, color: "#546e7a" }}>{r.email}</div></td>
                      <td style={{ padding: "10px 14px" }}><span style={{ background: "#29b6f622", color: "#29b6f6", borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 600 }}>{sh?.name}</span></td>
                      <td style={{ padding: "10px 14px", color: "#b0bec5" }}>{r.data} {r.ora}</td>
                      <td style={{ padding: "10px 14px" }}><span style={{ background: statusNgjyra(r.statusi)+"22", color: statusNgjyra(r.statusi), borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 600 }}>{statusEtiketa(r.statusi)}</span></td>
                      <td style={{ padding: "10px 14px", fontWeight: 700, color: "#66bb6a" }}>€{sh?.price}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                          {r.statusi === "pritje" && <button onClick={() => { perditesoCtatusin(r.id,"konfirmuar"); tregoProblem("Konfirmuar!"); }} style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF5044", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>✓</button>}
                          {r.statusi === "konfirmuar" && <button onClick={() => { perditesoCtatusin(r.id,"perfunduar"); tregoProblem("Përfunduar!"); }} style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F344", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>Gati</button>}
                          <button onClick={() => fshiRezervimin(r.id)} style={{ background: "#ef535022", color: "#ef5350", border: "1px solid #ef535044", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>✕</button>
                        </div>
                      </td>
                    </tr>
                  ); })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {skeda === "klientet" && (
          <div>
            <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800 }}>👥 Klientët ({klientet.length})</h2>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: "#141824" }}>{["Emri","Kontakti","Vizitat","Buletini"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 10 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {klientet.map(k => (
                    <tr key={k.id} style={{ borderTop: "1px solid #1e2332" }}>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#252a3a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: "#29b6f6" }}>{k.name[0]}</div>
                          <span style={{ fontWeight: 600 }}>{k.name}</span>
                          {k.vizita >= 4 && <span style={{ background: "#ffa72622", color: "#ffa726", borderRadius: 5, padding: "1px 5px", fontSize: 9, fontWeight: 700 }}>VIP</span>}
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px" }}><div style={{ fontSize: 12 }}>{k.email}</div><div style={{ fontSize: 10, color: "#546e7a" }}>{k.phone}</div></td>
                      <td style={{ padding: "10px 14px", fontWeight: 700 }}>{k.vizita}×</td>
                      <td style={{ padding: "10px 14px" }}>
                        <button onClick={() => setKlientet(klientet.map(x => x.id === k.id ? { ...x, abonuar: !x.abonuar } : x))} style={{ background: k.abonuar ? "#4CAF5022" : "#ef535022", color: k.abonuar ? "#4CAF50" : "#ef5350", border: `1px solid ${k.abonuar ? "#4CAF5044" : "#ef535044"}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                          {k.abonuar ? "✓ I abonuar" : "✕ I çabonuar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {skeda === "marketing" && (
          <div>
            <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800 }}>📧 Marketing me Email</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["shkruaj","historia"].map(t => (
                <button key={t} onClick={() => setSkedaEmail(t)} style={{ background: skedaEmail === t ? "rgba(41,182,246,0.15)" : "transparent", border: skedaEmail === t ? "1px solid rgba(41,182,246,0.4)" : "1px solid #252a3a", color: skedaEmail === t ? "#29b6f6" : "#78909c", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>
                  {t === "shkruaj" ? "✍️ Shkruaj" : "📜 Historia"}
                </button>
              ))}
            </div>
            {skedaEmail === "shkruaj" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 12 }}>1. Zgjidhni shabllonin</div>
                    {SABLLONET_EMAIL.map((t, i) => (
                      <div key={t.id} onClick={() => setSablloniZgjedhur(i)} style={{ background: sablloniZgjedhur === i ? "rgba(41,182,246,0.1)" : "#141824", border: sablloniZgjedhur === i ? "1px solid rgba(41,182,246,0.4)" : "1px solid #252a3a", borderRadius: 8, padding: "9px 12px", cursor: "pointer", marginBottom: 7 }}>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{t.name}</div>
                        <div style={{ fontSize: 10, color: "#546e7a", marginTop: 2 }}>{t.subjekti}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                    <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 12 }}>2. Zgjidhni marrësit</div>
                    {[{ value: "te_gjithe", label: "Të gjithë abonentët", count: klientet.filter(k => k.abonuar).length }, { value: "vip", label: "Vetëm klientët VIP", count: klientet.filter(k => k.vizita >= 4 && k.abonuar).length }].map(r => (
                      <div key={r.value} onClick={() => setMarresit(r.value)} style={{ background: marresit === r.value ? "rgba(41,182,246,0.1)" : "#141824", border: marresit === r.value ? "1px solid rgba(41,182,246,0.4)" : "1px solid #252a3a", borderRadius: 8, padding: "9px 12px", cursor: "pointer", marginBottom: 7, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{r.label}</span>
                        <span style={{ background: "#252a3a", borderRadius: 10, padding: "1px 7px", fontSize: 11, color: "#29b6f6", fontWeight: 700 }}>{r.count}</span>
                      </div>
                    ))}
                    <button onClick={() => { const t = SABLLONET_EMAIL[sablloniZgjedhur]; const count = marresit === "te_gjithe" ? klientet.filter(k => k.abonuar).length : klientet.filter(k => k.vizita >= 4 && k.abonuar).length; setEmailetDerguara([{ id: Date.now(), subjekti: t.subjekti, marresit: count, data: sotDite(), hapur: 0 }, ...emailetDerguara]); tregoProblem(`Email u dërgua te ${count} klient(ë)!`); }} style={{ width: "100%", background: "linear-gradient(135deg,#29b6f6,#0288d1)", color: "#000", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 800, fontSize: 13, marginTop: 8 }}>📤 Dërgo</button>
                  </div>
                </div>
                <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 12 }}>Shembull emaili</div>
                  <div style={{ background: "#141824", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 10, color: "#546e7a", marginBottom: 3 }}>SUBJEKTI</div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, borderBottom: "1px solid #252a3a", paddingBottom: 10 }}>{SABLLONET_EMAIL[sablloniZgjedhur].subjekti}</div>
                    <div style={{ whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.7, color: "#b0bec5" }}>{SABLLONET_EMAIL[sablloniZgjedhur].teksti}</div>
                  </div>
                </div>
              </div>
            )}
            {skedaEmail === "historia" && (
              <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead><tr style={{ background: "#141824" }}>{["Subjekti","Data","Marrësit","Hapjet"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 10 }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {emailetDerguara.map(e => (
                      <tr key={e.id} style={{ borderTop: "1px solid #1e2332" }}>
                        <td style={{ padding: "12px 14px", fontWeight: 600 }}>{e.subjekti}</td>
                        <td style={{ padding: "12px 14px", color: "#b0bec5" }}>{e.data}</td>
                        <td style={{ padding: "12px 14px" }}>{e.marresit}</td>
                        <td style={{ padding: "12px 14px" }}><span style={{ color: "#29b6f6", fontWeight: 700 }}>{e.marresit ? Math.round((e.hapur/e.marresit)*100) : 0}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {shfaqFormen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 16, padding: 24, width: 370, maxWidth: "95vw" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>Rezervim i Ri</h3>
            {[{ label: "Emri *", key: "name", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Telefoni", key: "phone", type: "tel" }, { label: "Data *", key: "data", type: "date" }].map(f => (
              <div key={f.key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>{f.label}</label>
                <input type={f.type} value={rezervimRi[f.key]} onChange={e => setRezervimRi({ ...rezervimRi, [f.key]: e.target.value })} style={inputStili2} />
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>Shërbimi</label>
              <select value={rezervimRi.sherbim} onChange={e => setRezervimRi({ ...rezervimRi, sherbim: Number(e.target.value) })} style={inputStili2}>
                {SHERBIMET.map(s => <option key={s.id} value={s.id}>{s.name} – €{s.price}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>Ora</label>
              <select value={rezervimRi.ora} onChange={e => setRezervimRi({ ...rezervimRi, ora: e.target.value })} style={inputStili2}>
                {ORARET.map(o => { const zene = rezervimRi.data && oraEZene(rezervimRi.data, o); return <option key={o} value={o} disabled={zene}>{o}{zene ? " — e zënë" : ""}</option>; })}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={shtoRezervimAdmin} style={{ flex: 1, background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 700 }}>Ruaj</button>
              <button onClick={() => setShfaqFormen(false)} style={{ flex: 1, background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 600 }}>Anulo</button>
            </div>
          </div>
        </div>
      )}

      {rezervimiZgjedhur && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 16, padding: 24, width: 350, maxWidth: "95vw" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 16 }}>{rezervimiZgjedhur.name}</h3>
            {[["Shërbimi", SHERBIMET.find(s => s.id === rezervimiZgjedhur.sherbim)?.name], ["Data", rezervimiZgjedhur.data], ["Ora", rezervimiZgjedhur.ora], ["Statusi", statusEtiketa(rezervimiZgjedhur.statusi)], ["Shënime", rezervimiZgjedhur.shenime || "—"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1e2332", fontSize: 13 }}>
                <span style={{ color: "#546e7a" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {rezervimiZgjedhur.statusi === "pritje" && <button onClick={() => { perditesoCtatusin(rezervimiZgjedhur.id,"konfirmuar"); setRezervimiZgjedhur(null); tregoProblem("Konfirmuar!"); }} style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF5044", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✓ Konfirmo</button>}
              {rezervimiZgjedhur.statusi === "konfirmuar" && <button onClick={() => { perditesoCtatusin(rezervimiZgjedhur.id,"perfunduar"); setRezervimiZgjedhur(null); tregoProblem("Përfunduar!"); }} style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F344", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✓ Gati</button>}
              <button onClick={() => { fshiRezervimin(rezervimiZgjedhur.id); setRezervimiZgjedhur(null); tregoProblem("U fshi.","kujdes"); }} style={{ background: "#ef535022", color: "#ef5350", border: "1px solid #ef535044", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✕ Fshi</button>
              <button onClick={() => setRezervimiZgjedhur(null)} style={{ background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12, marginLeft: "auto" }}>Mbyll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// FAQJA KRYESORE
// ═══════════════════════════════════════════════

export default function App() {
  const [pamja, setPamja] = useState("kryesore");
  const gjendja = useGjendjaEPerbashket();

  if (pamja === "klient") return (
    <div>
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
        <button onClick={() => setPamja("kryesore")} style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>← Kthehu</button>
      </div>
      <PortaliKlientit oraEZene={gjendja.oraEZene} shtoRezervim={gjendja.shtoRezervim} />
    </div>
  );

  if (pamja === "pronar") return (
    <div>
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
        <button onClick={() => setPamja("kryesore")} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 700, boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>← Kthehu</button>
      </div>
      <PortaliPronarit {...gjendja} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f1117 0%, #1a2035 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ fontSize: 60, marginBottom: 14 }}>🚗</div>
        <h1 style={{ color: "#fff", fontSize: 34, fontWeight: 900, margin: "0 0 6px", letterSpacing: -1 }}>Carwash Granit</h1>
        <p style={{ color: "#29b6f6", fontSize: 13, fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>PRONAR: GRANIT</p>
        <p style={{ color: "#546e7a", fontSize: 14, marginBottom: 44 }}>Zgjidhni si dëshironi të vazhdoni</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div onClick={() => setPamja("klient")} style={{ background: "linear-gradient(135deg, #1976d2, #42a5f5)", borderRadius: 20, padding: 30, cursor: "pointer", boxShadow: "0 8px 32px rgba(25,118,210,0.35)", transition: "transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🙋</div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 5 }}>Jam Klient</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Rezervoni takimin tuaj për larjen e makinës</div>
          </div>
          <div onClick={() => setPamja("pronar")} style={{ background: "linear-gradient(135deg, #1a1f2e, #252a3a)", border: "1px solid #29b6f633", borderRadius: 20, padding: 30, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transition: "transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🔧</div>
            <div style={{ color: "#29b6f6", fontWeight: 800, fontSize: 17, marginBottom: 5 }}>Jam Pronari</div>
            <div style={{ color: "#546e7a", fontSize: 12 }}>Granit — Menaxhoni rezervimet, klientët & marketingun</div>
          </div>
        </div>
        <p style={{ color: "#1e2535", fontSize: 11, marginTop: 28 }}>Rezervimet sinkronizohen në kohë reale midis të dy portaleve</p>
      </div>
    </div>
  ); 
}

@
