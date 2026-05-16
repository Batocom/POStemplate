const CategoryValidator = {

  validateNewCategory(data) {
    if (!data.name) throw new Error("Category name is required");
    if (data.name.length < 2) throw new Error("Category name must be at least 2 characters");
    return true;
  },

  validateUpdateCategory(data) {
    if (!data.id) throw new Error("Category ID is required");
    if (data.name !== undefined && !data.name) throw new Error("Category name cannot be empty");
    if (data.name !== undefined && data.name.length < 2) throw new Error("Category name must be at least 2 characters");
    return true;
  }
};
