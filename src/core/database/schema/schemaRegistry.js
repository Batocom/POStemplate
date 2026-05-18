function getSchemaRegistry() {
  return [
    getUsersSchema(),
    getProductsSchema(),
    getCategoriesSchema(),
    getSalesSchema(),
    getSaleItemsSchema(),
    getStockMovementsSchema(),
    getMigrationsSchema(),
    getUnitsSchema(),
    getSettingsSchema()
  ];
}
