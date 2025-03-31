import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable properly

const generateInvoice = (orderItem) => {
  if (!orderItem || !orderItem.product) {
    console.error("Invalid order data");
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // ShopXY Invoice Title
  doc.setFontSize(22);
  doc.setTextColor(44, 62, 80);
  doc.text("ShopXY Invoice", pageWidth / 2, 15, { align: "center" });

  // Divider Line
  doc.setDrawColor(200);
  doc.line(14, 20, pageWidth - 14, 20);

  // Order & Payment Details
  doc.setFontSize(12);
  doc.text(`Order ID: ${orderItem._id || "N/A"}`, 14, 30);
  doc.text(`Date: ${new Date(orderItem.createdAt).toLocaleDateString()}`, 14, 38);
  doc.text(`Payment: ${orderItem.paymentType || "N/A"}`, 14, 46);

  // Product Table Header
  const tableColumn = ["Product Name", "Quantity", "Price", "Total"];
  const tableRows = [];

  let grandTotal = 0;
  orderItem.product.forEach((item) => {
    const total = item.quantity * (item.product.discounted_price || 0);
    grandTotal += total;
    tableRows.push([
      item.product.name || "N/A",
      item.quantity || 0,
      `₹${item.product.discounted_price ? item.product.discounted_price.toFixed(2) : "0.00"}`,
      `₹${total.toFixed(2)}`,
    ]);
  });

  // Use autoTable for formatting
  autoTable(doc, {
    startY: 55,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    headStyles: { fillColor: [200, 200, 200], textColor: 0, fontSize: 12 },
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30, halign: "center" },
      2: { cellWidth: 30, halign: "right" },
      3: { cellWidth: 30, halign: "right" },
    },
  });

  // Total Summary Section
  const summaryStartY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text(`Subtotal: ₹${grandTotal.toFixed(2)}`, 150, summaryStartY);
 

  // Footer Section
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Thank you for shopping with ShopXY!", 14, summaryStartY + 30);
  doc.text("ShopXY | support@shopxy.com | +91 98765 43210", 14, summaryStartY + 38);

  // Save PDF
  doc.save(`ShopXY_Invoice_${orderItem._id || "Unknown"}.pdf`);
};

export default generateInvoice;
