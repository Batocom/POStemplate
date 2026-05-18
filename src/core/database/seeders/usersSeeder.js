function seedUsers() {

  const users = DBInstance.table("users").findAll();

  // PREVENT DUPLICATE SEEDING
  if (users.length > 0) return;

  DBInstance.table("users").insert({
    id: "USR-001",
    name: "Administrator",
    email: "admin@local.app",
    password_hash: "admin123",
    role: "ADMIN",
    created_at: new Date(),
    updated_at: new Date()
  });

  Logger.log("Admin user seeded");

}