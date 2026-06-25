import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Download, Printer } from "lucide-react";
import { downloadReceipt, type ReceiptData } from "@/lib/receipt";
import { Receipt } from "@/components/Receipt";

export default function PaymentCallback() {
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("trxref");
  const [state, setState] = useState<"loading" | "success" | "failed">("loading");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  useEffect(() => {
    if (!reference) {
      setState("failed");
      return;
    }
    (async () => {
      const { data, error } = await supabase.functions.invoke("paystack-verify", {
        body: { reference },
      });
      if (error || !data) {
        setState("failed");
        return;
      }
      if (data.status !== "completed") {
        setState("failed");
        return;
      }
      const { data: row } = await supabase
        .from("payments")
        .select("*")
        .eq("transaction_reference", reference)
        .maybeSingle();
      if (!row) {
        setState("failed");
        return;
      }
      setReceipt({
        reference: row.transaction_reference!,
        fullName: row.full_name,
        admissionNumber: row.admission_number,
        campus: row.campus,
        phoneNumber: row.phone_number,
        amount: Number(row.amount),
        paymentMethod: row.payment_method,
        paidAt: row.paid_at || row.updated_at,
        mpesaReceipt: row.mpesa_receipt_number,
      });
      setState("success");
    })();
  }, [reference]);

  return (
    <div className="min-h-screen bg-muted/30 p-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-medium print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {state === "loading" && <><Loader2 className="h-5 w-5 animate-spin" /> Verifying payment...</>}
              {state === "success" && <><CheckCircle className="h-5 w-5 text-success" /> Payment Successful</>}
              {state === "failed" && <><XCircle className="h-5 w-5 text-destructive" /> Payment Failed</>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reference && (
              <p className="text-sm text-muted-foreground">
                Reference: <span className="font-mono">{reference}</span>
              </p>
            )}
            {state === "success" && receipt && (
              <p className="text-sm">Your SRC registration fee has been received. Download or print your receipt below.</p>
            )}
            {state === "failed" && (
              <p className="text-sm">
                We couldn't confirm your payment. If money was deducted, contact support with the reference above.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {state === "success" && receipt && (
                <>
                  <Button onClick={() => downloadReceipt(receipt)}>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" /> Print
                  </Button>
                </>
              )}
              <Button asChild variant="ghost">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {state === "success" && receipt && <Receipt data={receipt} />}
      </div>
    </div>
  );
}
