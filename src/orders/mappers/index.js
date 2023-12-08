export const mapOrderResponse = (rows) => {
  const order = {
    id: rows[0].id,
    order_num: rows[0].order_num,
    createdAT: rows[0].createdAT,
    final_price: rows[0].final_price,
    status: rows[0].status,
    order_details: [],
  };

  rows.forEach((row) => {
    order.order_details.push({
      qty: row.qty,
      detail_unit_price: row.detail_unit_price,
      total_price: row.total_price,
      product_id: row.product_id,
      product_name: row.product_name,
      product_unit_price: row.product_unit_price,
    });
  });

  return order;
};

export const mapOrders = (res) => {
  const orders = {};
  res.forEach((order) => {
    if (!orders[order.id]) {
      orders[order.id] = {
        id: order.id,
        order_num: order.order_num,
        createdAT: order.createdAT,
        final_price: Number(order.final_price),
        status: order.status,
        order_details: [],
      };
    }

    orders[order.id].order_details.push({
      qty: Number(order.qty),
      detail_unit_price: Number(order.detail_unit_price),
      total_price: Number(order.total_price),
      product_id: order.product_id,
      product_name: order.product_name,
      product_unit_price: Number(order.product_unit_price),
    });
  });

  return Object.values(orders);
};
