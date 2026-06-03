import { createContext, useEffect, useState, useContext } from "react";
import { getProductById } from "../data/Products.js";
const CartContext = createContext();

function loadCartFromStorage() {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
}

function saveCartToStorage(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(loadCartFromStorage());
  }, []);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  function addToCart(productId, quantity = 1) {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      setCartItems(updatedItems);
    } else {
      setCartItems((prev) => [...prev, { id: productId, quantity }]);
    }
  }

  function changeQuantity(productId, delta) {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (!existingItem) return;

    const nextQuantity = existingItem.quantity + delta;
    if (nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: nextQuantity } : item,
    );
    setCartItems(updatedItems);
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCartItems([]);
  }

  function displayCart() {
    return cartItems.map((item) => ({
      ...item,
      product: getProductById(item.id),
    }));
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        displayCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default function useCart() {
  const Cart = useContext(CartContext);
  return Cart;
   
}
 