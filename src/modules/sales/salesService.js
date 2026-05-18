var SalesService = SalesService || {

  createSale(token, payload) {

    const session = requireAuth(token);

    const items = payload.items;

    if (!items || items.length === 0) {
      throw new Error("No sale items");
    }

    let totalAmount = 0;
    let totalProfit = 0;

    const saleId = Utilities.getUuid();

    // CREATE SALE HEADER
    DBInstance.table("sales").insert({
      id: saleId,
      invoice_no: "INV-" + Date.now(),
      customer_name: payload.customer_name || "Walk-in",
      total_amount: 0,
      payment_method: payload.payment_method || "Cash",
      created_by: session.userId,
      created_at: new Date()
    });

    // PROCESS ITEMS
    items.forEach(item => {

      const product = DBInstance
        .table("products")
        .where("id", item.product_id)[0];

      if (!product) {
        throw new Error("Product not found");
      }

      if (!ProductValidator.canSell(product, item.quantity)) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const subtotal =
        Number(product.sell_price) *
        Number(item.quantity);

      const profit =
        (Number(product.sell_price) -
         Number(product.buy_price))
        * Number(item.quantity);

      totalAmount += subtotal;
      totalProfit += profit;

      // CREATE SALE ITEM
      DBInstance.table("sale_items").insert({
        id: Utilities.getUuid(),
        sale_id: saleId,
        product_id: product.id,
        quantity: item.quantity,
        price: product.sell_price,
        subtotal: subtotal
      });

      // DEDUCT STOCK
      StockService.decrease(
        product.id,
        item.quantity,
        saleId
      );

    });

    // UPDATE TOTAL
    DBInstance.table("sales").update("id", saleId, {
      total_amount: totalAmount
    });

    return {
      success: true,
      saleId,
      totalAmount,
      totalProfit
    };
  }
};
