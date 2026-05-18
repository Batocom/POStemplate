function getProductsSchema() {
  return {
    table: "products",
   columns: [
  "id",
  "name",
  "barcode",
  "buy_price",
  "sell_price",
  "stock",
  "unit_id",
  "category_id",
  "created_at",
  "updated_at"
]
  };
}


