export const mapOrderResponse = (response) => {
  let order = {};
  for (let i = 0; i < response.length; i++) {
    let item = response[i];
    if (i === 0) {
      order.id = item.id;
      order.order_num = item.order_num;
      order.createdAT = item.createdAT;
      order.final_price = item.final_price;
      order.status = item.status;
      order.products = [];
    }

    order.products.push({
      product_id: item.product_id,
      order_detail_total: item.order_detail_total,
      name: item.name,
      unit_price: item.unit_price,
      qty: item.qty,
      product_total: item.product_total,
    });
  }
  return order;
};

export const mapOrders = (response) => {
  let orders = {};
  response.forEach((element) => {
    const key = element.order_id;
    if (orders[key]) {
      orders[key] = {
        ...element,
        numProds: (orders[key].numProds ?? 0) + 1,
      };
    } else {
      orders[key] = {
        ...element,
        numProds: 1,
      };
    }
  });
  return Object.values(orders);
};
