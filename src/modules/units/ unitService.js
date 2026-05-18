const UnitService = {
 getAll(token) {
    requireAuth(token);
    return DBInstance.table("units").findAll();
  },

  create(token, data) {

    requireRole(token, "ADMIN");

    if (!data.name) {
      throw new Error("Unit name required");
    }

    return DBInstance.table("units").insert({
      id: Utilities.getUuid(),
      name: data.name,     // kg, pcs, liters
      symbol: data.symbol, // kg, pc, L
      created_at: new Date()
    });
  }
};