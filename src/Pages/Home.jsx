import getProducts from "../data/Products.js";
import ProductCards from "../Component/ProductCards.jsx";

export default function Home() {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to UrbanCart</h1>
        <p className="home-subtitle">Your one-stop shop for all things urban</p>
      </div>
      <div>
        <div className="container">
          <h2 className="page-title">Featured Products</h2>
          <div className="product-grid">
            {products.map((product) => (
             <ProductCards product={product} key={product.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
