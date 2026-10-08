import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={() => navigate("/cart")}
      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <ShoppingCart className="w-6 h-6 text-gray-900" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
