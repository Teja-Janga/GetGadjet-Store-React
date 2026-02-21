
import { useEffect, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import {API_BASE_URL} from '../../config';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const updateStatus = (id, newStatus) => {
        fetch(`${API_BASE_URL}/api-update-status.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                setOrders(prev => prev.map(o => o.ID === id ? { ...o, Status: newStatus } : o));
            }
        });
    };

    useEffect(() => {
        fetch(`${API_BASE_URL}/api-get-orders.php`)
            .then(res => res.json())
            .then(data => {                
                if (Array.isArray(data)) {
                    setOrders(data);
                }
                else if (data.status === 'error') {
                    console.error("PHP Error:", data.message);
                }
                else {
                    console.error("Received unexpected data format:", data);
                }
            })
            .catch(err => console.error("Fetch Error:", err));
    }, []);

    return (
        <div style={{marginTop:'30px', backgroundColor:'#fff', padding:'20px', borderRadius: '10px', border: '1px solid #ddd'}}>
            <h2>Incoming Orders 📦</h2>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                    <tr style={{textAlign:'left', borderBottom: '2px solid #444'}}>
                        <th style={{ padding: '10px' }}>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
                        <th>Receipt</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order.ID} style={{borderBottom:'1px solid #eee'}}>
                                <td style={{ padding: '10px' }}>#{order.ID}</td>
                                <td>{order.Customer_Name}</td>
                                <td>{order.Phone}</td>
                                <td>
                                    <span style={{ 
                                        background: order.Status === 'Delivered' ? '#b0debb' : 'hsl(46, 100%, 75%)', 
                                        color: order.Status === 'Delivered' ? '#155724' : '#856404',
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '12px',
                                        fontWeight:'bold' 
                                    }}>
                                        {order.Status || 'Pending'}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 'bold' }}>
                                    ₹{order.Total_Amount ? parseFloat(order.Total_Amount).toLocaleString() : '0.00'}
                                </td>
                                <td>
                                    {order.Status !== 'Delivered' && (
                                        <button 
                                            onClick={() => updateStatus(order.ID, 'Delivered')}
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                fontWeight:'bold'
                                            }}
                                        >
                                            Mark Delivered ✅
                                        </button>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <button 
                                        onClick={() => setSelectedOrder(order)}
                                        style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        #{order.ID}
                                    </button>
                                </td>
                            </tr>
                        ))) : (
                        <tr>
                            <td colSpan="5" style={{padding:'20px', textAlign:'center', color:'#888'}}>
                                No orders found or loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {selectedOrder && (
                <OrderDetailsModal 
                    order={selectedOrder} 
                    close={() => setSelectedOrder(null)} 
                />
            )}
        </div>
    );
}