import React, { useEffect, useState } from 'react';
import useProductStore from '../store/ProductStore';
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, deleteProduct, updateProduct } = useProductStore();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', price: '', imageUrl: '', category: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
    }
    fetchProducts();
  }, []);

  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    price: Joi.number().min(1).required(),
    imageUrl: Joi.string().uri().required(),
    category: Joi.string().required(),
  });

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', price: '', imageUrl: '', category: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const errObj = {};
      error.details.forEach((e) => (errObj[e.path[0]] = e.message));
      setErrors(errObj);
      return;
    }
    await updateProduct(editingId, {
      ...formData,
      price: parseFloat(formData.price),
    });
    handleCancel();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  const categories = ['water play', 'outdoor play', 'Activ play'];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-title-group">
          <h2>Welcome to Admin Panel</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <Link to="/add-product" className="add-btn">➕ Add Product</Link>
      </div>

      <div className="admin-list">
        {categories.map((cat) => (
          <div key={cat} className="admin-category-section">
            <h3 className="admin-category-title">{cat}</h3>
            <div className="admin-category-grid">
              {products
                .filter((product) => product.category === cat)
                .map((product) => (
                  <div key={product.id} className="admin-card">
                    {editingId === product.id ? (
                      <div className="admin-edit-form">
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                        {errors.title && <small>{errors.title}</small>}
                        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                        {errors.price && <small>{errors.price}</small>}
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />
                        {errors.imageUrl && <small>{errors.imageUrl}</small>}
                        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
                        {errors.category && <small>{errors.category}</small>}
                        <button onClick={handleSave}>💾 Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <img src={product.imageUrl} alt={product.title} className="admin-img" />
                        <h4>{product.title}</h4>
                        <p>{product.price} SEK</p>
                        <div className="admin-actions">
                          <button onClick={() => handleEdit(product)}>✏️ Edit</button>
                          <button className="delete-btn" onClick={() => deleteProduct(product.id)}>🗑 Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
