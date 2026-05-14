function getStockMovementsSchema() {
  return {
    table: "stock_movements",
    columns: [
      "id",
      "product_id",
      "type",
      "quantity",
      "reference_id",
      "created_at"
    ]
  };
}


