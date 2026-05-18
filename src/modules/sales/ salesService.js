const SalesService = {

  createSale(token, payload) {

    const session = requireAuth(token);

    const items = payload.items;

    if (!items || items.length === 0) {
      throw new Error("No sale items");
    }

    let totalAmount = 0;
    let totalProfit = 0;

    const saleId = Utilities.getUuid();

    // CREATE SALE HEADER
    DBInstance.table("sales").insert({
      id: saleId,
      invoice_no: "INV-" + Date.now(),
      customer_name: payload.customer_name || "Walk-in",
      total_amount: 0,
      payment_method: payload.payment_method || "Cash",
      created_by: session.userId,
      created_at: new Date()
    });

    // PROCESS ITEMS
    items.forEach(item => {

      const product = DBInstance
        .table("products")
        .where("id", item.product_id)[0];

      if (!product) {
        throw new Error("Product not found");
      }

      if (!ProductValidator.canSell(product, item.quantity)) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const subtotal =
        Number(product.sell_price) *
        Number(item.quantity);

      const profit =
        (Number(product.sell_price) -
         Number(product.buy_price))
        * Number(item.quantity);

      totalAmount += subtotal;
      totalProfit += profit;

      // CREATE SALE ITEM
      DBInstance.table("sale_items").insert({
        id: Utilities.getUuid(),
        sale_id: saleId,
        product_id: product.id,
        quantity: item.quantity,
        price: product.sell_price,
        subtotal: subtotal
      });

      // DEDUCT STOCK
      StockService.decrease(
        product.id,
        item.quantity,
        saleId
      );

    });

    // UPDATE TOTAL
    DBInstance.table("sales").update("id", saleId, {
      total_amount: totalAmount
    });

    return {
      success: true,
      saleId,
      totalAmount,
      totalProfit
    };
  },

  getAll(token) {
    requireAuth(token);
    return DBInstance.table("sales").findAll();
  },

  getById(token, id) {
    requireAuth(token);
    const results = DBInstance.table("sales").where("id", id);
    return results.length > 0 ? results[0] : null;
  },

  getItemsBySaleId(token, saleId) {
    requireAuth(token);
    return DBInstance.table("sale_items").where("sale_id", saleId);
  },

  getDashboardData(token) {
    requireAuth(token);
    
    const sales = DBInstance.table("sales").findAll();
    const products = DBInstance.table("products").findAll();
    const categories = DBInstance.table("categories").findAll();
    
    // Today's sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySales = sales.filter(function(s) {
      const saleDate = new Date(s.created_at);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    });
    const todayTotal = todaySales.reduce(function(sum, s) {
      return sum + Number(s.total_amount || 0);
    }, 0);
    
    // Total products
    const totalProducts = products.length;
    
    // Total profit (from all sale_items)
    const allSaleItems = DBInstance.table("sale_items").findAll();
    const totalProfit = allSaleItems.reduce(function(sum, item) {
      const product = products.find(function(p) { return p.id === item.product_id; });
      if (product) {
        const buyCost = Number(product.buy_price || 0) * Number(item.quantity);
        const sellAmount = Number(item.subtotal || 0);
        return sum + (sellAmount - buyCost);
      }
      return sum;
    }, 0);
    
    // Low stock products (stock < 10)
    const lowStockProducts = products.filter(function(p) {
      return Number(p.stock || 0) < 10;
    });
    
    // Last 5 transactions
    const last5Sales = sales
      .sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); })
      .slice(0, 5);
    
    // Sales chart data (last 7 days)
    var chartData = [];
    for (var i = 6; i >= 0; i--) {
      var date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      var daySales = sales.filter(function(s) {
        var saleDate = new Date(s.created_at);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === date.getTime();
      });
      
      var dayTotal = daySales.reduce(function(sum, s) {
        return sum + Number(s.total_amount || 0);
      }, 0);
      
      chartData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        total: dayTotal
      });
    }
    
    // Stock levels by category
    var stockByCategory = categories.map(function(cat) {
      var catProducts = products.filter(function(p) { return p.category_id === cat.id; });
      var totalStock = catProducts.reduce(function(sum, p) { return sum + Number(p.stock || 0); }, 0);
      return {
        name: cat.name,
        stock: totalStock
      };
    });
    
    return {
      todayTotal: todayTotal,
      totalProducts: totalProducts,
      totalProfit: totalProfit,
      lowStockProducts: lowStockProducts,
      last5Sales: last5Sales,
      salesChart: chartData,
      stockByCategory: stockByCategory
    };
  }
};
