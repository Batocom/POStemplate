const Relations = {

  sales: {
    hasMany: ["sale_items"]
  },

  sale_items: {
    belongsTo: ["sales", "products"]
  },

  products: {
    hasMany: ["stock_movements"]
  },
   products: {
    belongsTo: ["units", "categories"]
  },

  categories: {
    hasMany: ["products"]
  },

  units: {
    hasMany: ["products"]
  },

  sales: {
    hasMany: ["sale_items"]
  }

};
