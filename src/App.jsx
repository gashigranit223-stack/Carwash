import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Laptop12.3!#";

const TEKST = {
  sq: {
    titulli: "Carwash Granit",
    rezervo: "REZERVO ONLINE",
    pronar: "Pronar: Granit",
    jam_klient: "Jam Klient",
    jam_klient_pershkrim: "Rezervoni takimin tuaj për larjen e makinës",
    jam_pronari: "Jam Pronari",
    jam_pronari_pershkrim: "Granit — Hyrje e mbrojtur me fjalëkalim",
    ruhen: "Rezervimet ruhen automatikisht në databazë",
    hapat: ["Shërbimi","Data","Ora","Të dhënat","Konfirmo"],
    zgj_sherbim: "Zgjidhni shërbimin",
    zgj_sherbim_sub: "Zgjidhni trajtimin që dëshironi",
    zgj_daten: "Zgjidhni datën",
    jave: "2 javët e ardhshme",
    zgj_oren: "Zgjidhni orën",
    te_dhenat: "Të dhënat tuaja",
    te_dhenat_sub: "Plotësoni informacionin e kontaktit",
    emri: "Emri i plotë *",
    email: "Adresa email *",
    telefoni: "Numri i telefonit",
    shenime: "Shënime (opsionale)",
    vazhdo: "Vazhdo →",
    kontrollo: "Kontrolloni rezervimin",
    konfirmo_btn: "🚗 Konfirmo Rezervimin",
    duke_ruajtur: "⏳ Duke ruajtur...",
    rezervim_u_konfirmua: "Rezervimi u konfirmua!",
    faleminderit: "Faleminderit",
    takim_per: "Takimi juaj për",
    me: "më",
    ne_oren: "në orën",
    eshte_regjistruar: "është regjistruar.",
    email_derguar: "📧 Një email konfirmimi u dërgua te",
    rezervim_ri: "Rezervim i Ri",
    kthehu: "← Kthehu",
    e_zene: "e zënë",
    sherbimet_titulli: ["Shërbimi","Data","Ora","Kohëzgjatja","Çmimi","Emri","Email","Telefoni","Shënime"],
    gabim_emri: "Ju lutemi shkruani emrin tuaj.",
    gabim_email: "Ju lutemi shkruani email-in tuaj.",
    gabim_ora: "Kjo orë është zënë. Zgjidhni një orë tjetër.",
    gabim_ploteso: "Ju lutemi plotësoni emrin dhe email-in.",
    min: "min",
    // Admin
    miresevin: "Mirësevini, Granit! 👋",
    sot: "Sot", total: "Totali", ardhura: "Të ardhura", pritje: "Në pritje",
    paneli: "Paneli", planifikimi: "Planifikimi", rezervimet_tab: "Rezervimet", klientet_tab: "Klientët",
    rezervimet_e_fundit: "📋 Rezervimet e fundit",
    asnje_rezervim: "Asnjë rezervim",
    planifikimi_javor: "📅 Planifikimi Javor",
    rezervim_ri_btn: "+ Rezervim i Ri",
    te_gjitha_rezervimet: "📋 Rezervimet",
    klienti: "Klienti", sherbimi: "Shërbimi", data_ora: "Data & Ora", statusi: "Statusi", cmimi: "Çmimi", veprimet: "Veprimet",
    konfirmuar: "Konfirmuar", ne_pritje: "Në Pritje", perfunduar: "Përfunduar", anuluar: "Anuluar",
    gati: "Gati", fshi: "✕ Fshi", mbyll: "Mbyll",
    klientet_titulli: "👥 Klientët",
    asnje_klient: "Asnjë klient ende",
    kontakti: "Kontakti", vizitat: "Vizitat", buletini: "Buletini",
    i_abonuar: "✓ I abonuar", i_cabonuar: "✕ I çabonuar",
    duke_ngarkuar: "⏳ Duke ngarkuar...",
    zona_mbrojtur: "Zonë e mbrojtur", vetem_pronari: "Vetëm për pronarin Granit",
    emri_perdoruesit: "Emri i përdoruesit", fjalekalimi: "Fjalëkalimi",
    shkruani_emrin: "Shkruani emrin e përdoruesit", shkruani_fjalekalimin: "Shkruani fjalëkalimin",
    gabim_login: "Emri i përdoruesit ose fjalëkalimi është i gabuar.",
    kontrollim: "⏳ Kontrollim...", hyr: "🔓 Hyr në panel",
    portali_pronarit: "Portali i Pronarit — Hyrja",
    dil: "🔒 Dil",
    ruaj: "Ruaj", anulo: "Anulo",
    emri_label: "Emri *", data_label: "Data *",
    ploteso: "Plotësoni emrin dhe datën.", ora_zene: "Kjo orë është e zënë!",
    gabim_ruajtjes: "Gabim gjatë ruajtjes.", u_shtua: "Rezervimi u shtua!",
    ora_label: "Ora", sherbimi_label: "Shërbimi",
    konfirmo_action: "✓ Konfirmo", gati_action: "✓ Gati",
    u_fshi: "U fshi.", u_konfirmua: "Konfirmuar!", u_perfundua: "Përfunduar!",
  },
  nl: {
    titulli: "Carwash Granit",
    rezervo: "ONLINE RESERVEREN",
    pronar: "Eigenaar: Granit",
    jam_klient: "Ik ben Klant",
    jam_klient_pershkrim: "Reserveer uw afspraak voor een wasbeurt",
    jam_pronari: "Ik ben de Eigenaar",
    jam_pronari_pershkrim: "Granit — Beveiligde toegang met wachtwoord",
    ruhen: "Reserveringen worden automatisch opgeslagen",
    hapat: ["Service","Datum","Tijd","Gegevens","Bevestig"],
    zgj_sherbim: "Kies uw service",
    zgj_sherbim_sub: "Kies de behandeling die u wenst",
    zgj_daten: "Kies een datum",
    jave: "De komende 2 weken",
    zgj_oren: "Kies een tijd",
    te_dhenat: "Uw gegevens",
    te_dhenat_sub: "Vul uw contactinformatie in",
    emri: "Volledige naam *",
    email: "E-mailadres *",
    telefoni: "Telefoonnummer",
    shenime: "Opmerkingen (optioneel)",
    vazhdo: "Verder →",
    kontrollo: "Controleer uw reservering",
    konfirmo_btn: "🚗 Bevestig Reservering",
    duke_ruajtur: "⏳ Opslaan...",
    rezervim_u_konfirmua: "Reservering bevestigd!",
    faleminderit: "Dank u",
    takim_per: "Uw afspraak voor",
    me: "op",
    ne_oren: "om",
    eshte_regjistruar: "is geregistreerd.",
    email_derguar: "📧 Een bevestigingsmail is verzonden naar",
    rezervim_ri: "Nieuwe Reservering",
    kthehu: "← Terug",
    e_zene: "bezet",
    sherbimet_titulli: ["Service","Datum","Tijd","Duur","Prijs","Naam","Email","Telefoon","Opmerkingen"],
    gabim_emri: "Vul alstublieft uw naam in.",
    gabim_email: "Vul alstublieft uw e-mailadres in.",
    gabim_ora: "Dit tijdslot is bezet. Kies een ander tijdstip.",
    gabim_ploteso: "Vul alstublieft uw naam en e-mailadres in.",
    min: "min",
    // Admin
    miresevin: "Welkom, Granit! 👋",
    sot: "Vandaag", total: "Totaal", ardhura: "Omzet", pritje: "In afwachting",
    paneli: "Dashboard", planifikimi: "Planning", rezervimet_tab: "Reserveringen", klientet_tab: "Klanten",
    rezervimet_e_fundit: "📋 Laatste reserveringen",
    asnje_rezervim: "Geen reserveringen",
    planifikimi_javor: "📅 Weekplanning",
    rezervim_ri_btn: "+ Nieuwe Reservering",
    te_gjitha_rezervimet: "📋 Reserveringen",
    klienti: "Klant", sherbimi: "Service", data_ora: "Datum & Tijd", statusi: "Status", cmimi: "Prijs", veprimet: "Acties",
    konfirmuar: "Bevestigd", ne_pritje: "In afwachting", perfunduar: "Voltooid", anuluar: "Geannuleerd",
    gati: "Klaar", fshi: "✕ Verwijder", mbyll: "Sluiten",
    klientet_titulli: "👥 Klanten",
    asnje_klient: "Nog geen klanten",
    kontakti: "Contact", vizitat: "Bezoeken", buletini: "Nieuwsbrief",
    i_abonuar: "✓ Ingeschreven", i_cabonuar: "✕ Uitgeschreven",
    duke_ngarkuar: "⏳ Laden...",
    zona_mbrojtur: "Beveiligde zone", vetem_pronari: "Alleen voor eigenaar Granit",
    emri_perdoruesit: "Gebruikersnaam", fjalekalimi: "Wachtwoord",
    shkruani_emrin: "Vul uw gebruikersnaam in", shkruani_fjalekalimin: "Vul uw wachtwoord in",
    gabim_login: "Gebruikersnaam of wachtwoord is onjuist.",
    kontrollim: "⏳ Controleren...", hyr: "🔓 Inloggen",
    portali_pronarit: "Eigenaarportaal — Inloggen",
    dil: "🔒 Uitloggen",
    ruaj: "Opslaan", anulo: "Annuleren",
    emri_label: "Naam *", data_label: "Datum *",
    ploteso: "Vul naam en datum in.", ora_zene: "Dit tijdslot is bezet!",
    gabim_ruajtjes: "Fout bij opslaan.", u_shtua: "Reservering toegevoegd!",
    ora_label: "Tijd", sherbimi_label: "Service",
    konfirmo_action: "✓ Bevestig", gati_action: "✓ Klaar",
    u_fshi: "Verwijderd.", u_konfirmua: "Bevestigd!", u_perfundua: "Voltooid!",
  }
};

const SHERBIMET = [
  { id: 1, name: { sq: "Larje Bazë", nl: "Basis Wasbeurt" }, duration: 30, price: 15, icon: "🚿", desc: { sq: "Larje e jashtme + tharje me ajër", nl: "Externe wasbeurt + luchtdroging" } },
  { id: 2, name: { sq: "Larje Deluxe", nl: "Deluxe Wasbeurt" }, duration: 45, price: 25, icon: "✨", desc: { sq: "Larje e jashtme + fshirje brendësi", nl: "Externe wasbeurt + interieur reinigen" } },
  { id: 3, name: { sq: "Lustrim Premium", nl: "Premium Polijsten" }, duration: 90, price: 55, icon: "💎", desc: { sq: "Lustrim i plotë + aplikim dylli", nl: "Volledig polijsten + wasbehandeling" } },
  { id: 4, name: { sq: "Detajim i Plotë", nl: "Volledige Detailing" }, duration: 180, price: 120, icon: "🏆", desc: { sq: "Trajtim i plotë brenda dhe jashtë", nl: "Volledige behandeling binnen en buiten" } },
];

const ORARET = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"];
const DITET = { sq: ["Die","Hën","Mar","Mër","Enj","Pre","Sht"], nl: ["Zo","Ma","Di","Wo","Do","Vr","Za"] };
const MUAJT = { sq: ["jan","shk","mar","pri","maj","qer","kor","gus","sht","tet","nën","dhj"], nl: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"] };

function formatData(d, lang) {
  const dt = new Date(d);
  return `${dt.getDate()} ${MUAJT[lang][dt.getMonth()]} ${dt.getFullYear()}`;
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
const statusEtiketa = (s, t) => ({ konfirmuar: t.konfirmuar, pritje: t.ne_pritje, perfunduar: t.perfunduar, anuluar: t.anuluar }[s] || s);

function TaalKnop({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <button onClick={() => setLang("sq")} style={{ background: lang === "sq" ? "#1976d2" : "transparent", color: lang === "sq" ? "#fff" : "#78909c", border: `1px solid ${lang === "sq" ? "#1976d2" : "#e3eaf5"}`, borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🇦🇱 SQ</button>
      <button onClick={() => setLang("nl")} style={{ background: lang === "nl" ? "#1976d2" : "transparent", color: lang === "nl" ? "#fff" : "#78909c", border: `1px solid ${lang === "nl" ? "#1976d2" : "#e3eaf5"}`, borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🇳🇱 NL</button>
    </div>
  );
}

function TaalKnopDark({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <button onClick={() => setLang("sq")} style={{ background: lang === "sq" ? "#29b6f6" : "transparent", color: lang === "sq" ? "#000" : "#78909c", border: `1px solid ${lang === "sq" ? "#29b6f6" : "#252a3a"}`, borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🇦🇱 SQ</button>
      <button onClick={() => setLang("nl")} style={{ background: lang === "nl" ? "#29b6f6" : "transparent", color: lang === "nl" ? "#000" : "#78909c", border: `1px solid ${lang === "nl" ? "#29b6f6" : "#252a3a"}`, borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🇳🇱 NL</button>
    </div>
  );
}

function Njoftim({ msg, lloji }) {
  const bg = { gabim: "#b71c1c", kujdes: "#e65100", sukses: "#1b5e20" }[lloji] || "#1b5e20";
  return <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, background: bg, color: "#fff", padding: "12px 22px", borderRadius: 10, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.5)", fontSize: 14, maxWidth: 320 }}>{msg}</div>;
}

function InlogScherm({ onIngelogd, lang, setLang }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [fout, setFout] = useState("");
  const [toon, setToon] = useState(false);
  const [bezig, setBezig] = useState(false);
  const t = TEKST[lang];

  const inloggen = () => {
    setBezig(true); setFout("");
    setTimeout(() => {
      if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) { onIngelogd(); }
      else { setFout(t.gabim_login); }
      setBezig(false);
    }, 800);
  };

  const inp = { width: "100%", background: "#1a1f2e", border: "1.5px solid #252a3a", borderRadius: 10, padding: "12px 14px", color: "#e8eaf0", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Segoe UI', sans-serif" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f1117 0%, #1a2035 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ width: 380, maxWidth: "95vw" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><TaalKnopDark lang={lang} setLang={setLang} /></div>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🚗</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>Carwash Granit</h1>
          <p style={{ color: "#546e7a", fontSize: 13, margin: 0 }}>{t.portali_pronarit}</p>
        </div>
        <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 20, padding: 32, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, padding: "10px 14px", background: "#141824", borderRadius: 10, border: "1px solid #29b6f633" }}>
            <span style={{ fontSize: 18 }}>🔒</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#29b6f6" }}>{t.zona_mbrojtur}</div>
              <div style={{ fontSize: 11, color: "#546e7a" }}>{t.vetem_pronari}</div>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#78909c", display: "block", marginBottom: 6 }}>{t.emri_perdoruesit}</label>
            <input type="text" placeholder={t.shkruani_emrin} value={user} onChange={e => setUser(e.target.value)} onKeyDown={e => e.key === "Enter" && inloggen()} style={inp} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#78909c", display: "block", marginBottom: 6 }}>{t.fjalekalimi}</label>
            <div style={{ position: "relative" }}>
              <input type={toon ? "text" : "password"} placeholder={t.shkruani_fjalekalimin} value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && inloggen()} style={{ ...inp, paddingRight: 44 }} />
              <button onClick={() => setToon(!toon)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#546e7a" }}>{toon ? "🙈" : "👁️"}</button>
            </div>
          </div>
          {fout && <div style={{ background: "#b71c1c22", border: "1px solid #b71c1c44", borderRadius: 8, padding: "10px 14px", margin: "12px 0", fontSize: 13, color: "#ef5350" }}>⚠️ {fout}</div>}
          <button onClick={inloggen} disabled={bezig} style={{ width: "100%", background: bezig ? "#252a3a" : "linear-gradient(135deg, #29b6f6, #0288d1)", color: bezig ? "#546e7a" : "#000", border: "none", borderRadius: 10, padding: "13px", cursor: bezig ? "not-allowed" : "pointer", fontWeight: 800, fontSize: 15, marginTop: 12 }}>
            {bezig ? t.kontrollim : t.hyr}
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
      const sh = SHERBIMET.find(s => s.id === rez.sherbim);
      try {
        await fetch("/api/stuur-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ naam: rez.name, email: rez.email, sherbim: sh?.name?.sq, data: rez.data, ora: rez.ora, phone: rez.phone })
        });
      } catch (e) { console.error("Email fout:", e); }
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

function PortaliKlientit({ oraEZene, shtoRezervim, lang, setLang }) {
  const [hapi, setHapi] = useState(1);
  const [zgj, setZgj] = useState({ sherbim: null, data: null, ora: null, name: "", email: "", phone: "", shenime: "" });
  const [njoftim, setNjoftim] = useState(null);
  const [perfunduar, setPerfunduar] = useState(false);
  const [bezig, setBezig] = useState(false);
  const ditet = get14Ditet();
  const sherb = SHERBIMET.find(s => s.id === zgj.sherbim);
  const t = TEKST[lang];
  const trego = (msg, lloji = "sukses") => { setNjoftim({ msg, lloji }); setTimeout(() => setNjoftim(null), 3500); };

  const dergoje = async () => {
    if (!zgj.name.trim()) return trego(t.gabim_emri, "gabim");
    if (!zgj.email.trim()) return trego(t.gabim_email, "gabim");
    setBezig(true);
    const ok = await shtoRezervim({ name: zgj.name, email: zgj.email, phone: zgj.phone, sherbim: zgj.sherbim, data: zgj.data, ora: zgj.ora, shenime: zgj.shenime });
    setBezig(false);
    if (!ok) return trego(t.gabim_ora, "gabim");
    setPerfunduar(true);
  };

  const inp = { width: "100%", background: "#f8faff", border: "1.5px solid #e3eaf5", borderRadius: 10, padding: "10px 14px", color: "#263238", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Segoe UI', sans-serif" };

  if (perfunduar) return (
    <div style={{ minHeight: "100vh", background: "#f0f7ff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", maxWidth: 440, boxShadow: "0 8px 40px rgba(0,100,200,0.12)" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ margin: "0 0 10px", color: "#0d47a1" }}>{t.rezervim_u_konfirmua}</h2>
        <p style={{ color: "#546e7a", marginBottom: 16 }}>{t.faleminderit}, <strong>{zgj.name}</strong>! {t.takim_per} <strong>{sherb?.name[lang]}</strong> {t.me} <strong>{formatData(zgj.data, lang)}</strong> {t.ne_oren} <strong>{zgj.ora}</strong> {t.eshte_regjistruar}</p>
        <p style={{ fontSize: 13, color: "#90a4ae", marginBottom: 16 }}>{t.email_derguar} {zgj.email}</p>
        <div style={{ padding: "10px 14px", background: "#f0f7ff", borderRadius: 8, fontSize: 12, color: "#546e7a", marginBottom: 20 }}>🏢 <strong>Carwash Granit</strong> — {t.pronar}</div>
        <button onClick={() => { setPerfunduar(false); setHapi(1); setZgj({ sherbim: null, data: null, ora: null, name: "", email: "", phone: "", shenime: "" }); }} style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>{t.rezervim_ri}</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f2fd 0%, #f0f4ff 100%)", fontFamily: "'Segoe UI', sans-serif" }}>
      {njoftim && <Njoftim {...njoftim} />}
      <div style={{ background: "#fff", borderBottom: "1px solid #e3eaf5", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #1976d2, #42a5f5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚗</div>
          <div><div style={{ fontWeight: 900, fontSize: 20, color: "#0d47a1" }}>Carwash Granit</div><div style={{ fontSize: 11, color: "#90a4ae", letterSpacing: 1 }}>{t.rezervo}</div></div>
        </div>
        <TaalKnop lang={lang} setLang={setLang} />
      </div>
      <div style={{ background: "#fff", borderBottom: "1px solid #e3eaf5", padding: "12px 32px", display: "flex", gap: 6, alignItems: "center", overflowX: "auto" }}>
        {t.hapat.map((label, i) => {
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
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>{t.zgj_sherbim}</h2>
            <p style={{ color: "#78909c", marginBottom: 24 }}>{t.zgj_sherbim_sub}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {SHERBIMET.map(s => (
                <div key={s.id} onClick={() => { setZgj({ ...zgj, sherbim: s.id }); setHapi(2); }} style={{ background: "#fff", border: "2px solid #e3eaf5", borderRadius: 16, padding: 20, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#1976d2"} onMouseLeave={e => e.currentTarget.style.borderColor = "#e3eaf5"}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0d47a1", marginBottom: 4 }}>{s.name[lang]}</div>
                  <div style={{ fontSize: 12, color: "#78909c", marginBottom: 12 }}>{s.desc[lang]}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: "#1976d2" }}>€{s.price}</span>
                    <span style={{ fontSize: 12, color: "#b0bec5" }}>⏱ {s.duration} {t.min}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {hapi === 2 && (
          <div>
            <button onClick={() => setHapi(1)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>{t.kthehu}</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>{t.zgj_daten}</h2>
            <p style={{ color: "#78909c", marginBottom: 16 }}>{t.jave}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {ditet.map(({ str, d }) => {
                const zene = ORARET.every(o => oraEZene(str, o));
                const sel = zgj.data === str;
                return (
                  <div key={str} onClick={() => { if (!zene) { setZgj({ ...zgj, data: str }); setHapi(3); } }} style={{ background: zene ? "#f5f5f5" : sel ? "#1976d2" : "#fff", border: `2px solid ${zene ? "#e0e0e0" : sel ? "#1976d2" : "#e3eaf5"}`, borderRadius: 12, padding: "12px 6px", textAlign: "center", cursor: zene ? "not-allowed" : "pointer", opacity: zene ? 0.5 : 1 }}>
                    <div style={{ fontSize: 10, color: sel ? "#90caf9" : "#90a4ae", marginBottom: 2 }}>{DITET[lang][d.getDay()]}</div>
                    <div style={{ fontWeight: 700, color: sel ? "#fff" : "#0d47a1" }}>{d.getDate()}</div>
                    <div style={{ fontSize: 10, color: sel ? "#90caf9" : "#90a4ae" }}>{MUAJT[lang][d.getMonth()]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {hapi === 3 && (
          <div>
            <button onClick={() => setHapi(2)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>{t.kthehu}</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>{t.zgj_oren}</h2>
            <p style={{ color: "#78909c", marginBottom: 20 }}>{formatData(zgj.data, lang)}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {ORARET.map(ora => {
                const zene = oraEZene(zgj.data, ora);
                const sel = zgj.ora === ora;
                return (
                  <div key={ora} onClick={() => { if (!zene) { setZgj({ ...zgj, ora }); setHapi(4); } }} style={{ background: zene ? "#f5f5f5" : sel ? "#1976d2" : "#fff", border: `2px solid ${zene ? "#e0e0e0" : sel ? "#1976d2" : "#e3eaf5"}`, borderRadius: 10, padding: "14px 10px", textAlign: "center", cursor: zene ? "not-allowed" : "pointer", opacity: zene ? 0.4 : 1, fontWeight: 700, color: zene ? "#bdbdbd" : sel ? "#fff" : "#0d47a1" }}>
                    {ora}{zene && <div style={{ fontSize: 9, color: "#bdbdbd", fontWeight: 400, marginTop: 2 }}>{t.e_zene}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {hapi === 4 && (
          <div>
            <button onClick={() => setHapi(3)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>{t.kthehu}</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>{t.te_dhenat}</h2>
            <p style={{ color: "#78909c", marginBottom: 24 }}>{t.te_dhenat_sub}</p>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              {[{ label: t.emri, key: "name", type: "text", ph: "Arben Krasniqi" }, { label: t.email, key: "email", type: "email", ph: "arben@email.com" }, { label: t.telefoni, key: "phone", type: "tel", ph: "069-123-4567" }, { label: t.shenime, key: "shenime", type: "text", ph: "..." }].map(f => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#546e7a", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={zgj[f.key]} onChange={e => setZgj({ ...zgj, [f.key]: e.target.value })} style={inp} />
                </div>
              ))}
              <button onClick={() => { if (!zgj.name.trim() || !zgj.email.trim()) return trego(t.gabim_ploteso, "gabim"); setHapi(5); }} style={{ width: "100%", background: "#1976d2", color: "#fff", border: "none", borderRadius: 10, padding: "13px", cursor: "pointer", fontWeight: 700, fontSize: 15, marginTop: 8 }}>{t.vazhdo}</button>
            </div>
          </div>
        )}
        {hapi === 5 && (
          <div>
            <button onClick={() => setHapi(4)} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", fontWeight: 600, marginBottom: 16, padding: 0, fontSize: 14 }}>{t.kthehu}</button>
            <h2 style={{ color: "#0d47a1", margin: "0 0 6px" }}>{t.kontrollo}</h2>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 16, marginTop: 16 }}>
              {[[t.sherbimet_titulli[0], `${sherb?.icon} ${sherb?.name[lang]}`], [t.sherbimet_titulli[1], formatData(zgj.data, lang)], [t.sherbimet_titulli[2], zgj.ora], [t.sherbimet_titulli[3], `${sherb?.duration} ${t.min}`], [t.sherbimet_titulli[4], `€${sherb?.price}`], [t.sherbimet_titulli[5], zgj.name], [t.sherbimet_titulli[6], zgj.email], [t.sherbimet_titulli[7], zgj.phone || "—"], [t.sherbimet_titulli[8], zgj.shenime || "—"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f0f4ff", fontSize: 14 }}>
                  <span style={{ color: "#78909c" }}>{k}</span><span style={{ fontWeight: 600, color: "#263238" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#f0f7ff", borderRadius: 8, fontSize: 12, color: "#546e7a", textAlign: "center" }}>🏢 <strong>Carwash Granit</strong> — {t.pronar}</div>
            </div>
            <button onClick={dergoje} disabled={bezig} style={{ width: "100%", background: bezig ? "#90a4ae" : "linear-gradient(135deg, #1976d2, #42a5f5)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", cursor: bezig ? "not-allowed" : "pointer", fontWeight: 800, fontSize: 16 }}>
              {bezig ? t.duke_ruajtur : t.konfirmo_btn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PortaliPronarit({ rezervimet, klientet, shtoRezervim, perditesoCtatusin, fshiRezervimin, oraEZene, perditesaKlientin, duke_ngarkuar, rifresko, onDalje, lang, setLang }) {
  const [skeda, setSkeda] = useState("paneli");
  const [rezSel, setRezSel] = useState(null);
  const [shfaqF, setShfaqF] = useState(false);
  const [rezRi, setRezRi] = useState({ name: "", email: "", phone: "", sherbim: 1, data: "", ora: "09:00", shenime: "" });
  const [njoftim, setNjoftim] = useState(null);
  const t = TEKST[lang];
  const trego = (msg, lloji = "sukses") => { setNjoftim({ msg, lloji }); setTimeout(() => setNjoftim(null), 3000); };

  const stat = {
    sot: rezervimet.filter(r => r.data === sotDite()).length,
    total: rezervimet.length,
    ardhura: rezervimet.filter(r => r.statusi === "perfunduar").reduce((s, r) => s + (SHERBIMET.find(sh => sh.id === r.sherbim)?.price || 0), 0),
    pritje: rezervimet.filter(r => r.statusi === "pritje").length,
  };

  const shtoAdmin = async () => {
    if (!rezRi.name || !rezRi.data) return trego(t.ploteso, "gabim");
    if (oraEZene(rezRi.data, rezRi.ora)) return trego(t.ora_zene, "gabim");
    const ok = await shtoRezervim(rezRi);
    if (!ok) return trego(t.gabim_ruajtjes, "gabim");
    setShfaqF(false); setRezRi({ name: "", email: "", phone: "", sherbim: 1, data: "", ora: "09:00", shenime: "" });
    trego(t.u_shtua);
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
        {[{ id: "paneli", icon: "📊", label: t.paneli }, { id: "planifikimi", icon: "📅", label: t.planifikimi }, { id: "rezervimet", icon: "📋", label: t.rezervimet_tab }, { id: "klientet", icon: "👥", label: t.klientet_tab }].map(tb => (
          <button key={tb.id} onClick={() => setSkeda(tb.id)} style={{ background: skeda === tb.id ? "rgba(41,182,246,0.15)" : "transparent", border: skeda === tb.id ? "1px solid rgba(41,182,246,0.4)" : "1px solid transparent", color: skeda === tb.id ? "#29b6f6" : "#78909c", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{tb.icon} {tb.label}</button>
        ))}
        <TaalKnopDark lang={lang} setLang={setLang} />
        <button onClick={rifresko} style={{ background: "#252a3a", border: "1px solid #29b6f633", color: "#29b6f6", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 12 }}>🔄</button>
        <button onClick={onDalje} style={{ background: "#ef535022", border: "1px solid #ef535044", color: "#ef5350", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{t.dil}</button>
      </div>

      <div style={{ flex: 1, padding: 22, overflowY: "auto" }}>
        {duke_ngarkuar && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: "#546e7a" }}>{t.duke_ngarkuar}</div>}

        {!duke_ngarkuar && skeda === "paneli" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{t.miresevin}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
              {[{ label: t.sot, value: stat.sot, icon: "📅", color: "#29b6f6" }, { label: t.total, value: stat.total, icon: "🗓️", color: "#66bb6a" }, { label: t.ardhura, value: `€${stat.ardhura}`, icon: "💶", color: "#ffa726" }, { label: t.pritje, value: stat.pritje, icon: "⏳", color: "#ef5350" }].map((s, i) => (
                <div key={i} style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#546e7a", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>{t.rezervimet_e_fundit}</div>
              {rezervimet.slice(0,6).map(r => { const sh = SHERBIMET.find(s => s.id === r.sherbim); return (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 0", borderBottom: "1px solid #1e2332" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusNgjyra(r.statusi), flexShrink: 0 }} />
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</div><div style={{ fontSize: 10, color: "#546e7a" }}>{sh?.name[lang]} · {r.data} {r.ora}</div></div>
                  <span style={{ fontSize: 10, color: statusNgjyra(r.statusi), fontWeight: 600 }}>{statusEtiketa(r.statusi, t)}</span>
                </div>
              ); })}
              {rezervimet.length === 0 && <div style={{ fontSize: 12, color: "#546e7a", textAlign: "center", padding: 16 }}>{t.asnje_rezervim}</div>}
            </div>
          </div>
        )}

        {!duke_ngarkuar && skeda === "planifikimi" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{t.planifikimi_javor}</h2>
              <button onClick={() => setShfaqF(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>{t.rezervim_ri_btn}</button>
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "65px repeat(7,1fr)", background: "#141824", borderBottom: "1px solid #252a3a" }}>
                <div style={{ padding: 8, fontSize: 10, color: "#546e7a" }}>{t.ora_label}</div>
                {java.map((d, i) => <div key={i} style={{ padding: "7px 4px", textAlign: "center", borderLeft: "1px solid #252a3a" }}><div style={{ fontSize: 10, color: "#546e7a" }}>{DITET[lang][(i+1)%7]}</div><div style={{ fontSize: 13, fontWeight: 700 }}>{d.getDate()}</div></div>)}
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
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{t.te_gjitha_rezervimet} ({rezervimet.length})</h2>
              <button onClick={() => setShfaqF(true)} style={{ background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>{t.rezervim_ri_btn}</button>
            </div>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: "#141824" }}>{[t.klienti, t.sherbimi, t.data_ora, t.statusi, t.cmimi, t.veprimet].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 10 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {rezervimet.length === 0 && <tr><td colSpan={6} style={{ padding: 28, textAlign: "center", color: "#546e7a" }}>{t.asnje_rezervim}</td></tr>}
                  {rezervimet.map(r => { const sh = SHERBIMET.find(s => s.id === r.sherbim); return (
                    <tr key={r.id} style={{ borderTop: "1px solid #1e2332" }}>
                      <td style={{ padding: "10px 14px" }}><div style={{ fontWeight: 600 }}>{r.name}</div><div style={{ fontSize: 10, color: "#546e7a" }}>{r.email}</div></td>
                      <td style={{ padding: "10px 14px" }}><span style={{ background: "#29b6f622", color: "#29b6f6", borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 600 }}>{sh?.name[lang]}</span></td>
                      <td style={{ padding: "10px 14px", color: "#b0bec5" }}>{r.data} {r.ora}</td>
                      <td style={{ padding: "10px 14px" }}><span style={{ background: statusNgjyra(r.statusi)+"22", color: statusNgjyra(r.statusi), borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 600 }}>{statusEtiketa(r.statusi, t)}</span></td>
                      <td style={{ padding: "10px 14px", fontWeight: 700, color: "#66bb6a" }}>€{sh?.price}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                          {r.statusi === "pritje" && <button onClick={() => { perditesoCtatusin(r.id,"konfirmuar"); trego(t.u_konfirmua); }} style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF5044", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>{t.konfirmo_action}</button>}
                          {r.statusi === "konfirmuar" && <button onClick={() => { perditesoCtatusin(r.id,"perfunduar"); trego(t.u_perfundua); }} style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F344", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>{t.gati_action}</button>}
                          <button onClick={() => fshiRezervimin(r.id)} style={{ background: "#ef535022", color: "#ef5350", border: "1px solid #ef535044", borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontWeight: 600 }}>{t.fshi}</button>
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
            <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800 }}>{t.klientet_titulli} ({klientet.length})</h2>
            <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 12, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: "#141824" }}>{[t.klienti, t.kontakti, t.vizitat, t.buletini].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#546e7a", fontWeight: 600, fontSize: 10 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {klientet.length === 0 && <tr><td colSpan={4} style={{ padding: 28, textAlign: "center", color: "#546e7a" }}>{t.asnje_klient}</td></tr>}
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
                          {k.abonuar ? t.i_abonuar : t.i_cabonuar}
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
            <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>{t.rezervim_ri_btn}</h3>
            {[{ label: t.emri_label, key: "name", type: "text" }, { label: t.email, key: "email", type: "email" }, { label: t.telefoni, key: "phone", type: "tel" }, { label: t.data_label, key: "data", type: "date" }].map(f => (
              <div key={f.key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>{f.label}</label>
                <input type={f.type} value={rezRi[f.key]} onChange={e => setRezRi({ ...rezRi, [f.key]: e.target.value })} style={inp2} />
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>{t.sherbimi_label}</label>
              <select value={rezRi.sherbim} onChange={e => setRezRi({ ...rezRi, sherbim: Number(e.target.value) })} style={inp2}>
                {SHERBIMET.map(s => <option key={s.id} value={s.id}>{s.name[lang]} – €{s.price}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "#78909c", display: "block", marginBottom: 3 }}>{t.ora_label}</label>
              <select value={rezRi.ora} onChange={e => setRezRi({ ...rezRi, ora: e.target.value })} style={inp2}>
                {ORARET.map(o => { const z = rezRi.data && oraEZene(rezRi.data, o); return <option key={o} value={o} disabled={z}>{o}{z ? ` — ${t.e_zene}` : ""}</option>; })}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={shtoAdmin} style={{ flex: 1, background: "#29b6f6", color: "#000", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 700 }}>{t.ruaj}</button>
              <button onClick={() => setShfaqF(false)} style={{ flex: 1, background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontWeight: 600 }}>{t.anulo}</button>
            </div>
          </div>
        </div>
      )}

      {rezSel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1f2e", border: "1px solid #252a3a", borderRadius: 16, padding: 24, width: 350, maxWidth: "95vw" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 16 }}>{rezSel.name}</h3>
            {[[t.sherbimi, SHERBIMET.find(s => s.id === rezSel.sherbim)?.name[lang]], [t.data_label, rezSel.data], [t.ora_label, rezSel.ora], [t.statusi, statusEtiketa(rezSel.statusi, t)], [t.shenime, rezSel.shenime || "—"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1e2332", fontSize: 13 }}>
                <span style={{ color: "#546e7a" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {rezSel.statusi === "pritje" && <button onClick={() => { perditesoCtatusin(rezSel.id,"konfirmuar"); setRezSel(null); trego(t.u_konfirmua); }} style={{ background: "#4CAF5022", color: "#4CAF50", border: "1px solid #4CAF5044", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>{t.konfirmo_action}</button>}
              {rezSel.statusi === "konfirmuar" && <button onClick={() => { perditesoCtatusin(rezSel.id,"perfunduar"); setRezSel(null); trego(t.u_perfundua); }} style={{ background: "#2196F322", color: "#2196F3", border: "1px solid #2196F344", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>{t.gati_action}</button>}
              <button onClick={() => { fshiRezervimin(rezSel.id); setRezSel(null); trego(t.u_fshi,"kujdes"); }} style={{ background: "#ef535022", color: "#ef5350", border: "1px solid #ef535044", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>{t.fshi}</button>
              <button onClick={() => setRezSel(null)} style={{ background: "#252a3a", color: "#e8eaf0", border: "none", borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12, marginLeft: "auto" }}>{t.mbyll}</button>
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
  const [lang, setLang] = useState("sq");
  const gjendja = useGjendja();
  const t = TEKST[lang];

  if (pamja === "klient") return (
    <div>
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
        <button onClick={() => setPamja("kryesore")} style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>{t.kthehu}</button>
      </div>
      <PortaliKlientit oraEZene={gjendja.oraEZene} shtoRezervim={gjendja.shtoRezervim} lang={lang} setLang={setLang} />
    </div>
  );

  if (pamja === "pronar") {
    if (!inloguar) return (
      <div>
        <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
          <button onClick={() => setPamja("kryesore")} style={{ background: "#252a3a", color: "#78909c", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{t.kthehu}</button>
        </div>
        <InlogScherm onIngelogd={() => setInloguar(true)} lang={lang} setLang={setLang} />
      </div>
    );
    return <PortaliPronarit {...gjendja} onDalje={() => { setInloguar(false); setPamja("kryesore"); }} lang={lang} setLang={setLang} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f1117 0%, #1a2035 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><TaalKnopDark lang={lang} setLang={setLang} /></div>
        <div style={{ fontSize: 60, marginBottom: 14 }}>🚗</div>
        <h1 style={{ color: "#fff", fontSize: 34, fontWeight: 900, margin: "0 0 6px", letterSpacing: -1 }}>Carwash Granit</h1>
        <p style={{ color: "#29b6f6", fontSize: 13, fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>{t.pronar.toUpperCase()}</p>
        <p style={{ color: "#546e7a", fontSize: 14, marginBottom: 44 }}>{lang === "sq" ? "Zgjidhni si dëshironi të vazhdoni" : "Kies hoe u wilt doorgaan"}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div onClick={() => setPamja("klient")} style={{ background: "linear-gradient(135deg, #1976d2, #42a5f5)", borderRadius: 20, padding: 30, cursor: "pointer", boxShadow: "0 8px 32px rgba(25,118,210,0.35)", transition: "transform 0.15s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🙋</div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 5 }}>{t.jam_klient}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{t.jam_klient_pershkrim}</div>
          </div>
          <div onClick={() => setPamja("pronar")} style={{ background: "linear-gradient(135deg, #1a1f2e, #252a3a)", border: "1px solid #29b6f633", borderRadius: 20, padding: 30, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transition: "transform 0.15s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🔧</div>
            <div style={{ color: "#29b6f6", fontWeight: 800, fontSize: 17, marginBottom: 5 }}>{t.jam_pronari}</div>
            <div style={{ color: "#546e7a", fontSize: 12 }}>{t.jam_pronari_pershkrim}</div>
          </div>
        </div>
        <p style={{ color: "#1e2535", fontSize: 11, marginTop: 28 }}>{t.ruhen}</p>
      </div>
    </div>
  );
}