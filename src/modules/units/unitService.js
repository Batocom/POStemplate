var UnitService = UnitService || {};

UnitService.getAll = function(token) {
  requireAuth(token);
  return DBInstance.table("units").findAll();
};

UnitService.getById = function(token, id) {
  requireAuth(token);
  const results = DBInstance.table("units").where("id", id);
  return results.length > 0 ? results[0] : null;
};

UnitService.create = function(token, data) {
  requireRole(token, "ADMIN");
  UnitValidator.validateNewUnit(data);

  return DBInstance.table("units").insert({
    id: Utilities.getUuid(),
    name: data.name,
    symbol: data.symbol,
    created_at: new Date()
  });
};

UnitService.update = function(token, data) {
  requireRole(token, "ADMIN");
  UnitValidator.validateUpdateUnit(data);

  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.symbol !== undefined) updateData.symbol = data.symbol;

  return DBInstance.table("units").update("id", data.id, updateData);
};

UnitService.delete = function(token, id) {
  requireRole(token, "ADMIN");
  return DBInstance.table("units").delete("id", id);
};
