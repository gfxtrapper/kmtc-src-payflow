import type { ReceiptData } from "@/lib/receipt";
import { CheckCircle } from "lucide-react";

export const Receipt = ({ data }: { data: ReceiptData }) => {
  const rows: [string, string][] = [
    ["Student Name", data.fullName],
    ["Admission Number", data.admissionNumber],
    ["Campus", data.campus],
    ["Phone Number", data.phoneNumber],
    ["Payment Method", data.paymentMethod.toUpperCase()],
    ["Transaction Reference", data.reference],
    ...(data.mpesaReceipt ? ([["M-PESA Receipt", data.mpesaReceipt]] as [string, string][]) : []),
    ["Status", "PAID"],
  ];

  return (
    <div
      id="printable-receipt"
      className="bg-card text-card-foreground rounded-lg shadow-medium overflow-hidden print:shadow-none print:rounded-none"
    >
      <div className="bg-primary text-primary-foreground px-6 py-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">KMTC SRC</h2>
          <p className="text-sm opacity-90">Student Representative Council</p>
          <p className="text-sm opacity-90">Official Payment Receipt</p>
        </div>
        <div className="text-right text-xs opacity-90">
          <p>Date: {new Date(data.paidAt).toLocaleString()}</p>
          <p>Ref: {data.reference}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-success">
          <CheckCircle className="h-5 w-5" />
          <h3 className="font-semibold">Payment Confirmation</h3>
        </div>

        <dl className="divide-y border rounded-md">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-2 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium break-words">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="border border-success/40 bg-success/10 rounded-md p-4 flex items-center justify-between">
          <span className="font-semibold text-success">Amount Paid</span>
          <span className="text-2xl font-bold text-success">Ksh {data.amount.toLocaleString()}</span>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-2">
          This is a system-generated receipt and does not require a signature.
        </p>
      </div>
    </div>
  );
};
