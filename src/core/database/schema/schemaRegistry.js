function getSchemaRegistry() {
  return [
    getUsersSchema(),
    getProductsSchema(),
    getSalesSchema(),
    getSaleItemsSchema(),
    getStockMovementsSchema(),
    getMigrationsSchema(),
    getUnitsSchema()
  ];
}