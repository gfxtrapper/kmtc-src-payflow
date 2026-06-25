import jsPDF from "jspdf";

export interface ReceiptData {
  reference: string;
  fullName: string;
  admissionNumber: string;
  campus: string;
  phoneNumber: string;
  amount: number;
  paymentMethod: string;
  paidAt: string;
  mpesaReceipt?: string | null;
}

export function generateReceiptPDF(data: ReceiptData): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;

  // Header band
  doc.setFillColor(15, 76, 129); // KMTC blue
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("KMTC SRC", margin, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Student Representative Council", margin, 60);
  doc.text("Official Payment Receipt", margin, 76);

  // Receipt meta (right)
  doc.setFontSize(10);
  doc.text(`Date: ${new Date(data.paidAt).toLocaleString()}`, pageWidth - margin, 60, { align: "right" });
  doc.text(`Ref: ${data.reference}`, pageWidth - margin, 76, { align: "right" });

  // Body
  doc.setTextColor(20, 20, 20);
  let y = 130;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Payment Confirmation", margin, y);
  y += 8;
  doc.setDrawColor(220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const rows: [string, string][] = [
    ["Student Name", data.fullName],
    ["Admission Number", data.admissionNumber],
    ["Campus", data.campus],
    ["Phone Number", data.phoneNumber],
    ["Payment Method", data.paymentMethod.toUpperCase()],
    ["Transaction Reference", data.reference],
    ...(data.mpesaReceipt ? [["M-PESA Receipt", data.mpesaReceipt] as [string, string]] : []),
    ["Status", "PAID"],
  ];

  rows.forEach(([label, value]) => {
    doc.setTextColor(100);
    doc.text(label, margin, y);
    doc.setTextColor(20);
    doc.text(String(value), margin + 180, y);
    y += 22;
  });

  // Amount box
  y += 16;
  doc.setFillColor(240, 247, 240);
  doc.setDrawColor(46, 125, 50);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 64, 6, 6, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(46, 125, 50);
  doc.text("Amount Paid", margin + 20, y + 26);
  doc.setFontSize(22);
  doc.text(`Ksh ${data.amount.toLocaleString()}`, pageWidth - margin - 20, y + 40, { align: "right" });

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  const footerY = doc.internal.pageSize.getHeight() - 60;
  doc.text(
    "This is a system-generated receipt and does not require a signature.",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );
  doc.text("For inquiries, contact the SRC office at your campus.", pageWidth / 2, footerY + 14, {
    align: "center",
  });

  return doc;
}

export function downloadReceipt(data: ReceiptData) {
  const doc = generateReceiptPDF(data);
  doc.save(`SRC-Receipt-${data.reference}.pdf`);
}
