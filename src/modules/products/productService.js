const ProductService = {

  create(token, data) {

    const session = requireRole(token, "ADMIN");

    if (!data.name || !data.sell_price) {
      throw new Error("Invalid product data");
    }
     ProductValidator.validateNewProduct(data);
    return DBInstance.table("products").insert({
      id: Utilities.getUuid(),
      name: data.name,
      barcode: data.barcode || "",
      buy_price: data.buy_price || 0,
      sell_price: data.sell_price,
      stock: data.stock || 0,
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
  getAll() {

    const products = DB
      .table('products')
      .getAll();

    return {
      success: true,
      data: products
    };

  }
};