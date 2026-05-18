const UnitValidator = {

  validateNewUnit(data) {
    if (!data.name) throw new Error("Unit name is required");
    if (data.name.length < 1) throw new Error("Unit name must be at least 1 character");
    if (!data.symbol) throw new Error("Unit symbol is required");
    if (data.symbol.length < 1) throw new Error("Unit symbol must be at least 1 character");
    return true;
  },

  validateUpdateUnit(data) {
    if (!data.id) throw new Error("Unit ID is required");
    if (data.name !== undefined && !data.name) throw new Error("Unit name cannot be empty");
    if (data.symbol !== undefined && !data.symbol) throw new Error("Unit symbol cannot be empty");
    return true;
  }
};
