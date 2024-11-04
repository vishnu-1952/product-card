import React from 'react';
import './productCard.css';

function ProductCard({ image, title, description, price, onAddToCart, productId, cart }) {
    const isProductInCart = cart.some((item) => item.id === productId);

    const handleAddToCart = () => {
        onAddToCart({ id: productId, title, image, description, price });
    };

    return (
        <div className="product-card">
            <img className="product-image" src={image} alt={title} />
            <div className="product-details">
                <h2 className="product-title">{title}</h2>
                <p className="product-description">{description}</p>
                <p className="product-price">{price}</p>
                <button
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                    disabled={isProductInCart}
                >
                    {isProductInCart ? 'Added' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
