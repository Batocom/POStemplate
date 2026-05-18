const ProductValidator = {

  canSell(product, qty) {
    return Number(product.stock) >= Number(qty);
  },

  validateNewProduct(data) {

    if (!data.name) throw new Error("Name required");
    if (data.sell_price < 0) throw new Error("Invalid price");

    return true;
  },

  validateUpdateProduct(data) {
    if (!data.id) throw new Error("Product ID required");
    if (data.name !== undefined && !data.name) throw new Error("Name cannot be empty");
    if (data.sell_price !== undefined && data.sell_price < 0) throw new Error("Invalid price");
    if (data.buy_price !== undefined && data.buy_price < 0) throw new Error("Invalid buy price");
    if (data.stock !== undefined && data.stock < 0) throw new Error("Invalid stock quantity");
    return true;
  }
};
