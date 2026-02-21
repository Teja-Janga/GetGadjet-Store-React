
export default function ProductModal({ product, close, addToCart }) {
    if (!product) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', maxWidth: '600px', width: '90%', position: 'relative', display: 'flex', gap: '20px' }}>
                <button onClick={close} style={{position:'absolute', top:'10px', right:'10px', border:'none', background:'none', fontSize:'24px', cursor:'pointer'}}>&times;</button>
                <img src={`http://localhost:9000/${product.Image}`} style={{ width: '250px', objectFit: 'contain'}} />
                <div>
                    <h2>{product.Title}</h2>
                    <p style={{color:'green', fontWeight:'bold', fontSize:'20px'}}>₹{product.Price}</p>
                    <p style={{color:'#444', fontSize:'16px'}}>{product.Description}</p>
                    <button onClick={() => {addToCart(product); close(); }} style={{background:'#28a745', color:'#fff', padding:'12px 20px', borderRadius:'5px', border:'none', fontWeight:'bold', cursor:'pointer'}}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}