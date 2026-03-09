import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Laptop12.3!#";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Laptop12.3!#";

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

const statusNgjyra = (s) => ({ konfirmuar: "#4CAF50", pritje: "#FF9800", perfunduar: "#2196F3", anuluar: "#9E9E9E" }[s] || "#9E9E9E");
const statusEtiketa = (s) => ({ konfirmuar: "Konfirmuar", pritje: "Në Pritje", perfunduar: "Përfunduar", anuluar: "Anuluar" }[s] || s);

function Njoftim({ msg, lloji }) {
  const bg = { gabim: "#b71c1c", kujdes: "#e65100", sukses: "#1b5e20" }[lloji] || "#1b5e20";
  return <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: bg, color: "#fff", padding: "12px 22px", borderRadius: 10, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.5)", fontSize: 14, maxWidth: 320 }}>{msg}</div>;
}

function InlogScherm({ onIngelogd }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [fout, setFout] = useState("");
  const [toon, setToon] = useState(false);
  const [bezig, setBezig] = useState(false);

  const inloggen = () => {
    setBezig(true);
    setFout("");
    setTimeout(() => {
      if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
        onIngelogd();
      } else {
        setFout("Emri i përdoruesit ose fjalëkalimi është i gabuar.");
      }
      setBezig(false);
    }, 800);
  };

  const inp = { width: "100%", background: "#1a1f2e", border: "1.5px solid #252a3a", borderRadius: 10, padding: "12px 14px", color: "#e8eaf0", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Segoe UI', sans-serif" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f1117 0%, #1a2035 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ width: 380, maxWidth: "95vw" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🚗</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>Carwash Granit</h1>
          <p style={{ color: "#546e7a", fontSize: 13, margin: 0 }}>Portali i Pronarit — Hyrja</p>
        </div>
        <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 20, padding: 32, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, padding: "10px 14px", background: "#141824", borderRadius: 10, border: "1px solid #29b6f633" }}>
            <span style={{ fontSize: 18 }}>🔒</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#29b6f6" }}>Zonë e mbrojtur</div>
              <div style={{ fontSize: 11, color: "#546e7a" }}>Vetëm për pronarin Granit</div>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#78909c", display: "block", marginBottom: 6 }}>Emri i përdoruesit</label>
            <input type="text" placeholder="Shkruani emrin e përdoruesit" value={user} onChange={e => setUser(e.target.value)} onKeyDown={e => e.key === "Enter" && inloggen()} style={inp} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#78909c", display: "block", marginBottom: 6 }}>Fjalëkalimi</label>
            <div style={{ position: "relative" }}>
              <input type={toon ? "text" : "password"} placeholder="Shkruani fjalëkalimin" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && inloggen()} style={{ ...inp, paddingRight: 44 }} />
              <button onClick={() => setToon(!toon)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#546e7a" }}>{toon ? "🙈" : "👁️"}</button>
            </div>
          </div>
          {fout && <div style={{ background: "#b71c1c22", border: "1px solid #b71c1c44", borderRadius: 8, padding: "10px 14px", margin: "12px 0", fontSize: 13, color: "#ef5350" }}>⚠️ {fout}</div>}
          <button onClick={inloggen} disabled={bezig} style={{ width: "100%", background: bezig ? "#252a3a" : "linear-gradient(135deg, #29b6f6, #0288d1)", color: bezig ? "#546e7a" : "#000", border: "none", borderRadius: 10, padding: "13px", cursor: bezig ? "not-allowed" : "pointer", fontWeight: 800, fontSize: 15, marginTop: 12 }}>
            {bezig ? "⏳ Kontrollim..." : "🔓 Hyr në panel"}
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#1e2535", fontSize: 11, marginTop: 20 }}>© Carwash Granit — Pronar: Granit</p>
      </div>
    </div>
  );
}

function useGjendja() {
  const [rezervimet, setRezervimet] = useState([]);
  const [klientet, setKlientet] = useState([]);
  const [duke_ngarkuar, setDukeNgarkuar] = useState(true);

  useEffect(() => { ngarko(); }, []);

  const ngarko = async () => {
    setDukeNgarkuar(true);
    const [r, k] = await Promise.all([
      supabase.from("rezervimet").select("*").order("created_at", { ascending: false }),
      supabase.from("klientet").select("*").order("created_at", { ascending: false }),
    ]);
    if (!r.error && r.data) setRezervimet(r.data);
    if (!k.error && k.data) setKlientet(k.data);
    setDukeNgarkuar(false);
  };

  const oraEZene = (data, ora) => rezervimet.some(r => r.data === data && r.ora === ora && r.statusi !== "anuluar");

  const shtoRezervim = async (rez) => {
    if (oraEZene(rez.data, rez.ora)) return false;
    const { data, error } = await supabase.from("rezervimet").insert([{ ...rez, statusi: "konfirmuar" }]).select();
    if (error) { console.error(error); return false; }
    setRezervimet(prev => [data[0], ...prev]);
    if (rez.email) {
      const ekz = klientet.find(k => k.email === rez.email);
      if (ekz) {
        await supabase.from("klientet").update({ vizita: ekz.vizita + 1 }).eq("email", rez.email);
        setKlientet(prev => prev.map(k => k.email === rez.email ? { ...k, vizita: k.vizita + 1 } : k));
      } else {
        const { data: kd } = await supabase.from("klientet").insert([{ name: rez.name, email: rez.email, phone: rez.phone, vizita: 1, abonuar: true }]).select();
        if (kd) setKlientet(prev => [kd[0], ...prev]);
      }
    }
    return true;
  };

  const perditesoCtatusin = async (id, statusi) => {
    await supabase.from("rezervimet").update({ statusi }).eq("id", id);
    setRezervimet(prev => prev.map(r => r.id === id ? { ...r, statusi } : r));
  };

  const fshiRezervimin = async (id) => {
    await supabase.from("rezervimet").delete().eq("id", id);
    setRezervimet(prev => prev.filter(r => r.id !== id));
  };

  const perditesaKlientin = async (id, nd) => {
    await supabase.from("klientet").update(nd).eq("id", id);
    setKlientet(prev => prev.map(k => k.id === id ? { ...k, ...nd } : k));
  };

  return { rezervimet, klientet, oraEZene, shtoRezervim, perditesoCtatusin, fshiRezervimin, perditesaKlientin, duke_ngarkuar, rifresko: ngarko };
}

function PortaliKlientit({ oraEZene, shtoRezervim }) {
  const [hapi, setHapi] = useState(1);
  const [zgj, setZgj] = useState({ sherbim: null, data: null, ora: null, name: "", email: "", phone: "", shenime: "" });
  const [njoftim, setNjoftim] = useState(null);
  const [perfunduar, setPerfunduar] = useState(false);
  const [bezig, setBezig] = useState(false);
  const ditet = get14Ditet();
  const sherb = SHERBIMET.find(s => s.id === zgj.sherbim);
  const trego = (msg, lloji = "sukses") => { setNjoftim({ msg, lloji }); setTimeout(() => setNjoftim(null), 3500); };

  const dergoje = async () => {
    if (!zgj.name.trim()) return trego("Ju lutemi shkruani emrin tuaj.", "gabim");
    if (!zgj.email.trim()) return trego("Ju lutemi shkruani email-in tuaj.", "gabim");
    setBezig(true);
    const ok = await shtoRezervim({ name: zgj.name, email: zgj.email, phone: zgj.phone, sherbim: zgj.sherbim, data: zgj.data, ora: zgj.ora, shenime: zgj.shenime });
    setBezig(false);
    if (!ok) return trego("Kjo orë është zënë. Zgjidhni një orë tjetër.", "gabim");
    setPerfunduar(true);
  };

  const inp = { width: "100%", background: "#f8faff", border: "1.5px solid #e3eaf5", borderRadius: 10, padding: "10px 14px", color: "#263238", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Segoe UI', sans-serif" };

  if (perfunduar) return (
    <div style={{ minHeight: "100vh", background: "#f0f7ff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", maxWidth: 440, boxShadow: "0 8px 40px rgba(0,100,200,0.12)" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ margin: "0 0 10px", color: "#0d47a1" }}>Rezervimi u konfirmua!</h2>
        <p style={{ color: "#546e7a", marginBottom: 16 }}>Faleminderit, <strong>{zgj.name}</strong>! Takimi juaj për <strong>{sherb?.name}</strong> më <strong>{formatData(zgj.data)}</strong> në orën <strong>{zgj.ora}</strong> është regjistruar.</p>
        <div style={{ padding: "10px 14px", background: "#f0f7ff", borderRadius: 8, fontSize: 12, color: "#546e7a", marginBottom: 20 }}>🏢 <strong>Carwash Granit</strong> — Pronar: Granit</div>
        <button onClick={() => { setPerfunduar(false); setHapi(1); setZgj({ sherbim: null, data: null, ora: null, name: "", email: "", phone: "", shenime: "" }); }} style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Rezervim i Ri</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f2fd 0%, #f0f4ff 100%)", fontFamily: "'Segoe UI', sans-serif" }}>
      {njoftim && <Njoftim {...njoftim} />}
      <div style={{ background: "#fff", borderBottom: "1px solid #e3eaf5", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #1976d2, #42a5f5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚗</div>
          <div><div style={{ fontWeight: 900, fontSize: 20, color: "#0d47a1" }}>Carwash Granit</div><div style={{ fontSize: 11, color: "#90a4ae", letterSpacing: 1 }}>REZERVO ONLINE</div></div>
        </div>
        <div style={{ fontSize: 12, color: "#78909c", background: "#f0f4ff", padding: "6px 14px", borderRadius: 20, fontWeight: 600 }}>👤 Pronar: Granit</div>
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
                <div key={s.id} onClick={() => { setZgj({ ...zgj, sherbim: s.id }); setHapi(2); }} style={{ background: "#fff", border: "2px solid #e3eaf5", borderRadius: 16, padding: 20, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#1976d2"} onMouseLeave={e => e.currentTarget.style.borderColor = "#e3eaf5"}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginTop: 16 }}>
              {ditet.map(({ str, d }) => {
                const zene = ORARET.every(o => oraEZene(str, o));
                const sel = zgj.data === str;
                return (
                  <div key={str} onClick={() => { if (!zene) { setZgj({ ...zgj, data: str }); setHapi(3); } }} style={{ background: zene ? "#f5f5f5" : sel ? "#1976d2" : "#fff", border: `2px solid ${zene ? "#e0e0e0" : sel ? "#1976d2" : "#e3eaf5"}`, borderRadius: 12, padding: "12px 6px", textAlign: "center", cursor: zene ? "not-allowed" : "pointer", opacity: zene ? 0.5 : 1 }}>
                    <div style={{ fontSize: 10, color: sel ? "#90caf9" : "#90a4ae", marginBottom: 2 }}>{DITET_SQ[d.getDay()]}</div>
                    <div style={{ fontWeight: 700, color: sel ? "#fff" : "#0d47a1" }}>{d.getDate()}</div>
                    <div style={{ fontSize: 10, color: sel ? "#90caf9" : "#90a4ae" }}>{MUAJT_SQ[d.getMonth()]}</div>
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
                const sel = zgj.ora === ora;
                return (
                  <div key={ora} onClick={() => { if (!zene) { setZgj({ ...zgj, ora }); setHapi(4); } }} style={{ background: zene ? "#f5f5f5" : sel ? "#1976d2" : "#fff", border: `2px solid ${zene ? "#e0e0e0" : sel ? "#1976d2" : "#e3eaf5"}`, borderRadius: 10, padding: "14px 10px", textAlign: "center", cursor: zene ? "not-allowed" : "pointer", opacity: zene ? 0.4 : 1, fontWeight: 700, color: zene ? "#bdbdbd" : sel ? "#fff" : "#0d47a1" }}>
                    {ora}{zene && <div style={{ fontSize: 9, color: "#bdbdbd", fontWeight: 400, marginTop: 2 }}>e zënë</div>}
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
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginTop: 16 }}>
              {[{ label: "Emri i plotë *", key: "name", type: "text", ph: "Arben Krasniqi" }, { label: "Adresa email *", key: "email", type: "email", ph: "arben@email.al" }, { label: "Numri i telefonit", key: "phone", type: "tel", ph: "069-123-4567" }, { label: "Shënime (opsionale)", key: "shenime", type: "text", ph: "P.sh. ngjyra e makinës..." }].map(f => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#546e7a", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={zgj[f.key]} onChange={e => setZgj({ ...zgj, [f.key]: e.target.value })} style={inp} />
                </div>
              ))}
              <button onClick={() => { if (!zgj.name.trim() || !zgj.email.trim()) return trego("Ju lutemi plotësoni emrin dhe email-in.", "gabim"); setHapi(5); }} style={{ width: "100%", background: "#1976d2", color: "#fff", border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", fontWeight: 700, fontSize: 15, marginTop: 8 }}>Vazhdo →</button>
            </div>
          </div>
        )}
        {hapi === 5 && (
          <div>
            <button onClick={() => setHapi(4)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>← Kthehu</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>Kontrolloni rezervimin</h2>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 16, marginTop: 16 }}>
              {[["Shërbimi", `${sherb?.icon} ${sherb?.name}`], ["Data", formatData(zgj.data)], ["Ora", zgj.ora], ["Kohëzgjatja", `${sherb?.duration} min`], ["Çmimi", `€${sherb?.price}`], ["Emri", zgj.name], ["Email", zgj.email], ["Telefoni", zgj.phone || "—"], ["Shënime", zgj.shenime || "—"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f0f4ff", fontSize: 14 }}>
                  <span style={{ color: "#78909c" }}>{k}</span><span style={{ fontWeight: 600, color: "#263238" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#f0f7ff", borderRadius: 8, fontSize: 12, color: "#546e7a", textAlign: "center" }}>🏢 <strong>Carwash Granit</strong> — Pronar: Granit</div>
            </div>
            <button onClick={dergoje} disabled={bezig} style={{ width: "100%", background: bezig ? "#90a4ae" : "linear-gradient(135deg, #1976d2, #42a5f5)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", cursor: bezig ? "not-allowed" : "pointer", fontWeight: 800, fontSize: 16 }}>
              {bezig ? "⏳ Duke ruajtur..." : "🚗 Konfirmo Rezervimin"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PortaliPronarit({ rezervimet, klientet, shtoRezervim, perditesoCtatusin, fshiRezervimin, oraEZene, perditesaKlientin, duke_ngarkuar, rifresko, onDalje }) {
  const [skeda, setSkeda] = useState("paneli");
  const [rezSel, setRezSel] = useState(null);
  const [shfaqF, setShfaqF] = useState(false);
  const [rezRi, setRezRi] = useState({ name: "", email: "", phone: "", sherbim: 1, data: "", ora: "09:00", shenime: "" });
  const [njoftim, setNjoftim] = useState(null);
  const trego = (msg, lloji = "sukses") => { setNjoftim({ msg, lloji }); setTimeout(() => setNjoftim(null), 3000); };

  const stat = {
    sot: rezervimet.filter(r => r.data === sotDite()).length,
    total: rezervimet.length,
    ardhura: rezervimet.filter(r => r.statusi === "perfunduar").reduce((s, r) => s + (SHERBIMET.find(sh => sh.id === r.sherbim)?.price || 0), 0),
    pritje: rezervimet.filter(r => r.statusi === "pritje").length,
  };

  const shtoAdmin = async () => {
    if (!rezRi.name || !rezRi.data) return trego("Plotësoni emrin dhe datën.", "gabim");
    if (oraEZene(rezRi.data, rezRi.ora)) return trego("Kjo orë është e zënë!", "gabim");
    const ok = await shtoRezervim(rezRi);
    if (!ok) return trego("Gabim gjatë ruajtjes.", "gabim");
    setShfaqF(false); setRezRi({ name: "", email: "", phone: "", sherbim: 1, data: "", ora: "09:00", shenime: "" });
    trego("Rezervimi u shtua!");
  };

  const sot = new Date();
  const java = [];
  const dj = sot.getDay();
  const diff = sot.getDate() - dj + (dj === 0 ? -6 : 1);
  const hen = new Date(sot); hen.setDate(diff);
  for (let i = 0; i < 7; i++) { const d = new Date(hen); d.setDate(hen.getDate() + i); java.push(d); }

  const inp2 = { width: "100%", background: "#141824", border: "1px solid #252a3a", borderRadius: 7, padding: "8px 11px", color: "#e8eaf0", fontSize: 13, boxSizing: "border-box", fontFamily: "'Segoe UI', sans-serif" };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#0f1117", minHeight: "100vh", color: "#e8eaf0", display: "flex", flexDirection: "column" }}>
      {njoftim && <Njoftim {...njoftim} />}
      <div style={{ background: "#141824", borderBottom: "1px solid #252a3a", padding: "0 20px", display: "flex", alignItems: "center", gap: 10, height: 60, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #29b6f6, #0288d1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔧</div>
          <div><div style={{ fontWeight: 900, fontSize: 15 }}>Carwash Granit</div><div style={{ fontSize: 9, color: "#29b6f6", letterSpacing: 1, fontWeight: 600 }}>PRONAR: GRANIT</div></div>
        </div>
        {[{ id: "paneli", icon: "📊", label: "Paneli" }, { id: "planifikimi", icon: "📅", label: "Planifikimi" }, { id: "rezervimet", icon: "📋", label: "Rezervimet" }, { id: "klientet", icon: "👥", label: "Klientët" }].map(t => (
          <button key={t.id} onClick={() => setSkeda(t.id)} style={{ background: skeda === t.id ? "rgba(41,182,246,0.15)" : "transparent", border: skeda === t.id ? "1px solid rgba(41,182,246,0.4)" : "1px solid transparent", color: skeda === t.id ? "#29b6f6" : "#78909c", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{t.icon} {t.label}</button>
        ))}
        <button onClick={rifresko} style={{ background: "#252a3a", border: "1px solid #29b6f633", color: "#29b6f6", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 12 }}>🔄</button>
        <button onClick={onDalje} style={{ background: "#ef535022", border: "1px solid #ef535044", color: "#ef5350", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🔒 Dil</button>
      </div>

      <div style={{ flex: 1, padding: 22, overflowY: "auto" }}>
        {duke_ngarkuar && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: "#546e7a" }}>⏳ Duke ngarkuar...</div>}

        {!duke_ngarkuar && skeda === "paneli" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Mirësevini, Granit! 👋</h2>
              <div style={{ fontSize: 12, color: "#546e7a", background: "#1a1f2e", border: "1px solid #252a3a", padding: "6px 14px", borderRadius: 20 }}>🏢 Pronar: Granit</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
              {[{ label: "Sot", value: stat.sot, icon: "📅", color: "#29b6f6" }, { label: "Totali", value: stat.total, icon: "🗓️", color: "#66bb6a" }, { label: "Të ardhura", value: `€${stat.ardhura}`, icon: "💶", color: "#ffa726" }, { label: "Në pritje", value: stat.pritje, icon: "⏳", color: "#ef5350" }].map((s, i) => (
                <div key={i} style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#546e7a", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>📋 Rezervimet e fundit</div>
              {rezervimet.slice(0,6).map(r => { const sh = SHERBIMET.find(s => s.id === r.sherbim); return (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 0", borderBottom: "1px solid #1e2332" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusNgjyra(r.statusi), flexShrink: 0 }} />
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</div><div style={{ fontSize: 10, color: "#546e7a" }}>{sh?.name} · {r.data} {r.ora}</div></div>
                  <span style={{ fontSize: 10, color: statusNgjyra(r.statusi), fontWeight: 600 }}>{statusEtiketa(r.statusi)}</span>
                </div>
              ); })}
              {rezervimet.length === 0 && <div style={{ fontSize: 12, color: "#546e7a", textAlign: "center", padding: 16 }}>Asnjë rezervim</div>}
            </div>
          </div>
        )}

        {!duke_ngarkuar && skeda === "planifikimi" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>📅 Planifikimi Javor</h2>
              <button onClick={() => setShfaqF(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>+ Rezervim i Ri</button>
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "65px repeat(7,1fr)", background: "#141824", borderBottom: "1px solid #252a3a" }}>
                <div style={{ padding: 8, fontSize: 10, color: "#546e7a" }}>Ora</div>
                {java.map((d, i) => <div key={i} style={{ padding: "7px 4px", textAlign: "center", borderLeft: "1px solid #252a3a" }}><div style={{ fontSize: 10, color: "#546e7a" }}>{"HënMarMërEnjPreShtDie".match(/.{3}/g)[i]}</div><div style={{ fontSize: 13, fontWeight: 700 }}>{d.getDate()}</div></div>)}
              </div>
              <div style={{ maxHeight: 360, overflowY: "auto" }}>
                {ORARET.map(ora => (
                  <div key={ora} style={{ display: "grid", gridTemplateColumns: "65px repeat(7,1fr)", borderBottom: "1px solid #141824" }}>
                    <div style={{ padding: "5px 8px", fontSize: 10, color: "#546e7a", paddingTop: 8 }}>{ora}</div>
                    {java.map((d, di) => {
                      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                      const rez = rezervimet.find(r => r.data === ds && r.ora === ora && r.statusi !== "anuluar");
                      return <div key={di} onClick={() => rez && setRezSel(rez)} style={{ borderLeft: "1px solid #141824", minHeight: 30, padding: 3, cursor: rez ? "pointer" : "default" }}>{rez && <div style={{ background: "#29b6f622", border: "1px solid #29b6f644", borderRadius: 4, padding: "2px 4px", fontSize: 9, fontWeight: 600, color: "#29b6f6", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{rez.name.split(" ")[0]}</div>}</div>;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!duke_ngarkuar && skeda === "rezervimet" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>📋 Rezervimet ({rezervimet.length})</h2>
              <button onClick={() => setShfaqF(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>+ Rezervim i Ri</button>
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
                          {r.statusi === "pritje" && <button onClick={() => { perditesoCtatusin(r.id,"konfirmuar"); trego("Konfirmuar!"); }} style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF5044", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>✓</button>}
                          {r.statusi === "konfirmuar" && <button onClick={() => { perditesoCtatusin(r.id,"perfunduar"); trego("Përfunduar!"); }} style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F344", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>Gati</button>}
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

        {!duke_ngarkuar && skeda === "klientet" && (
          <div>
            <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800 }}>👥 Klientët ({klientet.length})</h2>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: "#141824" }}>{["Emri","Kontakti","Vizitat","Buletini"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 10 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {klientet.length === 0 && <tr><td colSpan={4} style={{ padding: 28, textAlign: "center", color: "#546e7a" }}>Asnjë klient ende</td></tr>}
                  {klientet.map(k => (
                    <tr key={k.id} style={{ borderTop: "1px solid #1e2332" }}>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#252a3a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: "#29b6f6" }}>{k.name[0]}</div>
                          <span style={{ fontWeight: 600 }}>{k.name}</span>
                          {k.vizita >= 4 && <span style={{ background: "#ffa72622", color: "#ffa726", borderRadius: 5, padding: "1px 5px", fontSize: 9, fontWeight: 700 }}>VIP</span>}
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px" }}><div>{k.email}</div><div style={{ fontSize: 10, color: "#546e7a" }}>{k.phone}</div></td>
                      <td style={{ padding: "10px 14px", fontWeight: 700 }}>{k.vizita}×</td>
                      <td style={{ padding: "10px 14px" }}>
                        <button onClick={() => perditesaKlientin(k.id, { abonuar: !k.abonuar })} style={{ background: k.abonuar ? "#4CAF5022" : "#ef535022", color: k.abonuar ? "#4CAF50" : "#ef5350", border: `1px solid ${k.abonuar ? "#4CAF5044" : "#ef535044"}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
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
      </div>

      {shfaqF && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 16, padding: 24, width: 370, maxWidth: "95vw" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>Rezervim i Ri</h3>
            {[{ label: "Emri *", key: "name", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Telefoni", key: "phone", type: "tel" }, { label: "Data *", key: "data", type: "date" }].map(f => (
              <div key={f.key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>{f.label}</label>
                <input type={f.type} value={rezRi[f.key]} onChange={e => setRezRi({ ...rezRi, [f.key]: e.target.value })} style={inp2} />
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>Shërbimi</label>
              <select value={rezRi.sherbim} onChange={e => setRezRi({ ...rezRi, sherbim: Number(e.target.value) })} style={inp2}>
                {SHERBIMET.map(s => <option key={s.id} value={s.id}>{s.name} – €{s.price}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>Ora</label>
              <select value={rezRi.ora} onChange={e => setRezRi({ ...rezRi, ora: e.target.value })} style={inp2}>
                {ORARET.map(o => { const z = rezRi.data && oraEZene(rezRi.data, o); return <option key={o} value={o} disabled={z}>{o}{z ? " — e zënë" : ""}</option>; })}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={shtoAdmin} style={{ flex: 1, background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 700 }}>Ruaj</button>
              <button onClick={() => setShfaqF(false)} style={{ flex: 1, background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 600 }}>Anulo</button>
            </div>
          </div>
        </div>
      )}

      {rezSel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 16, padding: 24, width: 350, maxWidth: "95vw" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 16 }}>{rezSel.name}</h3>
            {[["Shërbimi", SHERBIMET.find(s => s.id === rezSel.sherbim)?.name], ["Data", rezSel.data], ["Ora", rezSel.ora], ["Statusi", statusEtiketa(rezSel.statusi)], ["Shënime", rezSel.shenime || "—"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1e2332", fontSize: 13 }}>
                <span style={{ color: "#546e7a" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {rezSel.statusi === "pritje" && <button onClick={() => { perditesoCtatusin(rezSel.id,"konfirmuar"); setRezSel(null); trego("Konfirmuar!"); }} style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF5044", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✓ Konfirmo</button>}
              {rezSel.statusi === "konfirmuar" && <button onClick={() => { perditesoCtatusin(rezSel.id,"perfunduar"); setRezSel(null); trego("Përfunduar!"); }} style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F344", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✓ Gati</button>}
              <button onClick={() => { fshiRezervimin(rezSel.id); setRezSel(null); trego("U fshi.","kujdes"); }} style={{ background: "#ef535022", color: "#ef5350", border: "1px solid #ef535044", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>✕ Fshi</button>
              <button onClick={() => setRezSel(null)} style={{ background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12, marginLeft: "auto" }}>Mbyll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [pamja, setPamja] = useState("kryesore");
  const [inloguar, setInloguar] = useState(false);
  const gjendja = useGjendja();

  if (pamja === "klient") return (
    <div>
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
        <button onClick={() => setPamja("kryesore")} style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>← Kthehu</button>
      </div>
      <PortaliKlientit oraEZene={gjendja.oraEZene} shtoRezervim={gjendja.shtoRezervim} />
    </div>
  );

  if (pamja === "pronar") {
    if (!inloguar) return (
      <div>
        <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
          <button onClick={() => setPamja("kryesore")} style={{ background: "#252a3a", color: "#78909c", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>← Kthehu</button>
        </div>
        <InlogScherm onIngelogd={() => setInloguar(true)} />
      </div>
    );
    return <PortaliPronarit {...gjendja} onDalje={() => { setInloguar(false); setPamja("kryesore"); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f1117 0%, #1a2035 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ fontSize: 60, marginBottom: 14 }}>🚗</div>
        <h1 style={{ color: "#fff", fontSize: 34, fontWeight: 900, margin: "0 0 6px", letterSpacing: -1 }}>Carwash Granit</h1>
        <p style={{ color: "#29b6f6", fontSize: 13, fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>PRONAR: GRANIT</p>
        <p style={{ color: "#546e7a", fontSize: 14, marginBottom: 44 }}>Zgjidhni si dëshironi të vazhdoni</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div onClick={() => setPamja("klient")} style={{ background: "linear-gradient(135deg, #1976d2, #42a5f5)", borderRadius: 20, padding: 30, cursor: "pointer", boxShadow: "0 8px 32px rgba(25,118,210,0.35)", transition: "transform 0.15s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🙋</div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 5 }}>Jam Klient</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Rezervoni takimin tuaj për larjen e makinës</div>
          </div>
          <div onClick={() => setPamja("pronar")} style={{ background: "linear-gradient(135deg, #1a1f2e, #252a3a)", border: "1px solid #29b6f633", borderRadius: 20, padding: 30, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transition: "transform 0.15s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🔧</div>
            <div style={{ color: "#29b6f6", fontWeight: 800, fontSize: 17, marginBottom: 5 }}>Jam Pronari</div>
            <div style={{ color: "#546e7a", fontSize: 12 }}>Granit — Hyrje e mbrojtur me fjalëkalim</div>
          </div>
        </div>
        <p style={{ color: "#1e2535", fontSize: 11, marginTop: 28 }}>Rezervimet ruhen automatikisht në databazë</p>
      </div>
    </div>
  );
}
