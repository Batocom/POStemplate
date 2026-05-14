function getMigrationsSchema() {
  return {
    table: "migrations",
    columns: [
      "id",
      "migration",
      "executed_at"
    ]
  };
}