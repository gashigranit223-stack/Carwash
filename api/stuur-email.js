export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { naam, email, sherbim, data, ora, phone } = req.body;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Carwash Granit <onboarding@resend.dev>",
      to: "gashigranit223@gmail.com",
      subject: `🚗 Rezervim i Ri — ${naam}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px">
          <div style="background:linear-gradient(135deg,#1976d2,#42a5f5);border-radius:12px;padding:20px;text-align:center;margin-bottom:20px">
            <h1 style="color:#fff;margin:0;font-size:22px">🚗 Carwash Granit</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0">Rezervim i Ri!</p>
          </div>
          <div style="background:#f8faff;border-radius:12px;padding:20px;margin-bottom:16px">
            <h2 style="color:#0d47a1;margin:0 0 16px;font-size:16px">📋 Detajet e Rezervimit</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr style="border-bottom:1px solid #e3eaf5"><td style="padding:8px 0;color:#546e7a;font-size:14px">👤 Emri</td><td style="padding:8px 0;font-weight:700;font-size:14px">${naam}</td></tr>
              <tr style="border-bottom:1px solid #e3eaf5"><td style="padding:8px 0;color:#546e7a;font-size:14px">📧 Email</td><td style="padding:8px 0;font-size:14px">${email}</td></tr>
              <tr style="border-bottom:1px solid #e3eaf5"><td style="padding:8px 0;color:#546e7a;font-size:14px">📱 Telefoni</td><td style="padding:8px 0;font-size:14px">${phone || "—"}</td></tr>
              <tr style="border-bottom:1px solid #e3eaf5"><td style="padding:8px 0;color:#546e7a;font-size:14px">🛎️ Shërbimi</td><td style="padding:8px 0;font-weight:700;color:#1976d2;font-size:14px">${sherbim}</td></tr>
              <tr style="border-bottom:1px solid #e3eaf5"><td style="padding:8px 0;color:#546e7a;font-size:14px">📅 Data</td><td style="padding:8px 0;font-size:14px">${data}</td></tr>
              <tr><td style="padding:8px 0;color:#546e7a;font-size:14px">🕐 Ora</td><td style="padding:8px 0;font-weight:700;font-size:14px">${ora}</td></tr>
            </table>
          </div>
          <div style="background:#e8f5e9;border-radius:8px;padding:12px;text-align:center;font-size:13px;color:#2e7d32">
            ✅ Rezervimi u ruajt automatikisht në databazë
          </div>
          <p style="text-align:center;color:#90a4ae;font-size:11px;margin-top:16px">Carwash Granit — Pronar: Granit</p>
        </div>
      `
    })
  });

  const result = await response.json();
  if (!response.ok) return res.status(500).json({ error: result });
  return res.status(200).json({ ok: true });
}