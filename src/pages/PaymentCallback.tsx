import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaymentCallback() {
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("trxref");
  const [state, setState] = useState<"loading" | "success" | "failed">("loading");
  const [info, setInfo] = useState<any>(null);

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
      setInfo(data);
      setState(data.status === "completed" ? "success" : "failed");
    })();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-md w-full shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {state === "loading" && <><Loader2 className="h-5 w-5 animate-spin" /> Verifying payment...</>}
            {state === "success" && <><CheckCircle className="h-5 w-5 text-success" /> Payment Successful</>}
            {state === "failed" && <><XCircle className="h-5 w-5 text-destructive" /> Payment Failed</>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reference && <p className="text-sm text-muted-foreground">Reference: <span className="font-mono">{reference}</span></p>}
          {info?.amount && <p>Amount: <strong>Ksh {info.amount.toLocaleString()}</strong></p>}
          {state === "success" && <p className="text-sm">Your SRC registration fee has been received. Thank you!</p>}
          {state === "failed" && <p className="text-sm">We couldn't confirm your payment. If money was deducted, contact support with the reference above.</p>}
          <Button asChild className="w-full"><Link to="/">Back to Home</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}
