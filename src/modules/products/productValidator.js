const ProductValidator = {

  canSell(product, qty) {
    return Number(product.stock) >= Number(qty);
  },

  validateNewProduct(data) {

    if (!data.name) throw new Error("Name required");
    if (data.sell_price < 0) throw new Error("Invalid price");

    return true;
  }
};