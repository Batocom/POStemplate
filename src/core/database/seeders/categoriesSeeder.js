function seedCategories() {

  const categories = DBInstance.table("categories").findAll();

  // PREVENT DUPLICATE SEEDING
  if (categories.length > 0) return;

  const defaultCategories = [
    { name: "General", description: "General products" },
    { name: "Food & Beverages", description: "Food and drink items" },
    { name: "Electronics", description: "Electronic devices and accessories" },
    { name: "Clothing", description: "Apparel and fashion items" }
  ];

  defaultCategories.forEach(cat => {
    DBInstance.table("categories").insert({
      id: Utilities.getUuid(),
      name: cat.name,
      description: cat.description,
      created_at: new Date(),
      updated_at: new Date()
    });
  });

  Logger.log("Default categories seeded");
}
