const axios = require('axios');

class ShoppingCart {
  constructor() {
    this.items = {};
    this.taxRate = 0.125;
    this.apiBaseUrl = 'http://localhost:3001/products/';
  }

  async addProduct(productName, quantity) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}${productName}`);
      const price = response.data.price;

      if (!this.items[productName]) {
        this.items[productName] = { quantity: 0, price };
      }
      this.items[productName].quantity += quantity;
    } catch (error) {
      console.error(`Error fetching price for ${productName}:`, error.message);
    }
  }

  calculateTotals() {
    let subtotal = 0;
    for (const product in this.items) {
      const { quantity, price } = this.items[product];
      subtotal += quantity * price;
    }

    const tax = Math.round(subtotal * this.taxRate * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    return { subtotal, tax, total };
  }

  displayCart() {
    console.log('Cart Contents:');
    for (const product in this.items) {
      console.log(`${this.items[product].quantity} x ${product} @ ${this.items[product].price} each`);
    }
    const { subtotal, tax, total } = this.calculateTotals();
    console.log(`Subtotal: $${subtotal}`);
    console.log(`Tax: $${tax}`);
    console.log(`Total: $${total}`);
  }
}

module.exports = ShoppingCart;
