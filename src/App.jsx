import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import LoginForm from './components/Admin/LoginForm';
import RegisterForm from './components/Admin/RegisterForm';
import AddProduct from './components/Admin/AddProduct';
import OrderList from './components/Admin/OrderList';
import confetti from 'canvas-confetti';
import {API_BASE_URL} from './config';

function App() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [customer, setCustomer] = useState({ name: '', address: '', phone: ''});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [view, setView] = useState('shop');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('getGadjetUser', JSON.stringify(userData));
        // Pro move: Auto-fill the checkout form with the user's name!
        setCustomer(prev => ({ ...prev, name: userData.Name }));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('getGadjetUser');
    };

    // Data Fetching & LocalStorage Logic 
    useEffect(() => {
        const savedUser = localStorage.getItem('getGadjetUser');
        if (savedUser) setUser(JSON.parse(savedUser));
        
        fetch(`${API_BASE_URL}/api-get-products.php`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("API Error:", err));

        const savedCart = localStorage.getItem('getGadjetCart');
        if(savedCart && savedCart !== "undefined") {
            try { setCart(JSON.parse(savedCart)); }
            catch (e) { localStorage.removeItem('getGadjetCart'); }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('getGadjetCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.ID === product.ID);
            if(existingItem) {
                return prevCart.map(item => item.ID === product.ID ? {...item, qty: item.qty + 1} : item);
            }
            return [...prevCart, {...product, qty: 1}];
        });
        // setIsCartOpen(true); 

        // setTimeout(() => {
        //     setIsCartOpen(false);
        // }, 1000); // 2000ms = 2 seconds
        alert("Product is added to cart!");
    };

    const removeFromCart = (id) => setCart(prevCart => prevCart.filter(item => item.ID !== id));

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.Title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || p.Category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    
    const handleCheckout = () => {
        
        if (cart.length === 0) {
            return alert("Cart is empty!");
        }


        if (!customer.name || !customer.address || !customer.phone) {
            return alert("Please fill out your details!");
        }

        const orderData = {
            userId: user ? user.ID : 1, // Safety check
            customerName: customer.name,
            address: customer.address,
            phone: customer.phone,
            cart: cart
        };

        fetch(`${API_BASE_URL}/api-place-order.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.status === 'success'){
                confetti({
                    particleCount: 200,
                    spread: 80,
                    origin: { y: 0.8 },
                    colors: ['#28a745', '#ff0000', '#321cd6']
                });
            }
            alert(data.message);
            setCart([]);
            setIsCartOpen(false);
            setCustomer({ name: '', address:'', phone: ''});
        })
    };

    if (!user) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4' }}>
                {showRegister ? (
                    <RegisterForm toggleLogin={() => setShowRegister(false)} />
                ) : (
                    <LoginForm onLogin={handleLoginSuccess} toggleRegister={() => setShowRegister(true)} />
                )}
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px', fontFamily: 'sans-serif' }}>
            
            <div style={{ flex: 3 }}> 
                {/* --- HEADER SECTION --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Welcome back, {user.Name}!</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {user.Is_Admin === 1 && (
                            <button
                                onClick={() => setView(view === "shop" ? "admin" : "shop")}
                                style={{ padding: '8px 12px', borderRadius: '5px', background: '#333', color: '#fff', cursor: 'pointer' }}
                            >
                                {view === 'shop' ? "Go to Admin Panel" : "Back to Shop"}
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            style={{ padding: '8px 15px', borderRadius: '5px', border: '1px solid #dc3545', color: '#dc3545', background: 'none', cursor: 'pointer' }}
                        >
                            Logout
                        </button>
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            style={{
                                position: 'fixed', bottom: '30px', right: '30px',
                                width: '60px', height: '60px', borderRadius: '50%',
                                backgroundColor: '#333', color: '#fff', border: 'none',
                                cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                zIndex: 999, fontSize: '24px'
                            }}
                        >
                            🛒 <span style={{ fontSize: '14px', position: 'absolute', top: '10px', right: '10px', background: 'red', borderRadius: '50%', padding: '2px 6px' }}>
                                {cart.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        </button>
                    </div>
                </div>

                {/* --- CONDITIONAL VIEW TOGGLE --- */}
                {view === "admin" ? (
                    /* ADMIN VIEW */
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <AddProduct />
                        <OrderList />
                    </div>
                ) : (
                    /* SHOP VIEW */
                    <>
                        <Navbar 
                            activeCategory={activeCategory} 
                            setActiveCategory={setActiveCategory} 
                            setSearchTerm={setSearchTerm} 
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            {filteredProducts.map(p => (
                                <ProductCard key={p.ID} product={p} addToCart={addToCart} setSelectedProduct={setSelectedProduct} />
                            ))}
                        </div>
                    </>
                )}

            </div>

            {/* --- SIDEBAR & MODAL (Always Available) --- */}
            <CartSidebar 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                cart={cart} 
                removeFromCart={removeFromCart} 
                customer={customer} 
                setCustomer={setCustomer} 
                handleCheckout={handleCheckout} 
            />

            <ProductModal 
                product={selectedProduct} 
                close={() => setSelectedProduct(null)} 
                addToCart={addToCart} 
            />
        </div>
    );
}
export default App;