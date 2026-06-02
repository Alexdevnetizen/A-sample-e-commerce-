import { Link } from "react-router-dom";

export default function ProductCards({ product }) {
  return (
    <>
      <div className="product-card" >
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
            
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
