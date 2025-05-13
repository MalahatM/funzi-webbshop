import React, { useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FaTimes } from 'react-icons/fa'; 
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = Joi.object({
    title: Joi.string().min(2).required().messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 2 characters',
    }),
    price: Joi.number().min(1).required().messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price must be at least 1',
      'any.required': 'Price is required',
    }),
    imageUrl: Joi.string().uri().required().messages({
      'string.uri': 'Image URL must be a valid link',
      'string.empty': 'Image URL is required',
    }),
    category: Joi.string().required().messages({
      'string.empty': 'Category is required',
    }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const errObj = {};
      error.details.forEach((e) => (errObj[e.path[0]] = e.message));
      setErrors(errObj);
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price),
      });
      navigate('/admin');
    } catch (err) {
      console.error('Error adding product:', err.message);
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        
        <button
          type="button"
          className="form-close-btn"
          onClick={() => navigate('/')}
        >
          <FaTimes />
        </button>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <small>{errors.title}</small>}

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <small>{errors.price}</small>}

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && <small>{errors.imageUrl}</small>}

        <input
          name="category"
          placeholder="Category (e.g. Water Play)"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <small>{errors.category}</small>}

        <button type="submit">➕ Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
