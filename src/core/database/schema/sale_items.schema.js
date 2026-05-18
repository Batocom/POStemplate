function getSaleItemsSchema() {
  return {
    table: "sale_items",
    columns: [
      "id",
      "sale_id",
      "product_id",
      "quantity",
      "price",
      "subtotal"
    ]
  };
}


