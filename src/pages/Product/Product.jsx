import React, { useEffect } from "react";
import useProductStore from "../../store/ProductStore";
import "./Product.css";

const Product = () => {
  const { products, fetchProducts, loading, error, addToCart, searchTerm } =
    useProductStore();

	useEffect(() => {
		fetchProducts();
	  }, [fetchProducts]);
	  

  // filtering for search
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const grouped = filteredProducts.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {});

  return (
    <div className="product-wrapper">
      <h2 className="title">Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="product-grid">
            {items.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="product-img"
                />
                <h4>{product.title}</h4>
                <p>Price: {product.price} sek</p>
                <button className="add-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
