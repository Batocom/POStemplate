function testSalesEngine() {

  const token = login(
    "admin@local.app",
    "admin123"
  ).token;

  const products = ProductService.getAll(token);

  const product = products[0];

  const sale = SalesService.createSale(token, {

    customer_name: "Francis",

    payment_method: "Cash",

    items: [
      {
        product_id: product.id,
        quantity: 2
      }
    ]
  });

  Logger.log(sale);

  const receipt = ReceiptService.generate(
    sale.saleId
  );

  Logger.log(receipt);
}