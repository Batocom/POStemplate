function getUsersSchema() {
  return {
    table: "users",
    columns: [
      "id",
      "name",
      "email",
      "password_hash",
      "role",
      "created_at",
      "updated_at"
    ]
  };
}


