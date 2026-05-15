function handleRequest(action, payload) {
  const token = payload.token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  requireAuth(token);

  switch(action) {

    case "LOGIN":
      return login(payload.email, payload.password);

    case "GET_PRODUCTS":
      return ProductService.getAll(payload.token);

    case "ADD_PRODUCT":
      requireRole(payload.token, "ADMIN");
      return DBInstance.table("products").insert(payload.data);

    case "CREATE_PRODUCT":
      requireRole(payload.token, "ADMIN");
      return ProductService.create(payload.token, payload.data);

    case "STOCK_IN":
      requireRole(payload.token, "ADMIN");
      return StockService.increase(
        payload.productId,
        payload.qty,
        payload.referenceId
      );

    case "STOCK_OUT":
      requireAuth(payload.token);
      return StockService.decrease(
        payload.productId,
        payload.qty,
        payload.referenceId
      );

    case "CREATE_SALE":
      return SalesService.createSale(
        payload.token,
        payload
      );

    case "PRINT_RECEIPT":
      return ReceiptService.generate(
        payload.saleId
      );

    default:
      throw new Error("Unknown action");
  }
}
