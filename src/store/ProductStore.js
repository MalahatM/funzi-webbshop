import { create } from 'zustand';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';


const useProductStore = create((set) => ({
  products: [],
  cart: [],
  searchTerm: '',
setSearchTerm: (term) => set({ searchTerm: term }),

  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ products: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addToCart: (product) =>
	set((state) => {
	  const exists = state.cart.find(item => item.id === product.id);
	  if (exists) {
		return {
		  cart: state.cart.map(item =>
			item.id === product.id
			  ? { ...item, quantity: item.quantity + 1 }
			  : item
		  ),
		};
	  } else {
		return {
		  cart: [...state.cart, { ...product, quantity: 1 }],
		};
	  }
	}),
  
  increase: (id) =>
    set((state) => ({
      cart: state.cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      cart: state.cart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter(item => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
  deleteProduct: async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateProduct: async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'products', id), updatedData);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...updatedData } : p
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

}));


export default useProductStore;
