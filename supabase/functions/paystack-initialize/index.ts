import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const paystackKey = Deno.env.get("PAYSTACK_SECRET_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const user = userData.user;

    const body = await req.json();
    const { fullName, admissionNumber, campus, phoneNumber, paymentMethod, email } = body;
    if (!fullName || !admissionNumber || !campus || !phoneNumber || !paymentMethod) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const amountKes = 1500;
    const reference = `SRC-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const admin = createClient(supabaseUrl, serviceKey);
    const { error: insertErr } = await admin.from("payments").insert({
      user_id: user.id,
      full_name: fullName,
      admission_number: admissionNumber,
      campus,
      phone_number: phoneNumber,
      amount: amountKes,
      payment_method: paymentMethod,
      transaction_reference: reference,
      status: "pending",
    });
    if (insertErr) {
      console.error("insert error", insertErr);
      return new Response(JSON.stringify({ error: insertErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const origin = req.headers.get("origin") || "";
    const channels =
      paymentMethod === "mpesa" ? ["mobile_money"] :
      paymentMethod === "bank" ? ["bank", "bank_transfer"] :
      ["card"];

    const psRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email || user.email,
        amount: amountKes * 100, // kobo
        currency: "KES",
        reference,
        callback_url: `${origin}/payment/callback`,
        channels,
        metadata: { user_id: user.id, admissionNumber, campus, phoneNumber, fullName },
      }),
    });
    const psData = await psRes.json();
    if (!psRes.ok || !psData.status) {
      console.error("paystack init failed", psData);
      return new Response(JSON.stringify({ error: psData.message || "Paystack init failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({
      authorization_url: psData.data.authorization_url,
      access_code: psData.data.access_code,
      reference,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
