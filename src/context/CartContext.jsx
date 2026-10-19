import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
 const [cartItems, setCartItems] = useState(() => {
  try {
    const savedCart = localStorage.getItem("nova-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("nova-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  function addToCart(product, quantity = 1) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  item.stock
                ),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  }

  // Remove product completely
  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  // Update product quantity
  function updateQuantity(productId, quantity) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(quantity, item.stock)
              ),
            }
          : item
      )
    );
  }

  // Empty the cart
  function clearCart() {
    setCartItems([]);
  }

  // Total number of products
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}