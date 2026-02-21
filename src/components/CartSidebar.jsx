export default function CartSidebar({ isOpen, onClose, cart, removeFromCart, customer, setCustomer, handleCheckout }) {
    return (
        <>
            {/* 1. DARK OVERLAY (Clicks outside to close) */}
            {isOpen && (
                <div 
                    onClick={onClose}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1999
                    }}
                />
            )}

            {/* 2. THE DRAWER */}
            <div style={{
                position: 'fixed', top: 0, right: 0,
                width: '400px', height: '100vh',
                backgroundColor: '#fff', zIndex: 2000,
                boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                padding: '15px', display: 'flex', flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Your Cart ({cart.length})</h2>
                    <button onClick={onClose} style={{ fontSize: '30px', color:'red', border: 'none', background: 'none', cursor: 'pointer' }}>&times;</button>
                </div>

                {/* --- Scrollable Cart Items Area --- */}
                <div style={{ overflowY: 'auto', marginBottom: '20px' }}>
                    {cart.length === 0 ? <p>Your cart is empty.</p> : (
                        cart.map(item => (
                            <div key={item.ID} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', borderBottom: '1px solid #bbb', paddingBottom: '10px' }}>
                                <span style={{fontSize:'15px'}}>{item.Title} x {item.qty}</span>
                                <button
                                    onClick={() => removeFromCart(item.ID)}
                                    style={{ color: 'red', fontSize:'15px', border: 'none', background: 'none', cursor: 'pointer' }}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* --- Checkout Form at bottom --- */}
                <div>
                    <input type="text" placeholder="Name" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} style={{ width: '90%', marginBottom: '10px', padding: '8px' }} />
                    <input type="text" placeholder="Address" value={customer.address} onChange={(e) => setCustomer({...customer, address: e.target.value})} style={{ width: '90%', marginBottom: '10px', padding: '8px' }} />
                    <input type="text" placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} style={{ width: '90%', marginBottom: '20px', padding: '8px' }} />
                    
                    <button 
                        onClick={handleCheckout}
                        style={{ width: '100%', padding: '15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Checkout Total: ₹{cart.reduce((total, item) => total + (item.Price * item.qty), 0).toLocaleString()}
                    </button>
                </div>
            </div>
        </>
    );
}