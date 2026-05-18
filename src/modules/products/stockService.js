const StockService = {

  increase(productId, qty, referenceId = "MANUAL") {

    const productTable = DBInstance.table("products");

    const product = productTable.where("id", productId)[0];

    if (!product) throw new Error("Product not found");

    const newStock = Number(product.stock) + Number(qty);

    productTable.update("id", productId, {
      stock: newStock
    });

    DBInstance.table("stock_movements").insert({
      id: Utilities.getUuid(),
      product_id: productId,
      type: "IN",
      quantity: qty,
      reference_id: referenceId,
      created_at: new Date()
    });

    return { success: true, newStock };
  },

  decrease(productId, qty, referenceId = "SALE") {

    const productTable = DBInstance.table("products");

    const product = productTable.where("id", productId)[0];

    if (!product) throw new Error("Product not found");

    const newStock = Number(product.stock) - Number(qty);

    if (newStock < 0) {
      throw new Error("Insufficient stock");
    }

    productTable.update("id", productId, {
      stock: newStock
    });

    DBInstance.table("stock_movements").insert({
      id: Utilities.getUuid(),
      product_id: productId,
      type: "OUT",
      quantity: qty,
      reference_id: referenceId,
      created_at: new Date()
    });

    return { success: true, newStock };
  }
};