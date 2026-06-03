import { getProductById } from "../data/Products.js";
import useCart from "../Context/CartContext.jsx";
import { useMemo, useState } from "react";

export default function Checkout() {
  const { cartItems, changeQuantity, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const displayCart = useMemo(
    () =>
      cartItems.map((item) => ({
        ...item,
        product: getProductById(item.id),
      })),
    [cartItems],
  );

  const subtotal = useMemo(
    () =>
      displayCart.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0,
      ),
    [displayCart],
  );

  const taxRate = 0.08;
  const tax = Number((subtotal * taxRate).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  function handlePlaceOrder() {
    if (displayCart.length === 0) return;
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <div className="page">
        <div className="container">
          <div className="order-success">
            <h1 className="order-success-title">Order Confirmed</h1>
            <p className="order-success-message">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {displayCart.length === 0 ? (
              <p>Your cart is empty. Add products from the home page.</p>
            ) : (
              displayCart.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="checkout-item-image"
                  />
                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.product?.name}</h3>
                    <p className="checkout-item-price">
                      ${item.product?.price?.toFixed(2)} Each
                    </p>
                  </div>
                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="checkout-item-total">
                      Total: ${(item.product?.price * item.quantity)?.toFixed(2)}
                    </p>
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="checkout-summary">
            <h2 className="checkout-section-title">Payment Details</h2>
            <div className="checkout-total">
              <span className="checkout-total-label">Subtotal</span>
              <span className="checkout-total-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label">Tax (8%)</span>
              <span className="checkout-total-value">${tax.toFixed(2)}</span>
            </div>
            <div className="checkout-total checkout-total-final">
              <span className="checkout-total-label">Estimated Total</span>
              <span className="checkout-total-value">${total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={handlePlaceOrder}
              disabled={displayCart.length === 0}
            >
              Place Order
            </button>
            <p className="checkout-summary-note">
              Secure checkout powered by UrbanCart. You can review your items before placing the order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
