const ShoppingCart = require('./shoppingCart');

test('Cart calculates totals correctly', async () => {
  const cart = new ShoppingCart();
  cart.items = {
    cornflakes: { quantity: 2, price: 2.52 },
    weetabix: { quantity: 1, price: 9.98 }
  };

  const totals = cart.calculateTotals();
  expect(totals.subtotal).toBe(15.02);
  expect(totals.tax).toBe(1.88);
  expect(totals.total).toBe(16.90);
});
