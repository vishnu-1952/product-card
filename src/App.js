import React, { useState, useEffect } from 'react';
import ProductCard from '../src/components/productCard';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function App() {

  const sampleProducts = [
    {
      id: 1,
      title: 'Nike Air Max - Grails',
      image: 'https://i.pinimg.com/originals/de/84/78/de847819dc8c0dcfea42e1f14faa5775.gif',
      description: "In 1987, the Air Max 1 was born, igniting a love for Nike's iconic cushioning system.",
      price: '$29.99',
    },
    {
      id: 2,
      title: 'Nike — Lincoln Design Co.',
      image: 'https://i.pinimg.com/564x/8f/73/78/8f73780edb4779dd02b553d9abc19277.jpg',
      description: 'In reality, the Nike Swoosh was designed by graphic designer Carolyn.',
      price: '$59.99',
    },
    {
      id: 3,
      title: 'One Piece - Anime',
      image: 'https://i.pinimg.com/736x/4e/67/4d/4e674d8daeb50f147d5234227d4c9054.jpg',
      description: 'One Piece has received praise for its storytelling, world-building, art, characterization, and humour.',
      price: '$109.99',
    },
  ];

  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : sampleProducts; // Use sample data if no products are stored
  });

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [newProduct, setNewProduct] = useState({
    image: '',
    title: '',
    description: '',
    price: '',
  });

  const [showProductModal, setShowProductModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newProduct.title && newProduct.image && newProduct.price) {
      const productWithId = { ...newProduct, id: Date.now() };
      setProducts([...products, productWithId]);
      setNewProduct({ image: '', title: '', description: '', price: '' });
      toast.success('Product added successfully!');
      setShowProductModal(false);
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    toast.info('Product added to cart!');
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.warn('Product removed from cart.');
  };

  const handleProductModalToggle = () => {
    setShowProductModal(!showProductModal);
  };

  const handleCartModalToggle = () => {
    setShowCartModal(!showCartModal);
  };

  return (
    <>
      <div className="m-3">
        <h1 className="mt-2 ms-2 mb-5 text-start">Product Showcase</h1>


        {/* Product Grid */}
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
              <ProductCard
                productId={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                onAddToCart={() => handleAddToCart(product)}
                cart={cart}
              />
            </div>
          ))}
        </div>

        {/* Icons for Cart and Add Product */}
        <div className="position-fixed top-0 end-0 p-3">
          <button className="btn btn-outline-primary me-2" onClick={handleProductModalToggle}>
            Add Product
          </button>
          <button className="btn btn-outline-primary" onClick={handleCartModalToggle}>
            Cart <span className="badge bg-danger">{cart.length}</span>
          </button>
        </div>

        {/* Product Form Modal */}
        <Modal show={showProductModal} onHide={handleProductModalToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleFormSubmit} className="product-form">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Product Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="Enter product title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Product Image URL</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="form-control"
                  placeholder="Enter product image URL"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Product Description</label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Product Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                  placeholder="Enter product price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleProductModalToggle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Cart Modal */}
        <Modal show={showCartModal} onHide={handleCartModalToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Your Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cart.length > 0 ? (
              <ul className="list-group">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.title} - {item.price}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(item.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the cart.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCartModalToggle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
