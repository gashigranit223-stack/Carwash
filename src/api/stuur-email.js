export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { naam, email, sherbim, data, ora } = req.body;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Carwash Granit <onboarding@resend.dev>",
      to: email,
      subject: "Rezervimi juaj është konfirmuar ✓",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #1976d2;">🚗 Carwash Granit</h2>
          <p>I/E dashur <strong>${naam}</strong>,</p>
          <p>Rezervimi juaj është konfirmuar!</p>
          <div style="background: #f0f7ff; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <p><strong>Shërbimi:</strong> ${sherbim}</p>
            <p><strong>Data:</strong> ${data}</p>
            <p><strong>Ora:</strong> ${ora}</p>
          </div>
          <p>Në pritje tuaj!</p>
          <p style="color: #546e7a; font-size: 12px;">Carwash Granit — Pronar: Granit</p>
        </div>
      `
    })
  });

  const result = await response.json();
  if (!response.ok) return res.status(500).json({ error: result });
  return res.status(200).json({ ok: true });
}