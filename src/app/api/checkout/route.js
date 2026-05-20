// POST /api/checkout — store lead, return WhatsApp redirect
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, car, series } = body;

    if (!name || !phone || !email || !car) {
      return Response.json({ error: "Sila isi semua ruangan." }, { status: 400 });
    }

    const lead = {
      name,
      phone,
      email,
      car,
      series: series || "Adamas",
      timestamp: new Date().toISOString(),
    };

    // Log lead (replace with Supabase / Google Sheets / email integration)
    console.log("[NEW LEAD]", JSON.stringify(lead, null, 2));

    // Return WhatsApp deep link
    const waMessage = encodeURIComponent(
      `Hi Ottoman! Nama: ${name}. Nak tempah seat cover untuk ${car}, siri ${lead.series}.`
    );
    const waLink = `https://wa.me/60123456789?text=${waMessage}`;

    return Response.json({ success: true, waLink });
  } catch (err) {
    console.error("[CHECKOUT ERROR]", err);
    return Response.json({ error: "Ralat sistem. Sila cuba lagi atau WhatsApp kami." }, { status: 500 });
  }
}
