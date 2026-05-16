const CategoryService = {

  getAll(token) {
    requireAuth(token);
    return DBInstance.table("categories").findAll();
  },

  getById(token, id) {
    requireAuth(token);
    const results = DBInstance.table("categories").where("id", id);
    return results.length > 0 ? results[0] : null;
  },

  create(token, data) {
    requireRole(token, "ADMIN");
    CategoryValidator.validateNewCategory(data);

    return DBInstance.table("categories").insert({
      id: Utilities.getUuid(),
      name: data.name,
      description: data.description || "",
      created_at: new Date(),
      updated_at: new Date()
    });
  },

  update(token, data) {
    requireRole(token, "ADMIN");
    CategoryValidator.validateUpdateCategory(data);

    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    updateData.updated_at = new Date();

    return DBInstance.table("categories").update("id", data.id, updateData);
  },

  delete(token, id) {
    requireRole(token, "ADMIN");
    return DBInstance.table("categories").delete("id", id);
  }
};
