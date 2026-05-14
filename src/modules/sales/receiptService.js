const ReceiptService = {

  generate(saleId) {

    const sale = DBInstance
      .table("sales")
      .where("id", saleId)[0];

    const items = DBInstance
      .table("sale_items")
      .where("sale_id", saleId);

    let receipt = "";

    receipt += "===== RECEIPT =====\n";
    receipt += `Invoice: ${sale.invoice_no}\n`;
    receipt += `Customer: ${sale.customer_name}\n`;
    receipt += "------------------\n";

    items.forEach(item => {

      const product = DBInstance
        .table("products")
        .where("id", item.product_id)[0];

      receipt += `${product.name}\n`;
      receipt += `${item.quantity} x ${item.price}\n`;
      receipt += `= ${item.subtotal}\n\n`;

    });

    receipt += "------------------\n";
    receipt += `TOTAL: KES ${sale.total_amount}\n`;

    return receipt;
  }
};