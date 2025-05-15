import React, { useEffect, useState } from "react";
import useProductStore from "../../store/ProductStore";
import "./Product.css";

const Product = () => {
  const { products, fetchProducts, loading, error, addToCart, searchTerm } =
    useProductStore();

  const [sortOption, setSortOption] = useState("price-low-high");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // filter for search
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.title.localeCompare(b.title);
      case "name-z-a":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // group by category
  const grouped = sortedProducts.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {});

  return (
    <div className="product-wrapper">
      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="price-low-high">Price Low to High</option>
          <option value="price-high-low">Price High to Low</option>
          <option value="name-a-z">Name A-Z</option>
          <option value="name-z-a">Name Z-A</option>
        </select>
      </div>

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
