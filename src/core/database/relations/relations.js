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
    belongsTo: ["units"]
  },

  units: {
    hasMany: ["products"]
  },

  sales: {
    hasMany: ["sale_items"]
  }

};