import React from "react";
import useProductStore from "../../store/ProductStore";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, increase, decrease, removeFromCart } = useProductStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imageUrl} alt={item.title} />
                <div className="info">
                  <h4>{item.title}</h4>
                  <p>
                    {item.price} SEK x {item.quantity}
                  </p>
                  <div className="actions">
                    <button onClick={() => decrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item.id)}>+</button>
                    <button
                      className="remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <h3>Total: {total} SEK</h3>
            <button
              className="continue-btn"
              onClick={() => navigate("/thank-you")}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
