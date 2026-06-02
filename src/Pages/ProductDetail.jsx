import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../data/Products.js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    setProduct(fetchedProduct || null);
  }, [id]);

  

  if (!product) {
    return (
      <div className="page">
        <div className="container">
          <div className="auth-container">
            <h2>Product not found</h2>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <div className="quantity-value">{qty}</div>
                <button
                  className="quantity-btn"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-primary" >
                  Add to Cart
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
