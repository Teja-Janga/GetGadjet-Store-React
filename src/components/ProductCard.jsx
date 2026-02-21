
import {API_BASE_URL} from '../config';

export default function ProductCard({ product, addToCart, setSelectedProduct }) {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px',
                width: '250px'
            }}
        >
            <img
                src={`${API_BASE_URL}/${product.Image}`}
                alt={product.Title}
                onClick={() => setSelectedProduct(product)}
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                    cursor: 'pointer'
                }}
            />
            <h3 onClick={() => setSelectedProduct(product)} style={{margin:'10px 0', color:'#007bff', cursor:'pointer'}}>{product.Title}</h3>
            <p style={{color: 'green', fontWeight: 'bold'}}>₹{product.Price}</p>
            <button onClick={() => addToCart(product)} style={{background: '#007bff', color: '#fff', border: 'none', padding: '10px', width: '100%', cursor: 'pointer', borderRadius: '4px'}}>
                Add to Cart
            </button>
        </div>
    )
}