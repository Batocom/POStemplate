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
      "category_id",
      "created_at",
      "updated_at"
    ]
  };
}

module.exports = { getProductsSchema };
