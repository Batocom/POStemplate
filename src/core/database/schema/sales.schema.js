function getSalesSchema() {
  return {
    table: "sales",
    columns: [
      "id",
      "invoice_no",
      "customer_name",
      "total_amount",
      "payment_method",
      "created_by",
      "created_at"
    ]
  };
}

module.exports = { getSalesSchema };
