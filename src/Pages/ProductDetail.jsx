import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../data/Products.js";
import useCart from "../Context/CartContext.jsx";

export default function ProductDetail() {
  const { cartItems, addToCart } = useCart();
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    setProduct(fetchedProduct);
  }, [id]);

  

  if (!product) {
    return <h1>Loading...</h1>;
  }
  const productItem = cartItems.find((item) => item.id === product.id);
  const productQty = productItem ? `(${productItem.quantity})` : "";

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-actions">
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart {productQty}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
