function getCategoriesSchema() {
  return {
    table: "categories",
    columns: [
      "id",
      "name",
      "description",
      "created_at",
      "updated_at"
    ]
  };
}
