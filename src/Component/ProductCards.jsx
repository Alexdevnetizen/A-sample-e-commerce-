import { Link } from "react-router-dom";
import useCart from "../Context/CartContext.jsx";

export default function ProductCards({ product }) {

  const { cartItems, addToCart } = useCart();
  const productItem = cartItems.find((item) => item.id === product.id);
  const productQty = productItem ? `(${productItem.quantity})` : "";
  return (
    <>
      <div className="product-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
        <div className="product-card-content">
          <h3 className="product-card-name">{product.name}</h3>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
          <div className="product-card-actions">
            <Link to={`/product/${product.id}`} className="btn btn-secondary">
              View Details
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add To Cart {productQty}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
