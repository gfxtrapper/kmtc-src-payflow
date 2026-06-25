import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    let reference = url.searchParams.get("reference");
    if (!reference && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      reference = body.reference;
    }
    if (!reference) {
      return new Response(JSON.stringify({ error: "Missing reference" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const paystackKey = Deno.env.get("PAYSTACK_SECRET_KEY")!;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const psRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${paystackKey}` },
    });
    const psData = await psRes.json();
    if (!psRes.ok || !psData.status) {
      return new Response(JSON.stringify({ error: psData.message || "Verify failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const tx = psData.data;
    const admin = createClient(supabaseUrl, serviceKey);
    const status = tx.status === "success" ? "completed" : tx.status === "failed" ? "failed" : "pending";
    const update: any = { status };
    if (status === "completed") update.paid_at = new Date().toISOString();
    const mpesaReceipt = tx.authorization?.receiver_bank_account_number || tx.reference;
    if (tx.channel === "mobile_money") update.mpesa_receipt_number = mpesaReceipt;

    const { error } = await admin.from("payments").update(update).eq("transaction_reference", reference);
    if (error) console.error("update error", error);

    return new Response(JSON.stringify({ status, reference, amount: tx.amount / 100, channel: tx.channel }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
