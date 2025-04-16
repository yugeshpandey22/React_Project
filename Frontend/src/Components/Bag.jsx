import React, { useState } from 'react';

const ShoppingCart = () => {
  const [itemCount, setItemCount] = useState(1);
  const itemPrice = 50;
  const deliveryCharge = 0;

  const handleIncrease = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const subTotal = itemCount * itemPrice;
  const grandTotal = subTotal + deliveryCharge;

  return (
    <div style={{ padding: '20px', border: '1px solid black', width: '300px' }}>
      <h2 style={{ color: 'red' }}>Your Bag</h2>
      <p>Total Items: {itemCount}</p>
      <p>Men's Wear - Wash And Iron</p>
      <p>Suit (Blazer + Trouser + Waist Coat)</p>
      <p>₹ {itemPrice}</p>

      <div>
        <button onClick={handleDecrease}>-</button>
        <span>{itemCount}</span>
        <button onClick={handleIncrease}>+</button>
      </div>

      <p>Sub Total: ₹ {subTotal}</p>
      <p>Delivery Charge: ₹ {deliveryCharge}</p>
      <p><strong>Grand Total: ₹ {grandTotal}</strong></p>

      <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none' }}>
        Check Out Your Order
      </button>
    </div>
  );
};

export default ShoppingCart;