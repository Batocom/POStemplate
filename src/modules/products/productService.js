const ProductService = {

  create(token, data) {

    const session = requireRole(token, "ADMIN");

    ProductValidator.validateNewProduct(data);
    return DBInstance.table("products").insert({
      id: Utilities.getUuid(),
      name: data.name,
      barcode: data.barcode || "",
      buy_price: data.buy_price || 0,
      sell_price: data.sell_price,
      stock: data.stock || 0,
      unit_id: data.unit_id || "",
      category_id: data.category_id || "",
      created_at: new Date(),
      updated_at: new Date()
    });
  },

  getAll(token) {
    requireAuth(token);
    return DBInstance.table("products").findAll();
  },

  getById(token, id) {
    requireAuth(token);
    return DBInstance.table("products").where("id", id);
  },

  update(token, data) {
    requireRole(token, "ADMIN");
    ProductValidator.validateUpdateProduct(data);

    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.barcode !== undefined) updateData.barcode = data.barcode;
    if (data.buy_price !== undefined) updateData.buy_price = data.buy_price;
    if (data.sell_price !== undefined) updateData.sell_price = data.sell_price;
    if (data.stock !== undefined) updateData.stock = data.stock;
    if (data.unit_id !== undefined) updateData.unit_id = data.unit_id;
    if (data.category_id !== undefined) updateData.category_id = data.category_id;
    updateData.updated_at = new Date();

    return DBInstance.table("products").update("id", data.id, updateData);
  }
};
