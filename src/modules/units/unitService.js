const UnitService = {
  getAll(token) {
    requireAuth(token);
    return DBInstance.table("units").findAll();
  },

  getById(token, id) {
    requireAuth(token);
    const results = DBInstance.table("units").where("id", id);
    return results.length > 0 ? results[0] : null;
  },

  create(token, data) {
    requireRole(token, "ADMIN");
    UnitValidator.validateNewUnit(data);

    return DBInstance.table("units").insert({
      id: Utilities.getUuid(),
      name: data.name,
      symbol: data.symbol,
      created_at: new Date()
    });
  },

  update(token, data) {
    requireRole(token, "ADMIN");
    UnitValidator.validateUpdateUnit(data);

    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.symbol !== undefined) updateData.symbol = data.symbol;

    return DBInstance.table("units").update("id", data.id, updateData);
  },

  delete(token, id) {
    requireRole(token, "ADMIN");
    return DBInstance.table("units").delete("id", id);
  }
};
