function getSettingsSchema() {
  return {
    table: "settings",
    columns: [
      "id",
      "key",
      "value",
      "created_at",
      "updated_at"
    ]
  };
}
